import { ReactNode } from 'react'

import { Button } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './NavItem.module.scss'

type Props = {
  /** Icon to show when item is active */
  activeIcon?: ReactNode
  /** Icon to show when item is not active */
  inactiveIcon?: ReactNode
  /** Whether this nav item is currently selected */
  isSelected?: boolean
  /** Text label for the nav item */
  label?: string
  /** Navigation link destination */
  linkUrl?: string
  /** Handler for click events */
  onItemClick?: () => void
}
export const NavItem = ({
  activeIcon,
  inactiveIcon,
  isSelected,
  label,
  linkUrl,
  onItemClick,
}: Props) => {
  return (
    <Button
      as={linkUrl ? Link : 'button'}
      className={s.navItem}
      data-active={isSelected}
      href={linkUrl}
      onClick={onItemClick}
      variant={'icon'}
    >
      {isSelected ? activeIcon : inactiveIcon}
      {label}
    </Button>
  )
}
