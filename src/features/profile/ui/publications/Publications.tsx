import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { publicationsActions } from '@/features/posts/api'
import { POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { selectPublicationsAllData } from '@/features/posts/model'
import { PostDialog } from '@/features/posts/ui'
import { useGetPostsQuery } from '@/services/posts'
import { ResponseGetUserProfile } from '@/services/profile'
import { useAppDispatch } from '@/shared/hooks'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  profileData: ResponseGetUserProfile
}

export const Publications = ({ profileData }: PublicationsProps) => {
  const dispatch = useAppDispatch()
  const { posts } = useSelector(selectPublicationsAllData)
  const { pageNumber } = useSelector(selectPublicationsAllData)

  const { data: postsData } = useGetPostsQuery({
    pageNumber,
    pageSize: POSTS_MAX_PAGE_SIZE,
    userName: profileData.userName,
  })

  const [lastPostRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })

  useEffect(() => {
    if (postsData) {
      if (entry?.isIntersecting && postsData?.pagesCount > pageNumber) {
        dispatch(publicationsActions.setPageNumber({ pageNumber: pageNumber + 1 }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  useEffect(() => {
    if (postsData?.items) {
      dispatch(publicationsActions.setPublications({ posts: postsData.items }))
    }

    return () => {
      dispatch(publicationsActions.resetPublications())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsData])

  const displayPost = (postId: number) => {
    dispatch(publicationsActions.togglePostDisplayDialog({ isOpen: true, postId }))
  }

  if (!posts) {
    return <div>No items to display</div>
  }

  return (
    <div className={s.publicationsContainer}>
      {posts.map((post, index) => (
        <div
          className={s.imageContainer}
          key={post.id}
          onClick={() => displayPost(post.id)}
          ref={posts.length === index + 1 ? lastPostRef : undefined}
        >
          <Image alt={'post image'} fill src={post.images[0].url} style={{ content: 'contain' }} />
        </div>
      ))}
      <PostDialog />
    </div>
  )
}
