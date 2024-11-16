import { FiltersBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { Nullable } from '@/shared/types'

type FiltersContentProps = {
  previewList: Nullable<string[]>
}

export const FiltersContent = ({ previewList }: FiltersContentProps) => {
  return <FiltersBody previewList={previewList} />
}
