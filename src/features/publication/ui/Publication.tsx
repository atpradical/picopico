import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { PublicPostsItem } from '@/services/posts'
import { getDateDistanceToNow } from '@/shared/utils'
import { Avatar, LayersOutlineIcon, Typography } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './Publication.module.scss'

type PublicationProps = {
  isCarousel: boolean
  isLastPost?: boolean
  onClick: () => void
  post: PublicPostsItem
  showDescription?: boolean
} & ComponentPropsWithoutRef<'div'>

type PublicationRef = ElementRef<'div'>

export const Publication = forwardRef<PublicationRef, PublicationProps>(
  ({ isCarousel, isLastPost, onClick, post, showDescription = false, ...rest }, ref) => {
    const { locale } = useRouter()

    const formattedCreatedAt = getDateDistanceToNow(new Date(post.updatedAt), locale ?? 'en')

    return (
      <div className={s.publicationContainer} {...rest}>
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
          {isCarousel && <LayersOutlineIcon className={s.layersIcon} />}
        </div>
        {showDescription && (
          <>
            <Avatar showUserName size={'s'} src={post.avatarOwner} userName={post.userName} />
            <div className={s.publicationMeta}>
              <Typography grey variant={'small'}>
                {formattedCreatedAt}
              </Typography>
              <Typography>{post.description}</Typography>
            </div>
          </>
        )}
      </div>
    )
  }
)
