import { ChangeEvent, ComponentPropsWithoutRef } from 'react'

import { POSTS_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { useTranslation } from '@/shared/hooks'
import { PlaceholderImage } from '@/shared/ui/components'
import { Button, DialogBody, FileUploader } from '@atpradical/picopico-ui-kit'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type StartBodyProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const StartBody = ({ onUpload, ...rest }: StartBodyProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()

  return (
    <DialogBody className={s.body} {...rest}>
      <PlaceholderImage />
      <FileUploader accept={POSTS_ALLOWED_UPLOAD_TYPES} className={s.button} onChange={onUpload}>
        {createPostDialog.buttons.selectFilesButton}
      </FileUploader>
      <Button
        className={s.button}
        onClick={() => {}} // todo: добавить handlers для кнопок
        variant={'outlined'}
      >
        {createPostDialog.buttons.openDraftButton}
      </Button>
    </DialogBody>
  )
}
