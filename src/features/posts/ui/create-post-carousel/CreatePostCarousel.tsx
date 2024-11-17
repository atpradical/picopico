import { ChangeEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import { PostsStep, selectCreatePostAllData } from '@/features/posts/model'
import { CropItem } from '@/features/posts/ui'
import { useAppDispatch } from '@/shared/hooks'
/* eslint-disable import/extensions */
import {
  ArrowIosBackOutlineIcon,
  ArrowIosForwardOutlineIcon,
  Button,
  Card,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

// import lib swiper's styles for proper slider display and disable rule as import require a css file.
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/* eslint-enable import/extensions */
import s from './CreatePostCarousel.module.scss'

type CreatePostCarouselProps = {
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CreatePostCarousel = ({ onRemove, onUpload }: CreatePostCarouselProps) => {
  const { dialogMeta, previewList, previewListWithFilter } = useSelector(selectCreatePostAllData)

  const isCrop = dialogMeta.currentStep === PostsStep.Crop

  return (
    <div className={clsx(s.swiperContainer, s.previewPosts)}>
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
        {isCrop
          ? previewList?.map((slide, index) => (
              <SwiperSlide className={s.slide} key={`slide-${index}`}>
                <CropItem
                  imageUrl={slide}
                  key={`cropitem-${index}`}
                  onRemove={() => onRemove(index)}
                  onUpload={e => onUpload(e)}
                  previewList={previewList}
                />
              </SwiperSlide>
            ))
          : previewListWithFilter?.map((slide, index) => (
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
  )
}

//todo: добавить экспорт кнопок слайдера из picopico-ui-kit
const SwiperButtons = () => {
  const dispatch = useAppDispatch()
  const { activeSlideIndex } = useSelector(selectCreatePostAllData)
  const swiper = useSwiper()

  useEffect(() => {
    const updateSlideIndex = () => {
      dispatch(createPostActions.setActiveSlideIndex({ index: swiper.activeIndex }))
    }

    swiper.on('slideChange', updateSlideIndex)

    // Обновление значения при первом рендере
    updateSlideIndex()

    // Очистка подписки на событие при размонтировании компонента
    return () => {
      swiper.off('slideChange', updateSlideIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper])

  if (!swiper.slides.length) {
    return null
  }

  return (
    <div>
      {activeSlideIndex > 0 && (
        <Card className={s.prevBtn} variant={'transparent'}>
          <Button onClick={() => swiper.slidePrev()} variant={'icon'}>
            <ArrowIosBackOutlineIcon className={s.icon} />
          </Button>
        </Card>
      )}
      {activeSlideIndex < swiper.slides.length - 1 && (
        <Card className={s.nextBtn} variant={'transparent'}>
          <Button onClick={() => swiper.slideNext()} variant={'icon'}>
            <ArrowIosForwardOutlineIcon className={s.icon} />
          </Button>
        </Card>
      )}
    </div>
  )
}
