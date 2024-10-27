import { useState } from 'react'

import { ProfilePhotoDialog } from '@/views/profile/ui/profile-photo-dialog'
import { Avatar, Button, CloseOutlineIcon } from '@atpradical/picopico-ui-kit'

import s from './UploadAvatarForm.module.scss'

type UploadAvatarFormProps = {}

export const UploadAvatarForm = (props: UploadAvatarFormProps) => {
  const [isUploadAvatarDialogOpen, setIsUploadAvatarDialogOpen] = useState(false)

  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        <Avatar size={'m'} src={''} />
        <div className={s.buttonWrapper}>
          <Button className={s.closeButton} variant={'icon'}>
            <CloseOutlineIcon className={s.closeIcon} />
          </Button>
        </div>
      </div>
      <Button onClick={setIsUploadAvatarDialogOpen} variant={'outlined'}>
        Add a Profile Photo
      </Button>
      {/*todo: complete this section*/}
      <ProfilePhotoDialog
        isOpen={isUploadAvatarDialogOpen}
        onOpenChange={setIsUploadAvatarDialogOpen}
      />
    </div>
  )
}
