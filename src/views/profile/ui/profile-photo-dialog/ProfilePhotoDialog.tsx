import { HiddenDialogComponents, UploadFileError } from '@/shared/ui/components'
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Typography,
} from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './ProfilePhotoDialog.module.scss'

type ProfilePhotoDialogProps = {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}
export const ProfilePhotoDialog = ({ isOpen, onOpenChange }: ProfilePhotoDialogProps) => {
  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content} overlayClassName={s.overlay}>
        <HiddenDialogComponents description={'Add a Profile Photo'} title={'Add a Profile Photo'} />
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {'Add a Profile Photo'}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={s.body}>
          <UploadFileError errorText={'ERROR_TEXT'} />
          <Image alt={'dummy'} className={s.image} height={222} src={'/dummy_1.png'} width={228} />
          <Button className={s.button} onClick={() => {}} variant={'primary'}>
            {'Select from Computer'}
          </Button>
        </DialogBody>
        <DialogFooter className={s.footer}></DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
