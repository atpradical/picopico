import { ElementRef, forwardRef } from 'react'

import { GetPostsItems } from '@/services/posts'
import Image from 'next/image'

import s from './Publications.module.scss'

type PublicationsProps = {
  items: GetPostsItems[]
}

type PublicationsRef = ElementRef<typeof Image>

export const Publications = forwardRef<PublicationsRef, PublicationsProps>(
  ({ items }: PublicationsProps, ref) => {
    return (
      <div className={s.publicationsContainer}>
        {items.map((post, index) => {
          if (items.length === index + 1) {
            return (
              <Image
                alt={'post image'}
                height={228}
                key={post.id}
                ref={ref}
                src={post.images[0].url}
                style={{ content: 'contain' }}
                width={234}
              />
            )
          } else {
            return (
              <Image
                alt={'post image'}
                height={228}
                key={post.id}
                ref={ref}
                src={post.images[0].url}
                style={{ content: 'contain' }}
                width={234}
              />
            )
          }
        })}
      </div>
    )
  }
)
