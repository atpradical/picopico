import { LocaleLogoutDialog } from '@/locales/en'
import { useLogoutMutation } from '@/shared/api/auth/auth.api'
import { Paths } from '@/shared/enums'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
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
  toaster,
} from '@atpradical/picopico-ui-kit'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useRouter } from 'next/router'

import s from './LogoutDialog.module.scss'

type LogoutDialogProps = {
  email: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  t: LocaleLogoutDialog
}

export function LogoutDialog({ email, isOpen, onOpenChange, t }: LogoutDialogProps) {
  const router = useRouter()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem('accessToken')
      router.push(Paths.logIn)
    } catch (e) {
      const error = getErrorMessageData(e)

      //todo: вынести в отдельную функцию и переиспользовать в других местах обработки ошибок.
      if (typeof error !== 'string') {
        error.forEach(el => {
          toaster({ text: el.message, variant: 'error' })
        })
      } else {
        toaster({ text: error, variant: 'error' })
      }
    }
  }

  const closeDialogHandler = () => {
    onOpenChange(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content}>
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
          <Button onClick={closeDialogHandler} variant={'outlined'}>
            {t.rejectButton}
          </Button>
          <Button onClick={logoutHandler}>{t.confirmButton}</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
