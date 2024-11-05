import { ChangeEvent, ComponentPropsWithoutRef } from 'react'

import { POSTS_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { AspectRatioDropdown } from '@/features/posts/ui/aspect-ratio-dropdown'
import { Nullable } from '@/shared/types'
import { Button, Carousel, DialogBody } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type CropBodyProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
} & ComponentPropsWithoutRef<typeof DialogBody>

export const CropBody = ({ onUpload, previewList, ...props }: CropBodyProps) => {
  return (
    <DialogBody className={clsx(s.body, s.withPreview)} {...props}>
      <div className={s.previewSizes}>
        <Carousel slides={previewList ?? []} />
        <AspectRatioDropdown />

        {/*  <Image*/}
        {/*    alt={createPostDialog.altDescription}*/}
        {/*    className={s.image} // todo: определиться с cover или contain*/}
        {/*    fill*/}
        {/*    src={previewList[0]}*/}
        {/*  />*/}
        <Button as={'label'} className={s.button} variant={'primary'}>
          <input
            accept={POSTS_ALLOWED_UPLOAD_TYPES.join(', ')}
            hidden
            onChange={onUpload}
            type={'file'}
          />
          Upload one more photo
        </Button>
      </div>
    </DialogBody>
  )
}
