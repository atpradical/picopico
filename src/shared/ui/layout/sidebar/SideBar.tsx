import { ComponentPropsWithoutRef, ComponentType, ElementRef, forwardRef, useState } from 'react'

import { useTranslation } from '@/shared/hooks'
import { LogoutDialog } from '@/shared/ui/components/logout-dialog'
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

  const email = 'test@test.com'

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
        <LogoutDialog
          email={email}
          isOpen={openLogoutDialog}
          onOpenChange={setOpenLogoutDialog}
          t={t.logoutDialog}
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
