import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { POSTS_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { selectPostsDialogMeta } from '@/features/posts/model'
import { useTranslation } from '@/shared/hooks'
import { UploadFileError } from '@/shared/ui/components'
import { PlaceholderImage } from '@/shared/ui/components/placeholder-image'
import { Button } from '@atpradical/picopico-ui-kit'
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type StartBodyProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const StartBody = ({ onUpload, ...rest }: StartBodyProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()
  const { errorMessage } = useSelector(selectPostsDialogMeta)

  return (
    <DialogBody className={s.body} {...rest}>
      {errorMessage && <UploadFileError errorText={errorMessage} />}
      <PlaceholderImage />
      <Button as={'label'} className={s.button} variant={'primary'}>
        <input
          accept={POSTS_ALLOWED_UPLOAD_TYPES.join(', ')}
          hidden
          onChange={onUpload}
          type={'file'}
        />
        {createPostDialog.buttons.selectFilesButton}
      </Button>
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
