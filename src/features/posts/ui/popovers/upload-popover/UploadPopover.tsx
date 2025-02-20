import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { POSTS_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { selectCreatePostAllData } from '@/features/posts/model'
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

import s from './UploadPopover.module.scss'

type UploadPopoverProps = {
  isOpen: boolean
  onOpen: (isOpen: boolean) => void
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const UploadPopover = ({ isOpen, onOpen, onRemove, onUpload }: UploadPopoverProps) => {
  // todo: fix carousel
  // const swiper = useSwiper()
  const { previewUrlsList } = useSelector(selectCreatePostAllData)

  const switchToSlideHandler = (index: number) => {
    // todo: fix carousel
    // swiper.slideTo(index)
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
        <ScrollArea type={'hover'}>
          <div className={s.contentContainer}>
            {previewUrlsList?.map((el, index) => {
              // todo: fix carousel
              // const isActiveSlide = swiper.activeIndex === index

              return (
                <div
                  // className={clsx(s.previewItem, isActiveSlide && s.activeSlide)}
                  className={clsx(s.previewItem, s.activeSlide)}
                  key={el + index}
                  onClick={() => switchToSlideHandler(index)}
                >
                  <Image
                    alt={'description'}
                    className={s.image}
                    height={80}
                    src={previewUrlsList?.[index] ?? ''}
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
            <ScrollBar orientation={'horizontal'} />
          </div>
        </ScrollArea>
        <FileUploader
          accept={POSTS_ALLOWED_UPLOAD_TYPES}
          className={s.addButton}
          onChange={onUpload}
          variant={'icon'}
        >
          <PlusCircleOutlineIcon className={s.plusIcon} />
        </FileUploader>
      </PopoverContent>
    </Popover>
  )
}
