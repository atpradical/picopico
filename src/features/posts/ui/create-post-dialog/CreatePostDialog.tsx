import { ChangeEvent, ComponentPropsWithoutRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { postsActions } from '@/features/posts/api'
import { POST_ALLOWED_UPLOAD_TYPES, POST_MAX_FILE_SIZE } from '@/features/posts/config'
import { PostsStep, selectPostsAllData } from '@/features/posts/model'
import {
  CropContent,
  FiltersContent,
  PublishContent,
  StartContent,
} from '@/features/posts/ui/create-post-dialog/dialog-content'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { DialogContent, DialogRoot, clsx } from '@atpradical/picopico-ui-kit'

import s from './CreatePostDialog.module.scss'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const CreatePostDialog = ({ onOpenChange, ...rest }: CreateNewPostDialogProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()
  const dispatch = useAppDispatch()
  const { dialogMeta, imagesList, postPreview } = useSelector(selectPostsAllData)

  useEffect(() => {
    if (imagesList.length) {
      const newPreview = URL.createObjectURL(imagesList[0])

      if (postPreview) {
        URL.revokeObjectURL(postPreview)
      }
      // todo: вспомнить нак переделать на Actions из to-do когда есть экспорт actions
      dispatch(postsActions.setPostPreview({ preview: newPreview }))

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
        dispatch(postsActions.setPostUploadingError({ error: createPostDialog.wrongFileFormat }))

        return
      }

      if (file.size >= POST_MAX_FILE_SIZE) {
        dispatch(
          postsActions.setPostUploadingError({
            error: createPostDialog.wrongFileSize,
          })
        )

        return
      }
      dispatch(postsActions.addNewPost({ post: file }))
      dispatch(postsActions.setPostsCreationStep({ step: PostsStep.Crop }))
    }

    return
  }

  const navigationButtonHandler = (step: PostsStep) => {
    dispatch(postsActions.setPostsCreationStep({ step }))
  }

  const isWide =
    dialogMeta.currentStep === PostsStep.Filters || dialogMeta.currentStep === PostsStep.Publish

  return (
    <DialogRoot onOpenChange={onOpenChange} open={dialogMeta.isDialogOpen} {...rest}>
      <DialogContent className={clsx(s.content, isWide && s.wide)} overlayClassName={s.overlay}>
        {dialogMeta.currentStep === PostsStep.Start && (
          <StartContent onUpload={uploadPostHandler} />
        )}
        {dialogMeta.currentStep === PostsStep.Crop && (
          <CropContent
            onBack={navigationButtonHandler}
            onConfirm={navigationButtonHandler}
            onUpload={uploadPostHandler}
          />
        )}
        {dialogMeta.currentStep === PostsStep.Filters && (
          <FiltersContent onBack={navigationButtonHandler} onConfirm={navigationButtonHandler} />
        )}
        {dialogMeta.currentStep === PostsStep.Publish && (
          <PublishContent onBack={navigationButtonHandler} />
        )}
      </DialogContent>
    </DialogRoot>
  )
}
