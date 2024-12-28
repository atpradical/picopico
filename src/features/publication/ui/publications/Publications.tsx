import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { PostDialog } from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { selectPublicationsAllData } from '@/features/publication/model'
import { Publication } from '@/features/publication/ui'
import { useAppDispatch } from '@/shared/hooks'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import s from './Publications.module.scss'

type PublicationsProps = {
  updatePageNumber: () => void
}

export const Publications = ({ updatePageNumber }: PublicationsProps) => {
  const dispatch = useAppDispatch()
  const { posts } = useSelector(selectPublicationsAllData)
  const sectionRef = useRef(null)

  const [lastPostRef, entry] = useIntersectionObserver({ root: null, threshold: 1 })

  useEffect(() => {
    if (entry?.isIntersecting) {
      updatePageNumber()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  const displayPost = (postId: number) => {
    dispatch(publicationsActions.togglePostDisplayDialog({ isOpen: true, postId }))
  }

  if (!posts.length) {
    return <div>No posts to display</div>
  }

  return (
    <section className={s.publicationsContainer} ref={sectionRef}>
      {posts.map((post, index) => (
        <Publication
          isLastPost={posts.length === index + 1}
          key={post.id}
          onClick={() => displayPost(post.id)}
          post={post}
          ref={lastPostRef}
        />
      ))}
      <PostDialog />
    </section>
  )
}
