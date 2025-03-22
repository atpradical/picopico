import { useContext } from 'react'

import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useLogout, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { NavItem } from '@/shared/ui/layout'
import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  Button,
  LogOutOutlineIcon,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MoreHorizontalIcon,
  SettingsIcon,
  SettingsOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './HeaderMobileMenubar.module.scss'

type Props = { isAuth: boolean }

export const HeaderMobileMenubar = ({ isAuth }: Props) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { meData } = useContext(AuthContext)
  const { isLoading, isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button variant={'icon'}>
              <MoreHorizontalIcon className={s.icon} />
            </Button>
          </MenubarTrigger>
          <MenubarContent align={'end'} className={s.menubarContent} side={'bottom'} sideOffset={5}>
            {isAuth ? (
              <>
                <MenubarItem className={s.menuItem}>
                  <NavItem
                    activeIcon={<SettingsIcon className={s.icon} />}
                    inactiveIcon={<SettingsOutlineIcon className={s.icon} />}
                    isSelected={router.pathname === Paths.Settings}
                    label={t.appSidebar.profileSettings}
                    onClick={() => router.push(Paths.Settings)}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem className={s.menuItem}>
                  <NavItem
                    activeIcon={<TrendingUpIcon className={s.icon} />}
                    inactiveIcon={<TrendingUpOutlineIcon className={s.icon} />}
                    isSelected={router.pathname === Paths.Statistics}
                    label={t.appSidebar.statisticsLink}
                    onClick={() => router.push(Paths.Statistics)}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem className={s.menuItem}>
                  <NavItem
                    activeIcon={<BookmarkIcon className={s.icon} />}
                    inactiveIcon={<BookmarkOutlineIcon className={s.icon} />}
                    isSelected={router.pathname === Paths.Favourites}
                    label={t.appSidebar.favouritesLink}
                    onClick={() => router.push(Paths.Favourites)}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem className={s.menuItem}>
                  <NavItem
                    inactiveIcon={<LogOutOutlineIcon className={s.icon} />}
                    label={t.appSidebar.logOutButton}
                    onClick={() => setLogoutDialog(true)}
                    variant={'icon'}
                  />
                </MenubarItem>
              </>
            ) : (
              <>
                <MenubarItem className={s.menuItem}>
                  <NavItem
                    fullWidth
                    isSelected={router.pathname === Paths.LogIn}
                    label={t.appSidebar.loginButton}
                    onClick={() => router.push(Paths.LogIn)}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem className={s.menuItem}>
                  <NavItem
                    fullWidth
                    isSelected={router.pathname === Paths.SignUp}
                    label={t.appSidebar.registerButton}
                    onClick={() => router.push(Paths.SignUp)}
                    variant={'icon'}
                  />
                </MenubarItem>
              </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {/*todo: вынести в app ConfirmationDialog*/}
      {isLogoutDialog && (
        <ConfirmDialog
          isLoading={isLoading}
          isOpen={isLogoutDialog}
          onConfirm={logoutHandler}
          onOpenChange={setLogoutDialog}
          t={{
            ...t.logoutDialog,
            visibleBody: `${t.logoutDialog.visibleBody}: ${meData?.email || ''}?`,
          }}
        />
      )}
    </>
  )
}
