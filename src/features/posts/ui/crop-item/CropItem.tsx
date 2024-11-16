import { ChangeEvent, useEffect, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { useSelector } from 'react-redux'

import { PostsStep, selectPostDialogMeta } from '@/features/posts/model'
import { AspectPopover, UploadPopover, ZoomPopover } from '@/features/posts/ui/popovers'
import { Nullable } from '@/shared/types'
import clsx from 'clsx'

import s from './CropItem.module.scss'

type Props = {
  cropInit?: Point
  imageUrl: string
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
  zoomInit?: number
}
export const CropItem = ({
  cropInit = { x: 0, y: 0 },
  imageUrl,
  onRemove,
  onUpload,
  previewList,
  zoomInit = 1,
}: Props) => {
  const { currentStep } = useSelector(selectPostDialogMeta)

  const [originalAspect, setOriginalAspect] = useState(1)
  const [aspect, setAspect] = useState(1)
  const [crop, setCrop] = useState<Point>(cropInit)
  const [zoom, setZoom] = useState(zoomInit)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Nullable<Area>>(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  // Получаем Original Aspect изображения.
  useEffect(() => {
    const img = new Image()

    img.src = imageUrl
    img.onload = () => {
      const width = img.width
      const height = img.height
      const imageAspectRatio = width / height

      setAspect(imageAspectRatio)
      setOriginalAspect(imageAspectRatio)
    }
  }, [imageUrl])

  // Обёртки для setCrop и setZoom
  const cropChangeHandler = (location: Point) => {
    if (!disableCrop) {
      setCrop(location)
    }
  }

  const zoomChaneHandler = (zoomValue: number) => {
    if (!disableCrop) {
      setZoom(zoomValue)
    }
  }

  const aspectChangeHandler = (newAspect: number) => {
    setAspect(newAspect)
  }

  const disableCrop = currentStep !== PostsStep.Crop

  return (
    <div className={clsx(s.cropperContainer, disableCrop && s.cropperContainerDisabled)}>
      <Cropper
        aspect={aspect}
        crop={crop}
        image={imageUrl}
        objectFit={getObjectFit(aspect)}
        onCropChange={cropChangeHandler}
        onCropComplete={onCropComplete}
        onZoomChange={zoomChaneHandler}
        showGrid={false}
        style={{
          containerStyle: disableCrop ? { cursor: 'default' } : {},
          cropAreaStyle: { boxShadow: '0 0 0 10000em var(--color-dark-300)', margin: '-1px' },
        }}
        zoom={zoom}
      />
      {!disableCrop && (
        <div className={s.toolsContainer}>
          <div className={s.leftToolsContainer}>
            <AspectPopover onAspectChange={aspectChangeHandler} originalAspect={originalAspect} />
            <ZoomPopover onValueChange={zoomChaneHandler} value={[zoom]} />
          </div>
          <UploadPopover
            isOpen={isOpen}
            onOpen={setIsOpen}
            onRemove={onRemove}
            onUpload={onUpload}
            previewList={previewList}
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
