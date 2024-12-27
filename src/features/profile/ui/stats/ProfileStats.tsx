import { UserMetadata } from '@/services/profile'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@atpradical/picopico-ui-kit'

import s from './ProfileStats.module.scss'

type ProfileStatsProps = {
  metaData: UserMetadata
}
export const ProfileStats = ({ metaData }: ProfileStatsProps) => {
  const { t } = useTranslation()

  // todo: добавить плюрали для статистики: подписок, подписчиков, публикаций
  return (
    <div className={s.stats}>
      <Typography
        variant={'regular_14'}
      >{`${metaData.following} ${t.profilePage.following}`}</Typography>
      <Typography
        variant={'regular_14'}
      >{`${metaData.followers} ${t.profilePage.followers}`}</Typography>
      <Typography
        variant={'regular_14'}
      >{`${metaData.publications} ${t.profilePage.publications}`}</Typography>
    </div>
  )
}
