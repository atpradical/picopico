import { ComponentPropsWithoutRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectPostContent } from '@/features/posts/model'
import { DisplayPostContent } from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { selectPublicationsAllData } from '@/features/publication/model'
import { AppState } from '@/lib/store'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { AlertDialog } from '@/shared/ui/components'
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
      <AlertDialog
        isOpen={isAlertDialog}
        onConfirm={confirmExitEditModeHandler}
        onOpenChange={setIsAlertDialog}
        t={t.postDialog.editPostDialog.alertDeleteDialog}
      />
    </>
  )
}
