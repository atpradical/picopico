import { ChangeEvent, useEffect, useState } from 'react'

import { ALLOWED_IMAGE_UPLOAD_TYPES, AVATAR_MAX_FILE_SIZE } from '@/features/profile/config'
import { ProfileAvatarDialog } from '@/features/profile/ui'
import { useDeleteAvatarMutation, useUploadAvatarMutation } from '@/shared/api/profile'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { Avatar, Button, CloseOutlineIcon } from '@atpradical/picopico-ui-kit'

import s from './ProfileAvatarManager.module.scss'

type Props = {
  avatarImage: string
}

export const ProfileAvatarManager = ({ avatarImage }: Props) => {
  const { t } = useTranslation()

  const [isUploadAvatarDialogOpen, setIsUploadAvatarDialogOpen] = useState(false)
  const [openDeleteAvatarDialog, setOpenDeleteAvatarDialog] = useState(false)
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [newAvatar, setNewAvatar] = useState<Nullable<File | string>>(avatarImage ?? null)
  const [avatarPreview, setAvatarPreview] = useState<Nullable<string>>(avatarImage ?? null)
  const [isUploadingError, setIsUploadingError] = useState('')
  const [isUploadingComplete, setIsUploadingComplete] = useState(false)

  const [uploadAvatar] = useUploadAvatarMutation()

  useEffect(() => {
    if (newAvatar && typeof newAvatar !== 'string') {
      const newPreview = URL.createObjectURL(newAvatar)

      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
      setAvatarPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
    // 'preview' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAvatar])

  const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setIsUploadingError('')
      const file = e.target.files[0]

      if (!ALLOWED_IMAGE_UPLOAD_TYPES.includes(file.type)) {
        setIsUploadingError(t.profileAvatarDialog.wrongPhotoFormat)

        return
      }

      if (file.size >= AVATAR_MAX_FILE_SIZE) {
        setIsUploadingError(t.profileAvatarDialog.wrongPhotoSize)

        return
      }

      if (!isUploadingComplete) {
        setIsUploadingComplete(true)
        setNewAvatar(file)
      }
    }

    return
  }

  const saveImageHandler = async () => {
    try {
      await uploadAvatar({
        file: typeof newAvatar === 'string' ? null : newAvatar,
      }).unwrap()
      setIsUploadAvatarDialogOpen(false)
      setIsUploadingComplete(false)
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  const closeUploadDialogHandler = (open: boolean) => {
    setIsUploadAvatarDialogOpen(open)
    setIsUploadingComplete(false)
    setIsUploadingError('')
    setNewAvatar(avatarImage ?? null)
    setAvatarPreview(avatarImage ?? null)
  }

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
      setOpenDeleteAvatarDialog(false)
      setNewAvatar(avatarImage ?? null)
      setAvatarPreview(avatarImage ?? null)
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        <Avatar size={'m'} src={avatarImage} />
        {avatarImage && (
          <div className={s.buttonWrapper}>
            <Button
              className={s.closeButton}
              onClick={setOpenDeleteAvatarDialog}
              title={t.deleteAvatarDialog.deleteAvatarButton}
              variant={'icon'}
            >
              <CloseOutlineIcon className={s.closeIcon} />
            </Button>
            {openDeleteAvatarDialog && (
              <ActionConfirmDialog
                accessibilityDescription={t.deleteAvatarDialog.accessibilityDescription}
                accessibilityTitle={t.deleteAvatarDialog.accessibilityTitle}
                confirmButtonText={t.deleteAvatarDialog.confirmButton}
                isOpen={openDeleteAvatarDialog}
                message={t.deleteAvatarDialog.visibleBodyText}
                onConfirm={deleteAvatarHandler}
                onOpenChange={setOpenDeleteAvatarDialog}
                rejectButtonText={t.deleteAvatarDialog.rejectButton}
                title={t.deleteAvatarDialog.visibleTitle}
              />
            )}
          </div>
        )}
      </div>
      <Button onClick={setIsUploadAvatarDialogOpen} variant={'outlined'}>
        {t.profileSettings.profileDataTab.addProfilePhotoButton}
      </Button>
      <ProfileAvatarDialog
        avatarPreview={avatarPreview}
        isOpen={isUploadAvatarDialogOpen}
        isUploadingComplete={isUploadingComplete}
        isUploadingError={isUploadingError}
        onDialogOpenChange={closeUploadDialogHandler}
        onSave={saveImageHandler}
        onUpload={uploadImageHandler}
      />
    </div>
  )
}
