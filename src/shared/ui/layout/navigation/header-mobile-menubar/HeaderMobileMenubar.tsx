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
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './HeaderMobileMenubar.module.scss'

type Props = { isAuth: boolean }

export const HeaderMobileMenubar = ({ isAuth }: Props) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { isLoading, isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Button variant={'icon'}>
              <MoreHorizontalIcon className={s.icon} />
            </Button>
          </MenubarTrigger>
          <MenubarContent align={'end'} className={s.menubarContent} side={'bottom'} sideOffset={5}>
            {isAuth ? (
              <>
                <MenubarItem>
                  <NavItem
                    activeIcon={<SettingsIcon className={s.icon} />}
                    as={Link}
                    href={Paths.Settings}
                    inactiveIcon={<SettingsOutlineIcon className={s.icon} />}
                    isSelected={router.pathname === Paths.Settings}
                    label={'Profile Settings'}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem>
                  <NavItem
                    activeIcon={<TrendingUpIcon className={s.icon} />}
                    as={Link}
                    href={Paths.statistics}
                    inactiveIcon={<TrendingUpOutlineIcon className={s.icon} />}
                    isSelected={router.pathname === Paths.statistics}
                    label={t.appSidebar.statisticsLink}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem>
                  <NavItem
                    activeIcon={<BookmarkIcon className={s.icon} />}
                    as={Link}
                    href={Paths.favourites}
                    inactiveIcon={<BookmarkOutlineIcon className={s.icon} />}
                    isSelected={router.pathname === Paths.favourites}
                    label={t.appSidebar.favouritesLink}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem>
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
                <MenubarItem>
                  <NavItem
                    as={Link}
                    fullWidth
                    href={Paths.logIn}
                    isSelected={router.pathname === Paths.logIn}
                    label={'Войти'}
                    variant={'icon'}
                  />
                </MenubarItem>
                <MenubarItem>
                  <NavItem
                    as={Link}
                    fullWidth
                    href={Paths.signUp}
                    isSelected={router.pathname === Paths.signUp}
                    label={'Регистрация'}
                    variant={'icon'}
                  />
                </MenubarItem>
              </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {isLogoutDialog && (
        <ConfirmDialog
          isLoading={isLoading}
          isOpen={isLogoutDialog}
          onConfirm={logoutHandler}
          onOpenChange={setLogoutDialog}
          t={t.logoutDialog}
        />
      )}
    </>
  )
}
