import { ChangeEvent } from 'react'

import { PostsStep } from '@/features/posts/model'
import { CropBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { ProgressHeader } from '@/features/posts/ui/create-post-dialog/dialog-headers'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents } from '@/shared/ui/components'

type CropContentProps = {
  onBack: (step: PostsStep) => void
  onConfirm: (step: PostsStep) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
}

export const CropContent = ({ onBack, onConfirm, onUpload, previewList }: CropContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.cropDialogStep.accessibilityDescription}
        title={t.createPostDialog.cropDialogStep.accessibilityTitle}
      />
      <ProgressHeader
        confirmButtonTitle={t.createPostDialog.buttons.nextButton}
        onBack={() => onBack(PostsStep.Start)}
        onConfirm={() => onConfirm(PostsStep.Filters)}
        title={t.createPostDialog.dialogTitles.crop}
      />
      <CropBody onUpload={onUpload} previewList={previewList} />
    </>
  )
}
