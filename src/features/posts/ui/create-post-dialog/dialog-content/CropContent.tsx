import { ChangeEvent } from 'react'

import { CropBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents } from '@/shared/ui/components'

type CropContentProps = {
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
}

export const CropContent = ({ onRemove, onUpload, previewList }: CropContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.cropDialogStep.accessibilityDescription}
        title={t.createPostDialog.cropDialogStep.accessibilityTitle}
      />
      <CropBody onRemove={onRemove} onUpload={onUpload} previewList={previewList} />
    </>
  )
}
