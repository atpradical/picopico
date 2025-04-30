import { ElementRef, forwardRef } from 'react'

import { User } from '@/services/users'
import { Paths } from '@/shared/enums'
import { Avatar, Card, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './SearchResult.module.scss'

type SearchResultProps = {
  user: User
}
type SearchResultItemRef = ElementRef<'div'>

export const SearchResult = forwardRef<SearchResultItemRef, SearchResultProps>((props, ref) => {
  const { user } = props
  const fullUserName = user.firstName ? `${user.firstName} ${user.lastName}` : 'Anonymous'

  return (
    <div className={s.container} ref={ref}>
      <Link href={Paths.Profile + `/${user.id}`}>
        <Card className={s.card}>
          <Avatar size={'s'} src={user.avatars[1]?.url} />
          <div>
            <Typography className={s.userName}>{user.userName}</Typography>
            <Typography grey>{fullUserName}</Typography>
          </div>
        </Card>
      </Link>
    </div>
  )
})
