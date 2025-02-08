import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Button } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './NavItem.module.scss'

type Props = {
  /** Icon to show when item is active */
  activeIcon?: ReactNode
  /** Text alignment inside Item */
  align?: 'center' | 'end' | 'start'
  /** Icon to show when item is not active */
  inactiveIcon?: ReactNode
  /** Whether this nav item is currently selected */
  isSelected?: boolean
  /** Text label for the nav item */
  label?: string
} & ComponentPropsWithoutRef<typeof Button>

export const NavItem = ({
  activeIcon,
  align = 'start',
  className,
  inactiveIcon,
  isSelected,
  label,
  ...rest
}: Props) => {
  return (
    <Button
      className={clsx(s.navItem, align && s[align], className)}
      data-active={isSelected}
      {...rest}
    >
      {isSelected ? activeIcon : inactiveIcon}
      {label}
    </Button>
  )
}
