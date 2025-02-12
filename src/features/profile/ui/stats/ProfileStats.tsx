import { ComponentPropsWithoutRef } from 'react'

import { UserMetadata } from '@/services/profile'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './ProfileStats.module.scss'

type ProfileStatsProps = {
  metaData: UserMetadata
} & ComponentPropsWithoutRef<'div'>

export const ProfileStats = ({ className, metaData, ...props }: ProfileStatsProps) => {
  const { t } = useTranslation()

  // todo: добавить плюрали для статистики: подписок, подписчиков, публикаций
  return (
    <div className={clsx(s.stats, className)} {...props}>
      <div className={s.statsItem}>
        <Typography variant={'regular_14'}>{metaData.following}</Typography>
        <Typography variant={'regular_14'}>{t.profilePage.following}</Typography>
      </div>
      <div className={s.statsItem}>
        <Typography variant={'regular_14'}>{metaData.followers}</Typography>
        <Typography variant={'regular_14'}>{t.profilePage.followers}</Typography>
      </div>
      <div className={s.statsItem}>
        <Typography variant={'regular_14'}>{metaData.publications}</Typography>
        <Typography variant={'regular_14'}>{t.profilePage.publications}</Typography>
      </div>
    </div>
  )
}
