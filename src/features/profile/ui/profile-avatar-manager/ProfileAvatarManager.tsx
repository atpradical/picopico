import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { avatarPostActions } from '@/features/profile/api'
import { ALLOWED_IMAGE_UPLOAD_TYPES, AVATAR_MAX_FILE_SIZE } from '@/features/profile/config'
import { selectAvatarAllData } from '@/features/profile/model'
import { ProfileAvatarDialog } from '@/features/profile/ui'
import { useDeleteAvatarMutation, useUploadAvatarMutation } from '@/services/profile'
import { MyProfileContext } from '@/shared/contexts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { Avatar, Button, CloseOutlineIcon } from '@atpradical/picopico-ui-kit'

import s from './ProfileAvatarManager.module.scss'

export const ProfileAvatarManager = () => {
  const { t } = useTranslation()
  const { myProfileData } = useContext(MyProfileContext)
  const dispatch = useAppDispatch()
  const { avatarPreview } = useSelector(selectAvatarAllData)
  const avatarImage = myProfileData.avatars.length ? myProfileData.avatars[0].url : ''

  const [alertDialog, setAlertDialog] = useState(false)
  const [newAvatar, setNewAvatar] = useState<Nullable<File | string>>(null)

  const [uploadAvatar] = useUploadAvatarMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()

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

  const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(avatarPostActions.setAvatarError({ error: '' }))
      const file = e.target.files[0]

      if (!ALLOWED_IMAGE_UPLOAD_TYPES.includes(file.type)) {
        dispatch(
          avatarPostActions.setAvatarError({ error: t.profileAvatarDialog.wrongPhotoFormat })
        )

        return
      }

      if (file.size >= AVATAR_MAX_FILE_SIZE) {
        dispatch(avatarPostActions.setAvatarError({ error: t.profileAvatarDialog.wrongPhotoSize }))

        return
      }

      setNewAvatar(file)
    }
  }

  const saveImageHandler = async (croppedImage: any) => {
    const imageToSend = croppedImage ? croppedImage : newAvatar

    try {
      await uploadAvatar({
        file: typeof newAvatar === 'string' ? null : imageToSend,
      }).unwrap()
      setNewAvatar(null)
      dispatch(avatarPostActions.resetAvatarDialog())
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  // const closeUploadDialogHandler = (open: boolean) => {
  //   dispatch(avatarPostActions.toggleAvatarDialog({ isOpen: open }))
  //   avatarPostActions.setAvatarError({ error: '' })
  //   setNewAvatar(null)
  //   setAvatarPreview(null)
  // }

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
      setAlertDialog(false)
      setNewAvatar(null)
      dispatch(avatarPostActions.resetAvatarDialog())
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  const openUploadDialogHandler = () => {
    dispatch(avatarPostActions.toggleAvatarDialog({ isOpen: true }))
  }

  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        <Avatar size={'m'} src={avatarImage} />
        {avatarImage && (
          <div className={s.buttonWrapper}>
            <Button
              className={s.closeButton}
              onClick={setAlertDialog}
              title={t.deleteAvatarDialog.deleteAvatarButton}
              variant={'icon'}
            >
              <CloseOutlineIcon className={s.closeIcon} />
            </Button>
          </div>
        )}
      </div>
      <Button onClick={openUploadDialogHandler} variant={'outlined'}>
        {t.profileSettings.profileDataTab.addProfilePhotoButton}
      </Button>
      <ProfileAvatarDialog onSave={saveImageHandler} onUpload={uploadImageHandler} />
      {alertDialog && (
        <ActionConfirmDialog
          accessibilityDescription={t.deleteAvatarDialog.accessibilityDescription}
          accessibilityTitle={t.deleteAvatarDialog.accessibilityTitle}
          confirmButtonText={t.deleteAvatarDialog.confirmButton}
          isOpen={alertDialog}
          message={t.deleteAvatarDialog.visibleBodyText}
          onConfirm={deleteAvatarHandler}
          onOpenChange={setAlertDialog}
          rejectButtonText={t.deleteAvatarDialog.rejectButton}
          title={t.deleteAvatarDialog.visibleTitle}
        />
      )}
    </div>
  )
}
