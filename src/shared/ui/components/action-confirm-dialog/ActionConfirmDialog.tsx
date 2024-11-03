import { HiddenDialogComponents } from '@/shared/ui/components'
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

import s from './ActionConfirmDialog.module.scss'

type ActionConfirmDialogProps = {
  accessibilityDescription: string
  accessibilityTitle: string
  confirmButtonText: string
  isOpen: boolean
  message: string
  onConfirm: () => void
  onOpenChange: (isOpen: boolean) => void
  rejectButtonText: string
  title: string
}

export function ActionConfirmDialog({
  accessibilityDescription,
  accessibilityTitle,
  confirmButtonText,
  isOpen,
  message,
  onConfirm,
  onOpenChange,
  rejectButtonText,
  title,
}: ActionConfirmDialogProps) {
  const closeDialogHandler = () => {
    onOpenChange(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content}>
        <HiddenDialogComponents description={accessibilityDescription} title={accessibilityTitle} />
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {title}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Typography variant={'regular_14'}>{message}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button onClick={onConfirm} variant={'outlined'}>
            {confirmButtonText}
          </Button>
          <Button onClick={closeDialogHandler}>{rejectButtonText}</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
