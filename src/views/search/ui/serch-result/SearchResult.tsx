import { Avatar, Card, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './SearchResult.module.scss'

type SearchResultProps = {}
export const SearchResult = ({}: SearchResultProps) => {
  return (
    <Link href={'#'}>
      <Card className={s.card}>
        <Avatar size={'s'} src={'/favicon-dark-32x32.png?v=2'} />
        <div>
          <Typography>Ekat_Ivanova</Typography>
          <Typography grey>Ekaterina Ivanova</Typography>
        </div>
      </Card>
    </Link>
  )
}
