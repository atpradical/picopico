import { ChangeEvent } from 'react'

import { ALLOWED_IMAGE_UPLOAD_TYPES } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents, UploadFileError } from '@/shared/ui/components'
import { PlaceholderImage } from '@/shared/ui/components/placeholder-image'
import {
  Button,
  Card,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  ImageOutlineIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './ProfileAvatarDialog.module.scss'

type ProfileAvatarDialogProps = {
  avatarPreview?: Nullable<string>
  isOpen?: boolean
  isUploadingComplete: boolean
  isUploadingError?: string
  onDialogOpenChange: (open: boolean) => void
  onSave: () => void
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
            <Image
              alt={t.profileAvatarDialog.avatarAltDescription}
              className={s.image}
              content={''}
              height={340}
              src={avatarPreview ?? ''}
              width={332}
            />
          ) : (
            <PlaceholderImage />
          )}
          {!isUploadingComplete ? (
            <Button as={'label'} className={s.button} onClick={() => {}} variant={'primary'}>
              <input
                accept={ALLOWED_IMAGE_UPLOAD_TYPES.join(', ')}
                hidden
                onChange={onUpload}
                type={'file'}
              />
              {t.profileAvatarDialog.selectPhotoButton}
            </Button>
          ) : (
            <Button onClick={onSave}>{t.profileAvatarDialog.confirmButton}</Button>
          )}
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  )
}
