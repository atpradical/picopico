import { FiltersBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents } from '@/shared/ui/components'

type FiltersContentProps = {
  previewList: Nullable<string[]>
}

export const FiltersContent = ({ previewList }: FiltersContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.filtersDialogStep.accessibilityDescription}
        title={t.createPostDialog.filtersDialogStep.accessibilityTitle}
      />
      <FiltersBody previewList={previewList} />
    </>
  )
}
