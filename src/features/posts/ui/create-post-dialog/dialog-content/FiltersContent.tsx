import { PostsStep } from '@/features/posts/model'
import { FiltersBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { ProgressHeader } from '@/features/posts/ui/create-post-dialog/dialog-headers'
import { useTranslation } from '@/shared/hooks'
import { HiddenDialogComponents } from '@/shared/ui/components'

type FiltersContentProps = {
  onBack: (step: PostsStep) => void
  onConfirm: (step: PostsStep) => void
}

export const FiltersContent = ({ onBack, onConfirm }: FiltersContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.filtersDialogStep.accessibilityDescription}
        title={t.createPostDialog.filtersDialogStep.accessibilityTitle}
      />
      <ProgressHeader
        confirmButtonTitle={t.createPostDialog.buttons.nextButton}
        onBack={() => onBack(PostsStep.Crop)}
        onConfirm={() => onConfirm(PostsStep.Publish)}
        title={t.createPostDialog.dialogTitles.filters}
      />
      <FiltersBody />
    </>
  )
}
