import { ChangeEvent } from 'react'

import { CropBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { Nullable } from '@/shared/types'

type CropContentProps = {
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
}

export const CropContent = ({ onRemove, onUpload, previewList }: CropContentProps) => {
  return <CropBody onRemove={onRemove} onUpload={onUpload} previewList={previewList} />
}
