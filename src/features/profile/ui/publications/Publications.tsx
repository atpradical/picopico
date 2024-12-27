import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { publicationsActions } from '@/features/posts/api'
import { selectPublicationsAllData } from '@/features/posts/model'
import { PostDialog } from '@/features/posts/ui'
import { useAppDispatch } from '@/shared/hooks'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  updatePageNumber: () => void
}

export const Publications = ({ updatePageNumber }: PublicationsProps) => {
  const dispatch = useAppDispatch()
  const { posts } = useSelector(selectPublicationsAllData)

  const [lastPostRef, entry] = useIntersectionObserver()

  useEffect(() => {
    updatePageNumber()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  const displayPost = (postId: number) => {
    dispatch(publicationsActions.togglePostDisplayDialog({ isOpen: true, postId }))
  }

  if (!posts.length) {
    return <div>No posts to display</div>
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
