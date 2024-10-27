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

import s from '@/shared/ui/components/email-confirmation-dialog/EmailConfirmationDialog.module.scss'

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
        <DialogBody>
          <UploadFileError errorText={'ERROR_TEXT'} />
          <Typography variant={'regular_14'}>{`BODY`}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button className={s.button} onClick={() => {}} variant={'primary'}>
            {'Select from Computer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
