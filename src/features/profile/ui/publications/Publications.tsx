import { ElementRef, forwardRef, useState } from 'react'

import { PostDialog } from '@/features/posts/ui/post-dialog'
import { GetPostsItems } from '@/services/posts'
import { Nullable } from '@/shared/types'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  posts: GetPostsItems[]
}

type PublicationsRef = ElementRef<typeof Image>

export const Publications = forwardRef<PublicationsRef, PublicationsProps>(
  ({ posts }: PublicationsProps, ref) => {
    const [postId, setPostId] = useState<Nullable<number>>(null)
    const [showPost, setShowPost] = useState(false)

    const postData = posts.find(el => el.id === postId)

    if (!posts) {
      return <div>No items to display</div>
    }

    const closePostDialogHandler = () => {
      setShowPost(false)
      setPostId(null)
    }

    const openPostDialogHandler = (postId: number) => {
      setPostId(postId)
      setShowPost(true)
    }

    return (
      <div className={s.publicationsContainer}>
        {posts.map((post, index) => (
          <Image
            alt={'post image'}
            height={228}
            key={post.id}
            onClick={() => openPostDialogHandler(post.id)}
            ref={posts.length === index + 1 ? ref : undefined}
            src={post.images[0].url}
            style={{ content: 'contain' }}
            width={234}
          />
        ))}
        {showPost && (
          <PostDialog
            isOpen={showPost}
            onClose={closePostDialogHandler}
            onOpenChange={setShowPost}
            postData={postData ?? null}
          />
        )}
      </div>
    )
  }
)
