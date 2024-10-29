import { ComponentPropsWithoutRef } from 'react'

import { postsActions } from '@/features/posts/api'
import { useAppDispatch } from '@/shared/hooks'
import {
  ArrowIosBackIcon,
  Button,
  CloseOutlineIcon,
  DialogClose,
  DialogHeader,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from '@/features/posts/ui/create-post-dialog/CreatePostDialog.module.scss'

export const StartHeader = () => {
  const dispatch = useAppDispatch()

  const closeDialogHandler = () => {
    dispatch(postsActions.resetPosts())
  }

  return (
    <DialogHeader className={s.header}>
      <Typography as={'h3'} variant={'h3'}>
        {'Add Photo'}
      </Typography>
      <DialogClose asChild>
        <Button onClick={closeDialogHandler} title={'CLOSE BUTTON'} variant={'icon'}>
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
  return (
    <DialogHeader className={s.header} {...rest}>
      <Button onClick={onBack} variant={'icon'}>
        <ArrowIosBackIcon />
      </Button>
      <Typography as={'h3'} variant={'h3'}>
        {title}
      </Typography>
      <Button onClick={onConfirm} variant={'nb-outlined'}>
        {confirmButtonTitle}
      </Button>
    </DialogHeader>
  )
}
