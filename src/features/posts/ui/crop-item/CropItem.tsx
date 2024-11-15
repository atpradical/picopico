import { ChangeEvent, useEffect, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import { AspectPopover, UploadPopover, ZoomPopover } from '@/features/posts/ui/popovers'
import { Nullable } from '@/shared/types'

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

  const zoomChaneHandler = (newZoom: number[]) => {
    setZoom(newZoom[0])
  }

  const aspectChangeHandler = (newAspect: number) => {
    setAspect(newAspect)
  }

  return (
    <div className={s.cropperContainer}>
      <Cropper
        aspect={aspect}
        crop={crop}
        image={imageUrl}
        objectFit={getObjectFit(aspect)}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        showGrid={false}
        style={{
          cropAreaStyle: { boxShadow: '0 0 0 9999em var(--color-dark-300)' },
        }}
        zoom={zoom}
      />
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
