import { LocaleLogoutDialog } from '@/locales/en'
import { useLogoutMutation } from '@/shared/api/auth/auth.api'
import { Paths } from '@/shared/enums'
import { HiddenDialogComponents } from '@/shared/ui/components'
import { showErrorToast } from '@/shared/utils'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
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

      showErrorToast(error)
    }
  }

  const closeDialogHandler = () => {
    onOpenChange(false)
  }

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
