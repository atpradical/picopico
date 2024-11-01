import { ComponentPropsWithoutRef, useContext } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { Avatar, Button, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import link from 'next/link'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = ComponentPropsWithoutRef<'section'>
export const ProfileHeader = ({ className, ...props }: ProfileHeaderProps) => {
  const { isAuth } = useContext(AuthContext)

  return (
    <section className={clsx(s.container, className)} {...props}>
      <Avatar className={s.avatar} src={'/dummy_1.png'} />
      <div className={s.content}>
        <div className={s.titleBlock}>
          <Typography as={'h1'} variant={'h1'}>
            ProfileTitle
          </Typography>
          {isAuth && (
            <Button as={link} href={Paths.Settings} variant={'secondary'}>
              Profile Settings
            </Button>
          )}
        </div>
        <ProfileStats />
        <Typography>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. Lorem ipsum dolor
          sit amet, consetetur sadipscing elitr, sed diam.
        </Typography>
      </div>
    </section>
  )
}
