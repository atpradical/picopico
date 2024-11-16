import { ComponentPropsWithoutRef } from 'react'

import { DialogBody } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type CreatePostBodyProps = {} & ComponentPropsWithoutRef<typeof DialogBody>

export const CreatePostBody = ({ ...props }: CreatePostBodyProps) => {
  return <DialogBody className={clsx(s.body, s.withPreview)} {...props}></DialogBody>
}
