import { ElementRef, forwardRef } from 'react'

import { GetPostsItems } from '@/services/posts'

import s from './Publications.module.scss'

type PublicationsProps = {
  items: GetPostsItems[]
}

type PublicationsRef = ElementRef<'div'>

export const Publications = forwardRef<PublicationsRef, PublicationsProps>(
  ({ items }: PublicationsProps, ref) => {
    return (
      <div className={s.publicationsContainer}>
        {items.map((post, index) => {
          if (items.length === index + 1) {
            return (
              <div
                key={post.id}
                ref={ref}
                style={{ border: '1px solid red', height: '300px', width: '300px' }}
              >
                {post.description}
              </div>
            )
          } else {
            return (
              <div
                key={post.id}
                style={{
                  border: '1px solid green',
                  height: '300px',
                  width: '300px',
                }}
              >
                {post.description}
              </div>
            )
          }
        })}
        {/*{items.map(el => (*/}
        {/*  <Image*/}
        {/*    alt={'post image'}*/}
        {/*    height={230}*/}
        {/*    key={el.id}*/}
        {/*    src={undefined}*/}
        {/*    style={{ content: 'contain' }}*/}
        {/*    width={240}*/}
        {/*  />*/}
        {/*))}*/}
      </div>
    )
  }
)
