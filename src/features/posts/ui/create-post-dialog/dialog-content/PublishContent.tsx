import { PublishBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { Nullable } from '@/shared/types'

type PublishContentProps = {
  imagesList: Nullable<File[]>
  previewList: Nullable<string[]>
}
export const PublishContent = ({ previewList }: PublishContentProps) => {
  return <PublishBody previewList={previewList} />
}
