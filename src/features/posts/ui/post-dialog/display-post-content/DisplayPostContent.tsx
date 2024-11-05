import { publicationsActions } from '@/features/posts/api'
import { PostActionsDropdown, PostDescription } from '@/features/posts/ui'
import { GetPostsItems } from '@/services/posts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { HiddenDialogComponents } from '@/shared/ui/components'
import {
  Avatar,
  Carousel,
  DialogBody,
  DialogContent,
  DialogHeader,
  Typography,
} from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'

import s from './DisplayPostContent.module.scss'

type DisplayPostContentProps = {
  postData: GetPostsItems
  setEditMode: () => void
}
export const DisplayPostContent = ({ postData, setEditMode }: DisplayPostContentProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const postsImages = postData.images.map(el => el.url)

  const closePostDialogHandler = () => {
    dispatch(publicationsActions.togglePostDisplayDialog({ isOpen: false, postId: 0 }))
  }

  return (
    <DialogContent
      className={s.dialogContent}
      onClose={closePostDialogHandler}
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
          <Avatar showUserName size={'s'} src={postData.avatarOwner} userName={postData.userName} />
          <PostActionsDropdown
            onConfirm={closePostDialogHandler}
            onEdit={setEditMode}
            postId={postData.id}
          />
        </DialogHeader>
        <DialogBody className={s.dialogBody}>
          <PostDescription postData={postData} />
          <Separator.Root className={s.dialogSeparator} />
          <Typography grey>Comments, likes, and other features coming soon...</Typography>
        </DialogBody>
      </div>
    </DialogContent>
  )
}
