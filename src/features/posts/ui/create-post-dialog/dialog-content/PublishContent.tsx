import { useSelector } from 'react-redux'

import { postsActions } from '@/features/posts/api'
import { PostsStep, selectPostsDescription, selectPostsImagesList } from '@/features/posts/model'
import { PublishBody } from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { ProgressHeader } from '@/features/posts/ui/create-post-dialog/dialog-headers'
import { useCreatePostImageMutation, useCreatePostMutation } from '@/shared/api/posts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { HiddenDialogComponents } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'

type PublishContentProps = {
  onBack: (step: PostsStep) => void
}
export const PublishContent = ({ onBack }: PublishContentProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const description = useSelector(selectPostsDescription)
  const imagesList = useSelector(selectPostsImagesList)

  const [createPostImage] = useCreatePostImageMutation()
  const [createPost] = useCreatePostMutation()

  const publishPostHandler = async () => {
    const files = imagesList.map(image => image)

    try {
      const { images } = await createPostImage({
        file: files,
      }).unwrap()

      const uploadIdList = images.map(el => ({ uploadId: el.uploadId }))

      await createPost({ childrenMetadata: uploadIdList, description: description }).unwrap()
      dispatch(postsActions.resetPosts())
      dispatch(postsActions.togglePostCreationDialog({ isOpen: false }))
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  return (
    <>
      <HiddenDialogComponents
        description={t.createPostDialog.publishDialogStep.accessibilityDescription}
        title={t.createPostDialog.publishDialogStep.accessibilityTitle}
      />
      <ProgressHeader
        confirmButtonTitle={t.createPostDialog.buttons.publishButton}
        onBack={() => onBack(PostsStep.Filters)}
        onConfirm={publishPostHandler}
        title={t.createPostDialog.dialogTitles.publish}
      />
      <PublishBody />
    </>
  )
}
