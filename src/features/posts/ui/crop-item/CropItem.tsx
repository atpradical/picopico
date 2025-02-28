import { ChangeEvent, useEffect, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import { PostPreview, PostsStep, selectCurrentStep } from '@/features/posts/model'
import { AspectPopover, UploadPopover, ZoomPopover } from '@/features/posts/ui/popovers'
import { useAppDispatch } from '@/shared/hooks'
import { useCarousel } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './CropItem.module.scss'

type Props = {
  data: PostPreview
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  slideIndex: number
}
export const CropItem = ({ data, onRemove, onUpload, slideIndex }: Props) => {
  const dispatch = useAppDispatch()
  const currentStep = useSelector(selectCurrentStep)
  const [isOpen, setIsOpen] = useState(false)

  const disableCrop = currentStep !== PostsStep.Crop

  const { selectedIndex } = useCarousel()

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    dispatch(createPostActions.setCroppedAreaPixels({ croppedAreaPixels, index: slideIndex }))
  }

  useEffect(() => {
    dispatch(createPostActions.setActiveSlideIndex({ index: selectedIndex }))
  }, [dispatch, selectedIndex])

  // Получаем Original Aspect изображения.
  useEffect(() => {
    const img = new Image()

    img.src = data.previewUrlOrig ?? ''
    img.onload = () => {
      const width = img.width
      const height = img.height
      const imageAspectRatio = width / height

      dispatch(
        createPostActions.updatePreviewOriginalAspect({
          aspect: imageAspectRatio,
          index: slideIndex,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.previewUrlOrig])

  // Обёртки для setCrop и setZoom
  const cropChangeHandler = (location: Point) => {
    if (!disableCrop) {
      dispatch(createPostActions.setCrop({ crop: location, index: slideIndex }))
    }
  }

  const zoomChaneHandler = (zoomValue: number) => {
    if (!disableCrop) {
      dispatch(createPostActions.setZoom({ index: slideIndex, zoom: zoomValue }))
    }
  }

  const aspectChangeHandler = (newAspect: number) => {
    dispatch(
      createPostActions.updatePreviewModifiedAspect({ aspect: newAspect, index: slideIndex })
    )
  }

  return (
    <div className={clsx(s.cropperContainer, disableCrop && s.cropperContainerDisabled)}>
      <Cropper
        aspect={data.aspectModified}
        crop={data.crop}
        image={data.previewUrlModified ?? ''}
        objectFit={getObjectFit(data.aspectModified)}
        onCropChange={cropChangeHandler}
        onCropComplete={onCropComplete}
        onZoomChange={zoomChaneHandler}
        showGrid={false}
        style={{
          containerStyle: disableCrop ? { cursor: 'default' } : {},
          cropAreaStyle: {
            border: 'none',
            boxShadow: '0 0 0 10000em var(--color-dark-300)',
            margin: '-1px',
          },
        }}
        zoom={data.appliedZoom}
      />
      {!disableCrop && (
        <div className={s.toolsContainer}>
          <div className={s.leftToolsContainer}>
            <AspectPopover
              aspect={data.aspectModified}
              onAspectChange={aspectChangeHandler}
              originalAspect={data.aspectOrig}
            />
            <ZoomPopover onValueChange={zoomChaneHandler} value={[data.appliedZoom]} />
          </div>
          <UploadPopover
            isOpen={isOpen}
            key={selectedIndex}
            onOpen={setIsOpen}
            onRemove={onRemove}
            onUpload={onUpload}
          />
        </div>
      )}
    </div>
  )
}

const getObjectFit = (aspect: number) => {
  switch (aspect) {
    case 1:
      return 'vertical-cover'
    case 4 / 5:
      return 'vertical-cover'
    case 16 / 9:
      return 'horizontal-cover'
    default:
      return 'contain'
  }
}
