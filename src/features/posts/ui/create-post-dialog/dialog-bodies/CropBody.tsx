import { ChangeEvent, ComponentPropsWithoutRef } from 'react'

import { CreatePostCarousel } from '@/features/posts/ui'
import { DialogBody } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type CropBodyProps = {
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const CropBody = ({ onRemove, onUpload, ...props }: CropBodyProps) => {
  return (
    <DialogBody className={clsx(s.body, s.withPreview)} {...props}>
      <CreatePostCarousel onRemove={onRemove} onUpload={onUpload} />
    </DialogBody>
  )
}
