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

import s from './AlertDialog.module.scss'

type AlertDialogTranslations = {
  accessibilityDescription: string
  accessibilityTitle: string
  closeButton: string
  confirmButton: string
  visibleBody: string
  visibleTitle: string
}

type AlertDialogProps = {
  isOpen: boolean
  onConfirm: () => void
  onOpenChange: (isOpen: boolean) => void
  t: AlertDialogTranslations
}
export const AlertDialog = ({ isOpen, onConfirm, onOpenChange, t }: AlertDialogProps) => {
  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content}>
        <HiddenDialogComponents
          description={t.accessibilityDescription}
          title={t.accessibilityTitle}
        />
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {t.visibleTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={t.closeButton} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Typography variant={'regular_14'}>{t.visibleBody}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button className={s.confirmButton} onClick={onConfirm}>
            {t.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
