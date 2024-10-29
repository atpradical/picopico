import { ComponentPropsWithoutRef } from 'react'

import { ALLOWED_IMAGE_UPLOAD_TYPES } from '@/shared/constants'
import { HiddenDialogComponents, UploadFileError } from '@/shared/ui/components'
import { PlaceholderImage } from '@/shared/ui/components/placeholder-image'
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogRoot,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './CreateNewPostDialog.module.scss'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const CreateNewPostDialog = ({ onOpenChange, open, ...rest }: CreateNewPostDialogProps) => {
  return (
    <DialogRoot onOpenChange={onOpenChange} open={open} {...rest}>
      <DialogContent className={s.content} overlayClassName={s.overlay}>
        <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {'Add Photo'}
          </Typography>
          <DialogClose asChild>
            <Button title={'CLOSE BUTTON'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={s.body}>
          <UploadFileError errorText={'UPLOADING ERROR'} />
          <PlaceholderImage />
          <Button as={'label'} className={s.button} onClick={() => {}} variant={'primary'}>
            <input
              accept={ALLOWED_IMAGE_UPLOAD_TYPES.join(', ')}
              hidden
              onChange={() => console.log('select file button clicked')}
              type={'file'}
            />
            {'Select from Computer'}
          </Button>
          <Button
            className={s.button}
            onClick={() => console.log('select DRAFT button clicked')}
            variant={'outlined'}
          >
            {'Open Draft'}
          </Button>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
