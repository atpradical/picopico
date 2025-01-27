import { Typography } from '@atpradical/picopico-ui-kit'

import s from './TotalUsers.module.scss'

type TotalUsersProps = {
  counter: string
}
export const TotalUsers = ({ counter }: TotalUsersProps) => {
  return (
    <div className={s.totalUsersContainer}>
      <Typography variant={'h2'}>Registered users:</Typography>
      <div className={s.totalUsersCounterContainer}>
        {counter.split('').map((el, index) => (
          <div className={s.square} key={index}>
            <Typography variant={'h2'}>{el}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
