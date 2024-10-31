import { PostsStep } from '@/features/posts/model'
import { PublishBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { ProgressHeader } from '@/features/posts/ui/create-post-dialog/dialog-headers'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents } from '@/shared/ui/components'

type PublishContentProps = {
  imagesList: Nullable<File[]>
  onBack: (step: PostsStep) => void
  onConfirm: () => void
  previewList: Nullable<string[]>
}
export const PublishContent = ({ onBack, onConfirm, previewList }: PublishContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.publishDialogStep.accessibilityDescription}
        title={t.createPostDialog.publishDialogStep.accessibilityTitle}
      />
      <ProgressHeader
        confirmButtonTitle={t.createPostDialog.buttons.publishButton}
        onBack={() => onBack(PostsStep.Filters)}
        onConfirm={onConfirm}
        title={t.createPostDialog.dialogTitles.publish}
      />
      <PublishBody previewList={previewList} />
    </>
  )
}
