import { LocaleEmailConfirmationDialog } from '@/locales/en'
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './EmailConfirmationDialog.module.scss'

type EmailConfirmationDialogProps = {
  email: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  t: LocaleEmailConfirmationDialog
}
export const EmailConfirmationDialog = ({
  email,
  isOpen,
  onOpenChange,
  t,
}: EmailConfirmationDialogProps) => {
  const confirmButtonHandler = () => {
    onOpenChange(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content} overlayClassName={s.overlay}>
        <VisuallyHidden asChild>
          <DialogTitle>{t.accessibilityTitle}</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>{t.accessibilityDescription}</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {t.visibleTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Typography variant={'regular_14'}>{`${t.visibleBodyText} ${email}`}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button className={s.button} onClick={confirmButtonHandler} variant={'primary'}>
            {t.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
