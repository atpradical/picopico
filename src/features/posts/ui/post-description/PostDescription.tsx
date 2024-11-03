import { GetPostsItems } from '@/services/posts'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'

type Props = {
  postData: GetPostsItems
}
export const PostDescription = ({ postData }: Props) => {
  // todo: исправить отображение даты и времени
  return (
    <div>
      <Typography>{postData.description}</Typography>
      <Typography>{new Date(postData.updatedAt).toLocaleDateString('ru')}</Typography>
    </div>
  )
}
