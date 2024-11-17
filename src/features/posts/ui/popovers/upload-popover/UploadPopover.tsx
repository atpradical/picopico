import { ChangeEvent, useEffect, useState } from 'react'

import { POSTS_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { Nullable } from '@/shared/types'
import {
  Button,
  CloseOutlineIcon,
  FileUploader,
  ImageIcon,
  ImageOutlineIcon,
  PlusCircleOutlineIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  ScrollBar,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useSwiper } from 'swiper/react'

import s from './UploadPopover.module.scss'

type UploadPopoverProps = {
  isOpen: boolean
  onOpen: (isOpen: boolean) => void
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
}

export const UploadPopover = ({
  isOpen,
  onOpen,
  onRemove,
  onUpload,
  previewList,
}: UploadPopoverProps) => {
  const swiper = useSwiper()
  const [_, setActiveSlideIndex] = useState(swiper.activeIndex)

  useEffect(() => {
    const updateSlideIndex = () => {
      setActiveSlideIndex(swiper.activeIndex)
    }

    swiper.on('slideChange', updateSlideIndex)

    // Обновление значения при первом рендере
    updateSlideIndex()

    // Очистка подписки на событие при размонтировании компонента
    return () => {
      swiper.off('slideChange', updateSlideIndex)
    }
  }, [swiper])

  useEffect(() => {
    if (previewList && previewList.length) {
      swiper.slideTo(previewList.length)
      onOpen(false)
    }
  }, [swiper, previewList, onOpen])

  const switchToSlideHandler = (index: number) => {
    swiper.slideTo(index)
    onOpen(false)
  }

  return (
    <Popover onOpenChange={onOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button className={s.buttonTrigger} variant={'icon'}>
          {isOpen ? (
            <ImageIcon className={s.iconImage} />
          ) : (
            <ImageOutlineIcon className={s.iconImage} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'end'} className={s.popoverContainer} side={'top'}>
        <ScrollArea>
          <div className={s.contentContainer}>
            {previewList?.map((el, index) => {
              const isActiveSlide = swiper.activeIndex === index

              return (
                <div
                  className={clsx(s.previewItem, isActiveSlide && s.activeSlide)}
                  key={el + index}
                  onClick={() => switchToSlideHandler(index)}
                >
                  <Image
                    alt={'description'}
                    className={s.image}
                    height={80}
                    src={previewList?.[index] ?? ''}
                    width={80}
                  />
                  <Button
                    className={s.closeButton}
                    onClick={() => onRemove(index)}
                    variant={'icon'}
                  >
                    <CloseOutlineIcon />
                  </Button>
                </div>
              )
            })}
            <FileUploader
              accept={POSTS_ALLOWED_UPLOAD_TYPES}
              className={s.addButton}
              onChange={onUpload}
              variant={'icon'}
            >
              <PlusCircleOutlineIcon className={s.plusIcon} />
            </FileUploader>
            <ScrollBar orientation={'horizontal'} />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}