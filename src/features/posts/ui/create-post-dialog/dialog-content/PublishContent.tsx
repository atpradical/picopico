import { PublishBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents } from '@/shared/ui/components'

type PublishContentProps = {
  imagesList: Nullable<File[]>
  previewList: Nullable<string[]>
}
export const PublishContent = ({ previewList }: PublishContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.publishDialogStep.accessibilityDescription}
        title={t.createPostDialog.publishDialogStep.accessibilityTitle}
      />
      <PublishBody previewList={previewList} />
    </>
  )
}
