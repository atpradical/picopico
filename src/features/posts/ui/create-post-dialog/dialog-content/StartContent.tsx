import { ChangeEvent } from 'react'

import { StartBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'

type StartContentProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const StartContent = ({ onUpload }: StartContentProps) => {
  return <StartBody onUpload={onUpload} />
}
