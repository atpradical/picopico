import { Paths } from '@/shared/enums'
import { useLogout, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { NavItem } from '@/shared/ui/layout'
import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  Button,
  LogOutOutlineIcon,
  MoreHorizontalIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SettingsIcon,
  SettingsOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
} from '@atpradical/picopico-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './MenuPopover.module.scss'

type Props = { isAuth: boolean }
export const MenuPopover = ({ isAuth }: Props) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { isLoading, isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'icon'}>
          <MoreHorizontalIcon className={s.icon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'end'} className={s.popoverContent} side={'bottom'} sideOffset={5}>
        {isAuth ? (
          <>
            <nav>
              <NavItem
                activeIcon={<SettingsIcon className={s.icon} />}
                as={Link}
                className={s.popoverItem}
                href={Paths.Settings}
                inactiveIcon={<SettingsOutlineIcon className={s.icon} />}
                isSelected={router.pathname === Paths.Settings}
                label={'Profile Settings'}
                variant={'icon'}
              />
              <NavItem
                activeIcon={<TrendingUpIcon className={s.icon} />}
                as={Link}
                className={s.popoverItem}
                href={Paths.statistics}
                inactiveIcon={<TrendingUpOutlineIcon className={s.icon} />}
                isSelected={router.pathname === Paths.statistics}
                label={t.appSidebar.statisticsLink}
                variant={'icon'}
              />
              <NavItem
                activeIcon={<BookmarkIcon className={s.icon} />}
                as={Link}
                className={s.popoverItem}
                href={Paths.favourites}
                inactiveIcon={<BookmarkOutlineIcon className={s.icon} />}
                isSelected={router.pathname === Paths.favourites}
                label={t.appSidebar.favouritesLink}
                variant={'icon'}
              />
              <NavItem
                className={s.popoverItem}
                inactiveIcon={<LogOutOutlineIcon className={s.icon} />}
                label={t.appSidebar.logOutButton}
                onClick={() => setLogoutDialog(true)}
                variant={'icon'}
              />
              {isLogoutDialog && (
                <ConfirmDialog
                  isLoading={isLoading}
                  isOpen={isLogoutDialog}
                  onConfirm={logoutHandler}
                  onOpenChange={setLogoutDialog}
                  t={t.logoutDialog}
                />
              )}
            </nav>
          </>
        ) : (
          <nav>
            <NavItem
              as={Link}
              href={Paths.logIn}
              isSelected={router.pathname === Paths.logIn}
              label={'Войти'}
              variant={'nb-outlined'}
            />
            <NavItem
              as={Link}
              href={Paths.signUp}
              isSelected={router.pathname === Paths.signUp}
              label={'Регистрация'}
              variant={'nb-outlined'}
            />
          </nav>
        )}
      </PopoverContent>
    </Popover>
  )
}
