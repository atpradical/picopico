import { ComponentPropsWithoutRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { DisplayPostContent } from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { selectPublicationsAllData } from '@/features/publication/model'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { DialogRoot } from '@atpradical/picopico-ui-kit'

import { EditPostContent } from './edit-post-content'

type PostsDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const PostDialog = (props: PostsDialogProps) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const { editMode, postData, showPost } = useSelector(selectPublicationsAllData)

  const [isAlertDialog, setIsAlertDialog] = useState(false)

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

  if (!postData) {
    return null
  }

  return (
    <>
      <DialogRoot open={showPost} {...props}>
        {editMode ? (
          <EditPostContent
            key={postData.id}
            onInterrupt={interruptEditPostHandler}
            postData={postData}
          />
        ) : (
          <DisplayPostContent postData={postData} setEditMode={toggleEditModeHandler} />
        )}
      </DialogRoot>
      <ConfirmDialog
        isOpen={isAlertDialog}
        onConfirm={confirmExitEditModeHandler}
        onOpenChange={setIsAlertDialog}
        t={t.postDialog.editPostDialog.alertDeleteDialog}
      />
    </>
  )
}
