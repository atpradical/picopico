import { ElementRef, forwardRef } from 'react'

import { ONE_DAY_IN_MILLISECONDS } from '@/features/publication/config'
import { GetPostsItems } from '@/services/posts'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './Publication.module.scss'

type PublicationProps = {
  isLastPost: boolean
  onClick: () => void
  post: GetPostsItems
  showDescription?: boolean
}

type PublicationRef = ElementRef<'div'>

export const Publication = forwardRef<PublicationRef, PublicationProps>(
  ({ isLastPost, onClick, post, showDescription = false }, ref) => {
    const currentDate = new Date()
    const postDate = new Date(post.updatedAt)

    const timeDifference = currentDate.getTime() - postDate.getTime()
    // todo: добавить пересчет в XX минут назад + плюрали + переводы.
    const formattedPublicationTime =
      timeDifference <= ONE_DAY_IN_MILLISECONDS
        ? postDate.toLocaleTimeString(['ru-Ru'], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : postDate.toLocaleDateString()

    return (
      <div className={s.publicationContainer}>
        <div
          className={s.imageContainer}
          key={post.id}
          onClick={onClick}
          ref={isLastPost ? ref : undefined}
        >
          <Image
            alt={'post image'}
            fill
            sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            src={post.images[0].url}
            style={{ content: 'contain' }}
          />
        </div>
        {showDescription && (
          <>
            <Avatar showUserName size={'s'} src={post.avatarOwner} userName={post.userName} />
            <div className={s.publicationMeta}>
              <Typography grey variant={'small'}>
                {formattedPublicationTime}
              </Typography>
              <Typography>{post.description}</Typography>
            </div>
          </>
        )}
      </div>
    )
  }
)
