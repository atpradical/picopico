import { ComponentPropsWithoutRef, ComponentType, ElementRef, forwardRef, useState } from 'react'

import { useLogoutMutation } from '@/shared/api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { LogOutOutlineIcon, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

import { menuItems } from './menu-items'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

  // todo: удалить этот хардкод, заменить на реальный email зарегистрированного пользователя
  const email = 'test@test.com'

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

  return (
    <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
      <div className={s.group}>
        {menuItems.slice(0, 5).map(({ Icon, OutlineIcon, label, path }, index) => (
          <Item
            Icon={Icon}
            OutlineIcon={OutlineIcon}
            isActive={router.pathname === path}
            key={label + index}
            label={label}
            path={path}
          />
        ))}
      </div>
      <div className={s.group}>
        {menuItems.slice(5).map(({ Icon, OutlineIcon, label, path }, index) => (
          <Item
            Icon={Icon}
            OutlineIcon={OutlineIcon}
            isActive={router.pathname === path}
            key={label + index}
            label={label}
            path={path}
          />
        ))}
      </div>
      <div className={s.group}>
        <Typography as={'button'} className={s.title} onClick={() => setOpenLogoutDialog(true)}>
          <LogOutOutlineIcon className={s.icon} />
          Log Out
        </Typography>
      </div>
      {openLogoutDialog && (
        <ActionConfirmDialog
          accessibilityDescription={t.logoutDialog.accessibilityDescription}
          accessibilityTitle={t.logoutDialog.accessibilityTitle}
          confirmButtonText={t.logoutDialog.confirmButton}
          isOpen={openLogoutDialog}
          message={`${t.logoutDialog.visibleBodyText} ${email}`}
          onConfirm={logoutHandler}
          onOpenChange={setOpenLogoutDialog}
          rejectButtonText={t.logoutDialog.rejectButton}
          title={t.logoutDialog.visibleTitle}
        />
      )}
    </nav>
  )
})

SideBar.displayName = 'SideBar'

type ItemProps = {
  Icon: ComponentType<{ className: string }>
  OutlineIcon: ComponentType<{ className: string }>
  isActive: boolean
  label?: string
  path: string
}

export const Item = ({ Icon, OutlineIcon, isActive, label, path }: ItemProps) => {
  return (
    <Typography
      as={Link}
      className={s.title}
      data-active={isActive}
      href={path}
      variant={'medium_14'}
    >
      {isActive ? <Icon className={s.icon} /> : <OutlineIcon className={s.icon} />}
      {label}
    </Typography>
  )
}
