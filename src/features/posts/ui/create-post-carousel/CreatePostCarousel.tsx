import { ChangeEvent } from 'react'

import { PostPreview } from '@/features/posts/model'
import { CropItem } from '@/features/posts/ui'
import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@atpradical/picopico-ui-kit'
import Fade from 'embla-carousel-fade'

import s from './CreatePostCarousel.module.scss'

type CreatePostCarouselProps = {
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: PostPreview[]
}

export const CreatePostCarousel = ({
  onRemove,
  onUpload,
  previewList,
}: CreatePostCarouselProps) => {
  if (!previewList || !previewList.length) {
    return null
  }

  return (
    <Carousel className={s.createPostCarousel} plugins={[Fade()]}>
      <CarouselContent>
        {previewList.map((slide, index) => {
          return (
            <CarouselItem className={s.carouselItem} key={`slide-${index}`}>
              <CropItem
                data={slide}
                onRemove={() => onRemove(index)}
                onUpload={e => onUpload(e)}
                slideIndex={index}
              />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDotButtons />
    </Carousel>
  )
}
