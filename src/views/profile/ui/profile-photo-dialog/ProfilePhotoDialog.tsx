import { ChangeEvent, useEffect, useState } from 'react'

import { useUploadAvatarMutation } from '@/shared/api/profile'
import { AVATAR_MAX_FILE_SIZE } from '@/shared/constants'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents, UploadFileError } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Typography,
} from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './ProfilePhotoDialog.module.scss'

const UploadImageAllowTypes = ['image/jpeg', 'image/png']

type ProfilePhotoDialogProps = {
  avatarImage: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}
export const ProfilePhotoDialog = ({
  avatarImage,
  isOpen,
  onOpenChange,
}: ProfilePhotoDialogProps) => {
  const [newAvatarImage, setNewAvatar] = useState<Nullable<File | string>>(avatarImage ?? null)
  const [avatarPreview, setAvatarPreview] = useState<Nullable<string>>(avatarImage ?? null)
  const [isUploadingError, setIsUploadingError] = useState('')
  const [isUploadingComplete, setIsUploadingComplete] = useState(false)

  const [uploadAvatar] = useUploadAvatarMutation()

  useEffect(() => {
    if (newAvatarImage && typeof newAvatarImage !== 'string') {
      const newPreview = URL.createObjectURL(newAvatarImage)

      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
      setAvatarPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
    // 'preview' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAvatarImage])

  const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setIsUploadingError('')
      const file = e.target.files[0]

      if (!UploadImageAllowTypes.includes(file.type)) {
        setIsUploadingError('The photo must be JPEG or PNG format') // todo: add translation

        return
      }

      if (file.size >= AVATAR_MAX_FILE_SIZE) {
        setIsUploadingError('The photo must be less than 10 Mb') // todo: add translation

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
        file: typeof newAvatarImage === 'string' ? null : newAvatarImage,
      }).unwrap()
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  const onCloseDialogHandler = (value: boolean) => {
    onOpenChange?.(value)
    setIsUploadingComplete(false)
    setIsUploadingError('')
    setNewAvatar(avatarImage ?? null)
    setAvatarPreview(avatarImage ?? null)
  }

  return (
    <DialogRoot onOpenChange={onCloseDialogHandler} open={isOpen}>
      <DialogContent className={s.content} overlayClassName={s.overlay}>
        <HiddenDialogComponents description={'Add a Profile Photo'} title={'Add a Profile Photo'} />
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {'Add a Profile Photo'}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={s.body}>
          {isUploadingError && <UploadFileError errorText={isUploadingError} />}
          {avatarPreview ? (
            <Image
              alt={'User avatar image'} // todo: добавить перевод
              className={s.image}
              height={222}
              src={avatarPreview ?? ''}
              width={228}
            />
          ) : (
            <Image
              alt={'User avatar does not exist'} // todo: добавить перевод
              className={s.image}
              height={222}
              src={''} //todo: проверить отображение без аватара
              width={228}
            />
          )}
          {!isUploadingComplete ? (
            <Button as={'label'} className={s.button} onClick={() => {}} variant={'primary'}>
              {/*  todo: использовать UploadImageAllowTypes */}
              <input
                accept={'image/jpeg, image/png'}
                hidden
                onChange={uploadImageHandler}
                type={'file'}
              />
              {'Select from Computer'}
            </Button>
          ) : (
            <Button onClick={saveImageHandler}>Save</Button>
          )}
        </DialogBody>
        <DialogFooter className={s.footer}></DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
