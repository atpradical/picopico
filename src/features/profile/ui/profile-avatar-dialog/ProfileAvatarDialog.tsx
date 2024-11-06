import { ChangeEvent, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { ALLOWED_IMAGE_UPLOAD_TYPES } from '@/features/profile/config'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents, PlaceholderImage, UploadFileError } from '@/shared/ui/components'
import getCroppedImg from '@/shared/utils/crop-image'
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogRoot,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './ProfileAvatarDialog.module.scss'

type ProfileAvatarDialogProps = {
  avatarPreview?: Nullable<string>
  isOpen?: boolean
  isUploadingComplete: boolean
  isUploadingError?: string
  onDialogOpenChange: (open: boolean) => void
  onSave: (croppedImage: any) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}
export const ProfileAvatarDialog = ({
  avatarPreview,
  isOpen,
  isUploadingComplete,
  isUploadingError,
  onDialogOpenChange,
  onSave,
  onUpload,
}: ProfileAvatarDialogProps) => {
  const { t } = useTranslation()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Nullable<Area>>(null)
  const [_, setCroppedImage] = useState(null)

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const saveCroppedImageHandler = async () => {
    try {
      const croppedImage = await getCroppedImg(avatarPreview, croppedAreaPixels, 0)

      setCroppedImage(croppedImage)
      onSave(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <DialogRoot onOpenChange={onDialogOpenChange} open={isOpen}>
      <DialogContent className={s.content} overlayClassName={s.overlay}>
        <HiddenDialogComponents
          description={t.profileAvatarDialog.accessibilityDescription}
          title={t.profileAvatarDialog.accessibilityTitle}
        />
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {t.profileAvatarDialog.visibleTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={t.profileAvatarDialog.closeButtonTitle} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={s.body}>
          {isUploadingError && <UploadFileError errorText={isUploadingError} />}
          {avatarPreview ? (
            <div className={s.cropperContainer}>
              <Cropper
                aspect={1}
                classes={{ cropAreaClassName: s.cropArea }}
                crop={crop}
                cropShape={'round'}
                cropSize={{ height: 300, width: 300 }}
                image={avatarPreview}
                objectFit={'cover'}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={false}
                zoom={zoom}
              />
            </div>
          ) : (
            <PlaceholderImage />
          )}
          {!isUploadingComplete ? (
            <Button as={'label'} className={s.uploadButton} variant={'primary'}>
              <input
                accept={ALLOWED_IMAGE_UPLOAD_TYPES.join(', ')}
                hidden
                onChange={onUpload}
                type={'file'}
              />
              {t.profileAvatarDialog.selectPhotoButton}
            </Button>
          ) : (
            // <Button className={s.saveButton} onClick={onSave}>
            <Button className={s.saveButton} onClick={saveCroppedImageHandler}>
              {t.profileAvatarDialog.confirmButton}
            </Button>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
