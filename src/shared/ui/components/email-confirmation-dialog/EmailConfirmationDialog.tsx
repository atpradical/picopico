import { LocaleEmailConfirmationDialog } from '@/locales/en'
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
        <HiddenDialogComponents
          description={t.accessibilityDescription}
          title={t.accessibilityTitle}
        />
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
