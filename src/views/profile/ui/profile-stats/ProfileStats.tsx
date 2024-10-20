import { Typography } from '@atpradical/picopico-ui-kit'

import s from './ProfileStats.module.scss'

type ProfileStatsProps = {}
export const ProfileStats = ({}: ProfileStatsProps) => {
  return (
    <div className={s.stats}>
      <Typography variant={'regular_14'}>2 218 Following</Typography>
      <Typography variant={'regular_14'}>2 358 Followers</Typography>
      <Typography variant={'regular_14'}>2 764 Publications</Typography>
    </div>
  )
}
