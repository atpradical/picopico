import { PostActionsDropdown, PostDescription } from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { PublicPostsItem } from '@/services/posts'
import { useAppDispatch, useIsAuthUserOnProfilePage, useTranslation } from '@/shared/hooks'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'
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
  postData: PublicPostsItem
  setEditMode: () => void
}
export const DisplayPostContent = ({ postData, setEditMode }: DisplayPostContentProps) => {
  const { t } = useTranslation()
  const { removeRouterQueryParam } = usePagesRouterQueryUpdate()
  const dispatch = useAppDispatch()
  const postsImages = postData.images.map(el => el.url)

  const isAuthUserOnProfilePage = useIsAuthUserOnProfilePage()

  const closePostDialogHandler = () => {
    dispatch(publicationsActions.togglePostDisplayDialog({ isOpen: false, postId: 0 }))
    removeRouterQueryParam('postId')
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
          <Avatar
            showUserName
            size={'xs'}
            src={postData.avatarOwner}
            userName={postData.userName}
          />
          {isAuthUserOnProfilePage && (
            <PostActionsDropdown
              onDeleteConfirm={closePostDialogHandler}
              onEdit={setEditMode}
              postId={postData.id}
            />
          )}
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
