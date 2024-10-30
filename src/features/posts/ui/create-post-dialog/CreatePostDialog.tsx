import { ChangeEvent, ComponentPropsWithoutRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { postsActions } from '@/features/posts/api/posts.reducer'
import { POST_ALLOWED_UPLOAD_TYPES, POST_MAX_FILE_SIZE } from '@/features/posts/config'
import { PostCreationStep, selectPostsAllData } from '@/features/posts/model'
import {
  CroppingBody,
  FilteringBody,
  PublishingBody,
  StartBody,
} from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { useCreatePostImageMutation, useCreatePostMutation } from '@/shared/api/posts'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { HiddenDialogComponents } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { DialogContent, DialogRoot, clsx } from '@atpradical/picopico-ui-kit'

import s from './CreatePostDialog.module.scss'

import { ProgressHeader, StartHeader } from './dialog-headers'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const CreatePostDialog = ({ onOpenChange, ...rest }: CreateNewPostDialogProps) => {
  const dispatch = useAppDispatch()
  const { description, dialogMeta, imagesList, postPreview } = useSelector(selectPostsAllData)

  useEffect(() => {
    if (imagesList.length) {
      const newPreview = URL.createObjectURL(imagesList[0])

      if (postPreview) {
        URL.revokeObjectURL(postPreview)
      }
      dispatch(postsActions.setPostPreview({ preview: newPreview })) // todo: вспомнить нак переделать на Actions из to-do когда есть экспорт actions

      return () => URL.revokeObjectURL(newPreview)
    }
    // 'preview' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList])

  const uploadPostHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(postsActions.setPostUploadingError({ error: '' }))
      const file = e.target.files[0]

      if (!POST_ALLOWED_UPLOAD_TYPES.includes(file.type)) {
        dispatch(postsActions.setPostUploadingError({ error: 'Не верный формат файла' })) // todo: добавить переводы.

        return
      }

      if (file.size >= POST_MAX_FILE_SIZE) {
        dispatch(
          postsActions.setPostUploadingError({
            error: 'Слишком большой размер файла (20mb предел)', // todo: добавить переводы.
          })
        )

        return
      }
      dispatch(postsActions.addNewPost({ post: file }))
      dispatch(postsActions.setPostsCreationStep({ step: PostCreationStep.Cropping }))
    }

    return
  }

  const navigationButtonHandler = (step: PostCreationStep) => {
    dispatch(postsActions.setPostsCreationStep({ step }))
  }

  const isWide =
    dialogMeta.currentStep === PostCreationStep.Filtering ||
    dialogMeta.currentStep === PostCreationStep.Publishing

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
      onOpenChange?.(false)
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={dialogMeta.isDialogOpen} {...rest}>
      <DialogContent className={clsx(s.content, isWide && s.wide)} overlayClassName={s.overlay}>
        {dialogMeta.currentStep === PostCreationStep.Idle && (
          <>
            <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
            <StartHeader />
            <StartBody onUpload={uploadPostHandler} />
          </>
        )}
        {dialogMeta.currentStep === PostCreationStep.Cropping && (
          <>
            <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
            <ProgressHeader
              confirmButtonTitle={'Next'}
              onBack={() => navigationButtonHandler(PostCreationStep.Idle)}
              onConfirm={() => navigationButtonHandler(PostCreationStep.Filtering)}
              title={'Cropping'}
            />
            <CroppingBody onUpload={uploadPostHandler} />
          </>
        )}
        {dialogMeta.currentStep === PostCreationStep.Filtering && (
          <>
            <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
            <ProgressHeader
              confirmButtonTitle={'Next'}
              onBack={() => navigationButtonHandler(PostCreationStep.Cropping)}
              onConfirm={() => navigationButtonHandler(PostCreationStep.Publishing)}
              title={' Filtering'}
            />
            <FilteringBody />
          </>
        )}
        {dialogMeta.currentStep === PostCreationStep.Publishing && (
          <>
            <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
            <ProgressHeader
              confirmButtonTitle={'Publish'}
              onBack={() => navigationButtonHandler(PostCreationStep.Filtering)}
              onConfirm={publishPostHandler}
              title={'Publishing'}
            />
            <PublishingBody />
          </>
        )}
      </DialogContent>
    </DialogRoot>
  )
}
