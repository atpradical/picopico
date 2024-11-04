import { ComponentPropsWithoutRef, useState } from 'react'

import { DisplayPostContent } from '@/features/posts/ui'
import { GetPostsItems, useUpdatePostMutation } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { DialogRoot } from '@atpradical/picopico-ui-kit'

import { EditPostContent } from './edit-post-content'

type PostsDialogProps = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: (open: boolean) => void
  postData: Nullable<GetPostsItems>
} & ComponentPropsWithoutRef<typeof DialogRoot>

export const PostDialog = ({ isOpen, onClose, onOpenChange, postData }: PostsDialogProps) => {
  const { t } = useTranslation()
  const [isAlertDialog, setIsAlertDialog] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [updatePost] = useUpdatePostMutation()

  if (!postData) {
    return
  }

  const toggleEditModeHandler = () => {
    setEditMode(true)
  }

  const interruptEditPostHandler = (event: Event) => {
    event.preventDefault()
    setIsAlertDialog(true)
  }

  const confirmExitEditModeHandler = () => {
    setEditMode(false)
    setIsAlertDialog(false)
  }

  const savePostChangesHandler = async (description: string) => {
    try {
      await updatePost({ description, postId: postData?.id }).unwrap()
      setEditMode(false)
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  return (
    <>
      <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
        {editMode ? (
          <EditPostContent
            key={postData.id}
            onInterrupt={interruptEditPostHandler}
            onSave={savePostChangesHandler}
            postData={postData}
          />
        ) : (
          <DisplayPostContent
            onClose={onClose}
            postData={postData}
            setEditMode={toggleEditModeHandler}
          />
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
