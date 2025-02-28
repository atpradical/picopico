import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { PostPreview, PostsStep, selectCurrentStep } from '@/features/posts/model'
import { CropItem } from '@/features/posts/ui'
import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
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
  const currentStep = useSelector(selectCurrentStep)

  if (!previewList || !previewList.length) {
    return null
  }

  return (
    <Carousel
      className={clsx(s.createPostCarousel, currentStep === PostsStep.Crop && s.gridPosCol2)}
      opts={{ duration: 0 }}
      plugins={[Fade()]}
    >
      <CarouselContent className={s.noMargin}>
        {previewList.map((slide, index) => {
          return (
            <CarouselItem className={s.carouselItem} key={`slide-${index}`}>
              <CropItem
                data={slide}
                onRemove={onRemove}
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
