import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { POSTS_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { selectPostDialogMeta } from '@/features/posts/model'
import { useTranslation } from '@/shared/hooks'
import { PlaceholderImage, UploadFileError } from '@/shared/ui/components'
import { Button, DialogBody, FileUploader } from '@atpradical/picopico-ui-kit'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type StartBodyProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const StartBody = ({ onUpload, ...rest }: StartBodyProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()
  const { errorMessage } = useSelector(selectPostDialogMeta)

  return (
    <DialogBody className={s.body} {...rest}>
      {errorMessage && <UploadFileError errorText={errorMessage} />}
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
