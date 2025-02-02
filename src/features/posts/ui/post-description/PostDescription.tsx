import { GetPostsItems } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'

import s from './PostDescription.module.scss'

type Props = {
  postData: GetPostsItems
}
export const PostDescription = ({ postData }: Props) => {
  const { locale } = useTranslation()

  const formattedDate = new Date(postData.updatedAt).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={s.container}>
      <Avatar size={'xs'} src={postData.avatarOwner} userName={postData.userName} />
      <div className={s.descriptionWrapper}>
        <Typography variant={'regular_14'}>{postData.userName}</Typography>
        <Typography variant={'regular_14'}>{postData.description}</Typography>
        <Typography grey variant={'small'}>
          {formattedDate}
        </Typography>
      </div>
    </div>
  )
}
