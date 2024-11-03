import { ComponentPropsWithoutRef } from 'react'

import { GetPostsItems } from '@/services/posts'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents } from '@/shared/ui/components'
import {
  Avatar,
  Button,
  Carousel,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  MoreHorizontalIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'

import s from './PostDialog.module.scss'

import { PostDescription } from '../post-description'

type PostsDialogProps = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: (open: boolean) => void
  postData: Nullable<GetPostsItems>
} & ComponentPropsWithoutRef<typeof DialogRoot>

export const PostDialog = ({ isOpen, onClose, onOpenChange, postData }: PostsDialogProps) => {
  if (!postData) {
    return
  }

  const postsImages = postData?.images.map(el => el.url)

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent
        className={s.dialogContent}
        onClose={onClose}
        overlayClassName={s.dialogOverlay}
        withCloseButton
      >
        <HiddenDialogComponents description={'description-hidden'} title={'title-hidden'} />
        <Carousel className={s.carousel} slides={postsImages} />
        <div className={s.postDetails}>
          <DialogHeader className={s.dialogHeader}>
            <Avatar
              showUserName
              size={'s'}
              src={postData?.avatarOwner}
              userName={postData?.userName}
            />
            <Button variant={'icon'}>
              <MoreHorizontalIcon />
            </Button>
          </DialogHeader>
          <DialogBody className={s.dialogBody}>
            <PostDescription postData={postData} />
            <Separator.Root className={s.dialogSeparator} />
            <Typography grey>Comments, likes, and other features coming soon...</Typography>
          </DialogBody>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
