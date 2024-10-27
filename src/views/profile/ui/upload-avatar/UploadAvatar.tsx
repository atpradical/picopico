import { useState } from 'react'

import { ProfilePhotoDialog } from '@/views/profile/ui/profile-photo-dialog'
import { Avatar, Button, CloseOutlineIcon } from '@atpradical/picopico-ui-kit'

import s from './UploadAvatar.module.scss'

type UploadAvatarProps = {
  avatarImage: string
}

export const UploadAvatar = ({ avatarImage }: UploadAvatarProps) => {
  const [isUploadAvatarDialogOpen, setIsUploadAvatarDialogOpen] = useState(false)

  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        <Avatar size={'m'} src={avatarImage} />
        <div className={s.buttonWrapper}>
          {/*  // todo: add translation*/}
          <Button className={s.closeButton} title={'delete avatar'} variant={'icon'}>
            <CloseOutlineIcon className={s.closeIcon} />
          </Button>
        </div>
      </div>
      <Button onClick={setIsUploadAvatarDialogOpen} variant={'outlined'}>
        Add a Profile Photo
      </Button>
      {/*todo: complete this section*/}
      <ProfilePhotoDialog
        avatarImage={avatarImage}
        isOpen={isUploadAvatarDialogOpen}
        onOpenChange={setIsUploadAvatarDialogOpen}
      />
    </div>
  )
}
