import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { publicationsActions } from '@/features/posts/api'
import { POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { selectPublicationsAllData } from '@/features/posts/model'
import { PostDialog } from '@/features/posts/ui'
import { useGetPostsQuery } from '@/services/posts'
import { MyProfileContext } from '@/shared/contexts'
import { useAppDispatch } from '@/shared/hooks'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import Image from 'next/image'

import s from './Publications.module.scss'

export const Publications = () => {
  const dispatch = useAppDispatch()
  const { posts } = useSelector(selectPublicationsAllData)

  const { myProfileData } = useContext(MyProfileContext)
  const { pageNumber } = useSelector(selectPublicationsAllData)

  const { data: postsData } = useGetPostsQuery({
    pageNumber,
    pageSize: POSTS_MAX_PAGE_SIZE,
    userName: myProfileData?.userName ?? '',
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
        <Image
          alt={'post image'}
          className={s.image}
          height={228}
          key={post.id}
          onClick={() => displayPost(post.id)}
          ref={posts.length === index + 1 ? lastPostRef : undefined}
          src={post.images[0].url}
          style={{ content: 'contain' }}
          width={234}
        />
      ))}
      <PostDialog />
    </div>
  )
}
