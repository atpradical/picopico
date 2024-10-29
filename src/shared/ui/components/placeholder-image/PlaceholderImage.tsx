import { Card, ImageOutlineIcon } from '@atpradical/picopico-ui-kit'

import s from './PlaceholderImage.module.scss'

export const PlaceholderImage = () => {
  return (
    <Card className={s.placeholderContainer}>
      <ImageOutlineIcon height={48} width={48} />
    </Card>
  )
}
