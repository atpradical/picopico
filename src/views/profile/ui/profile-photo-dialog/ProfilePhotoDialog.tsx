import { UploadFileError } from '@/shared/ui/components/upload-file-error'
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from '@/shared/ui/components/email-confirmation-dialog/EmailConfirmationDialog.module.scss'

type ProfilePhotoDialogProps = {
  isOpen?: boolean
  onOpenChange?: () => void
}
export const ProfilePhotoDialog = ({ isOpen, onOpenChange }: ProfilePhotoDialogProps) => {
  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content} overlayClassName={s.overlay}>
        <VisuallyHidden asChild>
          <DialogTitle>{'TITLE'}</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>{'DESCRIPTION'}</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {'HEADER'}
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
            {'BUTTON'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
