import { ChangeEvent } from 'react'

import { StartBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { StartHeader } from '@/features/posts/ui/create-post-dialog/dialog-headers'
import { useTranslation } from '@/shared/hooks'
import { HiddenDialogComponents } from '@/shared/ui/components'

type StartContentProps = {
  onClose: () => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const StartContent = ({ onClose, onUpload }: StartContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.startDialogStep.accessibilityDescription}
        title={t.createPostDialog.startDialogStep.accessibilityTitle}
      />
      <StartHeader onClose={onClose} />
      <StartBody onUpload={onUpload} />
    </>
  )
}
