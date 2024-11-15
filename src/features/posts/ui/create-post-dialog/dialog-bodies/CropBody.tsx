import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { CropItem } from '@/features/posts/ui'
import { Nullable } from '@/shared/types'
import {
  ArrowIosBackOutlineIcon,
  ArrowIosForwardOutlineIcon,
  Button,
  Card,
  DialogBody,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

/* eslint-disable import/extensions */
// import lib swiper's styles for proper slider display and disable rule as import require a css file.
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/* eslint-enable import/extensions */
import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type CropBodyProps = {
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
} & ComponentPropsWithoutRef<typeof DialogBody>

export const CropBody = ({ onRemove, onUpload, previewList, ...props }: CropBodyProps) => {
  return (
    <DialogBody className={clsx(s.body, s.withPreview)} {...props}>
      <div className={s.swiperContainer}>
        <Swiper
          centeredSlides
          className={s.swiper}
          initialSlide={0}
          modules={[Keyboard, Navigation, Pagination]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: '.swiper-pagination',
          }}
        >
          {previewList?.map((slide, index) => (
            <SwiperSlide className={s.slide} key={`slide-${index}`}>
              <CropItem
                imageUrl={slide}
                key={`cropitem-${index}`}
                onRemove={() => onRemove(index)}
                onUpload={e => onUpload(e)}
                previewList={previewList}
              />
            </SwiperSlide>
          ))}
          <div className={'swiper-pagination'}></div>
          <SwiperButtons />
        </Swiper>
      </div>
    </DialogBody>
  )
}

const SwiperButtons = () => {
  const swiper = useSwiper()
  const [isActiveIndex, setActiveSlideIndex] = useState(swiper.activeIndex)

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

  if (!swiper.slides.length) {
    return null
  }

  return (
    <div>
      {isActiveIndex > 0 && (
        <Card className={s.prevBtn} variant={'transparent'}>
          <Button onClick={() => swiper.slidePrev()} variant={'icon'}>
            <ArrowIosBackOutlineIcon className={s.icon} />
          </Button>
        </Card>
      )}
      {isActiveIndex < swiper.slides.length - 1 && (
        <Card className={s.nextBtn} variant={'transparent'}>
          <Button onClick={() => swiper.slideNext()} variant={'icon'}>
            <ArrowIosForwardOutlineIcon className={s.icon} />
          </Button>
        </Card>
      )}
    </div>
  )
}
