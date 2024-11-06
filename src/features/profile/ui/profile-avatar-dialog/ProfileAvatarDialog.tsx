import { ChangeEvent, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { useSelector } from 'react-redux'

import { avatarPostActions } from '@/features/profile/api'
import { ALLOWED_IMAGE_UPLOAD_TYPES } from '@/features/profile/config'
import { selectAvatarAllData } from '@/features/profile/model'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
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
  onSave: (croppedImage: any) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}
export const ProfileAvatarDialog = ({ onSave, onUpload }: ProfileAvatarDialogProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { avatarPreview, error, isOpen } = useSelector(selectAvatarAllData)
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

  const closeDialogHandler = () => {
    dispatch(avatarPostActions.resetAvatarDialog())
  }

  return (
    <DialogRoot open={isOpen}>
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
            <Button
              onClick={closeDialogHandler}
              title={t.profileAvatarDialog.closeButtonTitle}
              variant={'icon'}
            >
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={s.body}>
          {error && <UploadFileError errorText={error} />}
          {avatarPreview ? (
            <>
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
              <Button className={s.saveButton} onClick={saveCroppedImageHandler}>
                {t.profileAvatarDialog.confirmButton}
              </Button>
            </>
          ) : (
            <>
              <PlaceholderImage />
              <Button as={'label'} className={s.uploadButton} variant={'primary'}>
                <input
                  accept={ALLOWED_IMAGE_UPLOAD_TYPES.join(', ')}
                  hidden
                  onChange={onUpload}
                  type={'file'}
                />
                {t.profileAvatarDialog.selectPhotoButton}
              </Button>
            </>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
