import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { POST_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { selectPostPreview } from '@/features/posts/model'
import { useTranslation } from '@/shared/hooks'
import { Button, DialogBody } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type CropBodyProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const CropBody = ({ onUpload, ...props }: CropBodyProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()
  const postPreview = useSelector(selectPostPreview)

  return (
    <>
      <DialogBody className={clsx(s.body, s.withPreview)} {...props}>
        <div className={s.previewSizes}>
          <Image
            alt={createPostDialog.altDescription}
            className={s.image} // todo: определиться с cover или contain
            fill
            src={postPreview ?? ''}
          />
        </div>
      </DialogBody>
      <Button as={'label'} className={s.button} variant={'primary'}>
        <input
          accept={POST_ALLOWED_UPLOAD_TYPES.join(', ')}
          hidden
          onChange={onUpload}
          type={'file'}
        />
        {createPostDialog.buttons.selectFilesButton}
      </Button>
    </>
  )
}
