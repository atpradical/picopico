import { ChangeEvent, useEffect, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { useSelector } from 'react-redux'

import { avatarPostActions } from '@/features/profile/api'
import { ALLOWED_IMAGE_UPLOAD_TYPES, AVATAR_MAX_FILE_SIZE } from '@/features/profile/config'
import { selectAvatarAllData } from '@/features/profile/model'
import { useUploadAvatarMutation } from '@/services/profile'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents, PlaceholderImage } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
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
  toasterModal,
} from '@atpradical/picopico-ui-kit'

import s from './ProfileAvatarDialog.module.scss'

export const ProfileAvatarDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { avatarPreview, isOpen } = useSelector(selectAvatarAllData)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Nullable<Area>>(null)

  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation()
  const [newAvatar, setNewAvatar] = useState<Nullable<File | string>>(null)

  useEffect(() => {
    if (newAvatar && typeof newAvatar !== 'string') {
      const newPreview = URL.createObjectURL(newAvatar)

      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
      dispatch(avatarPostActions.setAvatarPreview({ preview: newPreview }))

      return () => URL.revokeObjectURL(newPreview)
    }
    // 'preview' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAvatar])

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (!ALLOWED_IMAGE_UPLOAD_TYPES.includes(file.type)) {
        toasterModal({ text: t.profileAvatarDialog.wrongPhotoFormat, variant: 'error' })

        return
      }

      if (file.size >= AVATAR_MAX_FILE_SIZE) {
        toasterModal({ text: t.profileAvatarDialog.wrongPhotoSize, variant: 'error' })

        return
      }

      setNewAvatar(file)
    }
  }

  const saveImageHandler = async () => {
    try {
      const croppedImage = await getCroppedImg(avatarPreview, croppedAreaPixels, 0)

      await uploadAvatar({ file: croppedImage }).unwrap()
      dispatch(avatarPostActions.resetAvatarDialog())
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
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
          {avatarPreview ? (
            <>
              <div className={s.cropperContainer}>
                <Cropper
                  aspect={1}
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
              <Button className={s.saveButton} isLoading={isLoading} onClick={saveImageHandler}>
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
                  onChange={uploadImageHandler}
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
