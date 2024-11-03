import { ComponentPropsWithoutRef } from 'react'

import { PostActionsDropdown, PostDescription } from '@/features/posts/ui'
import { GetPostsItems } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { HiddenDialogComponents } from '@/shared/ui/components'
import {
  Avatar,
  Carousel,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  Typography,
} from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'

import s from './PostDialog.module.scss'

type PostsDialogProps = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: (open: boolean) => void
  postData: Nullable<GetPostsItems>
} & ComponentPropsWithoutRef<typeof DialogRoot>

export const PostDialog = ({ isOpen, onClose, onOpenChange, postData }: PostsDialogProps) => {
  const { t } = useTranslation()

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
        <HiddenDialogComponents
          description={t.postDialog.accessibilityDescription}
          title={t.postDialog.accessibilityTitle}
        />
        <Carousel className={s.carousel} slides={postsImages} />
        <div className={s.postDetails}>
          <DialogHeader className={s.dialogHeader}>
            <Avatar
              showUserName
              size={'s'}
              src={postData.avatarOwner}
              userName={postData.userName}
            />
            <PostActionsDropdown onConfirm={onClose} postId={postData.id} />
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
