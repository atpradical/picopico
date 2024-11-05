import { ComponentPropsWithoutRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { publicationsActions } from '@/features/posts/api'
import { selectPostContent, selectPublicationsAllData } from '@/features/posts/model'
import { DisplayPostContent } from '@/features/posts/ui'
import { AppState } from '@/lib/store'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { DialogRoot } from '@atpradical/picopico-ui-kit'

import { EditPostContent } from './edit-post-content'

type PostsDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const PostDialog = (props: PostsDialogProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { editMode, postId, showPost } = useSelector(selectPublicationsAllData)
  const postContent = useSelector((state: AppState) => selectPostContent(state, postId))

  const [isAlertDialog, setIsAlertDialog] = useState(false)

  if (!postContent) {
    return
  }

  const toggleEditModeHandler = () => {
    dispatch(publicationsActions.toggleEditMode({ isEdit: true }))
  }

  const interruptEditPostHandler = (event: Event) => {
    event.preventDefault()
    setIsAlertDialog(true)
  }

  const confirmExitEditModeHandler = () => {
    dispatch(publicationsActions.toggleEditMode({ isEdit: false }))
    setIsAlertDialog(false)
  }

  return (
    <>
      <DialogRoot open={showPost} {...props}>
        {editMode ? (
          <EditPostContent
            key={postContent.id}
            onInterrupt={interruptEditPostHandler}
            postData={postContent}
          />
        ) : (
          <DisplayPostContent postData={postContent} setEditMode={toggleEditModeHandler} />
        )}
      </DialogRoot>
      <ActionConfirmDialog
        accessibilityDescription={
          t.postDialog.editPostDialog.alertDeleteDialog.accessibilityDescription
        }
        accessibilityTitle={t.postDialog.editPostDialog.alertDeleteDialog.accessibilityTitle}
        confirmButtonText={t.postDialog.editPostDialog.alertDeleteDialog.confirmButtonText}
        isOpen={isAlertDialog}
        message={t.postDialog.editPostDialog.alertDeleteDialog.visibleBodyText}
        onConfirm={confirmExitEditModeHandler}
        onOpenChange={setIsAlertDialog}
        rejectButtonText={t.postDialog.editPostDialog.alertDeleteDialog.discardButtonText}
        title={t.postDialog.editPostDialog.alertDeleteDialog.visibleTitle}
      />
    </>
  )
}
