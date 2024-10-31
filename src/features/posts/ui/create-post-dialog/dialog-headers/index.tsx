import { ComponentPropsWithoutRef } from 'react'

import { useTranslation } from '@/shared/hooks'
import {
  ArrowIosBackIcon,
  Button,
  CloseOutlineIcon,
  DialogClose,
  DialogHeader,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './dialog-headers.module.scss'

type StartHeaderProps = {
  onClose: () => void
}

export const StartHeader = ({ onClose }: StartHeaderProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()

  return (
    <DialogHeader className={s.header}>
      <Typography as={'h3'} variant={'h3'}>
        {createPostDialog.dialogTitles.start}
      </Typography>
      <DialogClose asChild>
        <Button onClick={onClose} title={createPostDialog.buttons.closeButton} variant={'icon'}>
          <CloseOutlineIcon />
        </Button>
      </DialogClose>
    </DialogHeader>
  )
}

type ProgressHeaderProps = {
  confirmButtonTitle: string
  onBack: () => void
  onConfirm: () => void
  title: string
} & ComponentPropsWithoutRef<typeof DialogHeader>

export const ProgressHeader = ({
  confirmButtonTitle,
  onBack,
  onConfirm,
  title,
  ...rest
}: ProgressHeaderProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()

  return (
    <DialogHeader className={s.header} {...rest}>
      <Button onClick={onBack} title={createPostDialog.buttons.backButton} variant={'icon'}>
        <ArrowIosBackIcon />
      </Button>
      <Typography as={'h3'} variant={'h3'}>
        {title}
      </Typography>
      <Button onClick={onConfirm} type={'submit'} variant={'nb-outlined'}>
        {confirmButtonTitle}
      </Button>
    </DialogHeader>
  )
}
