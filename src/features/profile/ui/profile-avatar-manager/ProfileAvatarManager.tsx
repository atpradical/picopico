import { useContext, useState } from 'react'

import { avatarPostActions } from '@/features/profile/api'
import { ProfileAvatarDialog } from '@/features/profile/ui'
import { useDeleteAvatarMutation } from '@/services/profile'
import { MyProfileContext } from '@/shared/contexts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { Avatar, Button, CloseOutlineIcon } from '@atpradical/picopico-ui-kit'

import s from './ProfileAvatarManager.module.scss'

export const ProfileAvatarManager = () => {
  const { t } = useTranslation()
  const { myProfileData } = useContext(MyProfileContext)
  const dispatch = useAppDispatch()

  const [alertDialog, setAlertDialog] = useState(false)
  const [deleteAvatar] = useDeleteAvatarMutation()

  const avatarImage = myProfileData.avatars.length ? myProfileData.avatars[0].url : ''

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
      setAlertDialog(false)
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
      <ProfileAvatarDialog />
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
