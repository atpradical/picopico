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
