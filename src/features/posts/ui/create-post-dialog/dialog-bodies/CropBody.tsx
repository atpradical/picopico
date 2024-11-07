import { ChangeEvent, ComponentPropsWithoutRef } from 'react'

import { ExpandPopover, ScalePopover, UploadPopover } from '@/features/posts/ui/popovers'
import { Nullable } from '@/shared/types'
import { Carousel, DialogBody } from '@atpradical/picopico-ui-kit'
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
        <div className={s.toolsContainer}>
          <div className={s.leftToolsContainer}>
            <ExpandPopover />
            <ScalePopover />
          </div>
          <UploadPopover previewList={previewList} />
        </div>
      </div>
    </DialogBody>
  )
}
