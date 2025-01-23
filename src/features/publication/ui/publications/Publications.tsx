import { useEffect, useRef } from 'react'

import { PostDialog } from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { Publication } from '@/features/publication/ui'
import { PublicPostsItem } from '@/services/posts'
import { useAppDispatch } from '@/shared/hooks'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'
import { Typography } from '@atpradical/picopico-ui-kit'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import s from './Publications.module.scss'

type PublicationsProps = {
  posts: PublicPostsItem[]
  updateCursor: (postId: number) => void
}

export const Publications = ({ posts, updateCursor }: PublicationsProps) => {
  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()
  const dispatch = useAppDispatch()
  const sectionRef = useRef(null)

  const [lastPostRef, entry] = useIntersectionObserver({ root: null, threshold: 1 })

  useEffect(() => {
    if (entry?.isIntersecting) {
      updateCursor(posts[posts.length - 1].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, posts.length])

  const displayPost = (postId: number) => {
    addRouterQueryParamShallow({ postId: String(postId) })
    const postData = posts.find(item => item.id === postId)

    if (postData) {
      dispatch(publicationsActions.togglePostDisplayDialog({ isOpen: true, postId }))
      dispatch(publicationsActions.setPostData({ postData }))
    }
  }

  return (
    <section className={s.publicationsContainer} ref={sectionRef}>
      {posts.length ? (
        posts.map((post, index) => (
          <Publication
            isCarousel={post.images.length > 1}
            isLastPost={posts.length === index + 1}
            key={post.id}
            onClick={() => displayPost(post.id)}
            post={post}
            ref={lastPostRef}
          />
        ))
      ) : (
        <Typography as={'h3'} className={s.noPostText} variant={'h3'}>
          No Post created yet
        </Typography>
      )}
      <PostDialog />
    </section>
  )
}
