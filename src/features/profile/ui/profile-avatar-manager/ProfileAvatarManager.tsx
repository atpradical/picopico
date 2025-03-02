import { useContext, useState } from 'react'

import { avatarPostActions } from '@/features/profile/api'
import { ProfileAvatarDialog } from '@/features/profile/ui'
import { useDeleteAvatarMutation, useDeleteProfileMutation } from '@/services/profile'
import { MyProfileContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { Avatar, Button, CloseOutlineIcon } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './ProfileAvatarManager.module.scss'

export const ProfileAvatarManager = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { myProfileData } = useContext(MyProfileContext)
  const dispatch = useAppDispatch()

  const [alertDialog, setAlertDialog] = useState(false)
  const [deleteAvatar, { isLoading: isDeleteAvatarLoading }] = useDeleteAvatarMutation()
  const [deleteProfile, { isLoading: isDeleteProfileLoading }] = useDeleteProfileMutation()

  const avatarImage = myProfileData?.avatars.length ? myProfileData?.avatars[0].url : ''

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

  const deleteProfileHandler = async () => {
    try {
      await deleteProfile().unwrap()
      localStorage.removeItem('accessToken')
      void router.push(Paths.logIn)
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        <Avatar size={'l'} src={avatarImage} />
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
      <Button className={s.button} onClick={openUploadDialogHandler} variant={'outlined'}>
        {t.profileSettings.profileDataTab.addProfilePhotoButton}
      </Button>
      <Button
        className={s.button}
        isLoading={isDeleteProfileLoading}
        onClick={deleteProfileHandler}
        variant={'danger-outlined'}
      >
        {t.profileSettings.profileDataTab.deleteProfileButton}
      </Button>
      <ProfileAvatarDialog />
      {alertDialog && (
        <ConfirmDialog
          isLoading={isDeleteAvatarLoading}
          isOpen={alertDialog}
          onConfirm={deleteAvatarHandler}
          onOpenChange={setAlertDialog}
          t={t.deleteAvatarDialog}
        />
      )}
    </div>
  )
}
