import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { postsActions } from '@/features/posts/api'
import {
  POSTS_ALLOWED_UPLOAD_TYPES,
  POSTS_FILES_LIMIT,
  POSTS_MAX_FILE_SIZE,
} from '@/features/posts/config'
import { PostsStep, selectPostsAllData } from '@/features/posts/model'
import {
  CropContent,
  FiltersContent,
  PublishContent,
  StartContent,
} from '@/features/posts/ui/create-post-dialog/dialog-content'
import { useCreatePostImageMutation, useCreatePostMutation } from '@/services/posts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { DialogContent, DialogRoot, clsx } from '@atpradical/picopico-ui-kit'

import s from './CreatePostDialog.module.scss'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const CreatePostDialog = ({ onOpenChange, ...rest }: CreateNewPostDialogProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()
  const dispatch = useAppDispatch()
  const { description, dialogMeta } = useSelector(selectPostsAllData)
  const [interruptDialog, setInterruptDialog] = useState(false)
  // todo: переделать на Redux + IndexedDB
  const [imagesList, setImagesList] = useState<Nullable<File[]>>(null)
  const [previewList, setPreviewList] = useState<Nullable<string[]>>(null)

  useEffect(() => {
    if (imagesList && imagesList.length) {
      const newPreviews = imagesList.map(el => URL.createObjectURL(el))

      if (previewList) {
        previewList.forEach(el => URL.revokeObjectURL(el))
      }

      setPreviewList(newPreviews)

      return () => newPreviews.forEach(el => URL.revokeObjectURL(el))
    }
    // 'preview' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList])

  const uploadPostHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(postsActions.setPostsErrorMessage({ error: '' }))
      const files = Array.from(e.target.files)

      if (files.length >= POSTS_FILES_LIMIT) {
        dispatch(
          postsActions.setPostsErrorMessage({ error: createPostDialog.tooManyFilesForUploading })
        )

        return
      }

      files.forEach(el => {
        if (!POSTS_ALLOWED_UPLOAD_TYPES.includes(el.type)) {
          dispatch(postsActions.setPostsErrorMessage({ error: createPostDialog.wrongFileFormat }))

          return
        }
        if (el.size >= POSTS_MAX_FILE_SIZE) {
          dispatch(
            postsActions.setPostsErrorMessage({
              error: createPostDialog.wrongFileSize,
            })
          )

          return
        }

        setImagesList(state => [...(state || []), ...files])
        dispatch(postsActions.setPostsCreationStep({ step: PostsStep.Crop }))
      })
    }
  }

  const [createPostImage] = useCreatePostImageMutation()
  const [createPost] = useCreatePostMutation()

  const publishPostsHandler = async () => {
    if (dialogMeta.errorMessage) {
      showErrorToast(dialogMeta.errorMessage)

      return
    }

    const files = imagesList?.map(el => el) ?? []

    try {
      const { images } = await createPostImage({
        file: files,
      }).unwrap()

      const uploadIdList = images.map(el => ({ uploadId: el.uploadId }))

      await createPost({ childrenMetadata: uploadIdList, description }).unwrap()
      dispatch(postsActions.resetPosts())
      setPreviewList(null)
      setImagesList(null)
      dispatch(postsActions.togglePostCreationDialog({ isOpen: false }))
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  const navigationButtonHandler = (step: PostsStep) => {
    dispatch(postsActions.setPostsCreationStep({ step }))
  }

  const closeDialogHandler = () => {
    dispatch(postsActions.resetPosts())
    setPreviewList(null)
    setImagesList(null)
  }

  const interruptDialogHandler = (event: Event) => {
    event.preventDefault()
    setInterruptDialog(true)
  }

  const isWide =
    dialogMeta.currentStep === PostsStep.Filters || dialogMeta.currentStep === PostsStep.Publish

  return (
    <>
      <DialogRoot onOpenChange={onOpenChange} open={dialogMeta.isDialogOpen} {...rest}>
        <DialogContent
          className={clsx(s.content, isWide && s.wide)}
          onEscapeKeyDown={interruptDialogHandler}
          onInteractOutside={interruptDialogHandler}
          overlayClassName={s.overlay}
        >
          {dialogMeta.currentStep === PostsStep.Start && (
            <StartContent onClose={closeDialogHandler} onUpload={uploadPostHandler} />
          )}
          {dialogMeta.currentStep === PostsStep.Crop && (
            <CropContent
              onBack={navigationButtonHandler}
              onConfirm={navigationButtonHandler}
              onUpload={uploadPostHandler}
              previewList={previewList}
            />
          )}
          {dialogMeta.currentStep === PostsStep.Filters && (
            <FiltersContent
              onBack={navigationButtonHandler}
              onConfirm={navigationButtonHandler}
              previewList={previewList}
            />
          )}
          {dialogMeta.currentStep === PostsStep.Publish && (
            <PublishContent
              imagesList={imagesList}
              onBack={navigationButtonHandler}
              onConfirm={publishPostsHandler}
              previewList={previewList}
            />
          )}
        </DialogContent>
      </DialogRoot>
      <ActionConfirmDialog
        accessibilityDescription={createPostDialog.interruptDialog.accessibilityDescription}
        accessibilityTitle={createPostDialog.interruptDialog.accessibilityTitle}
        confirmButtonText={createPostDialog.interruptDialog.saveButtonText}
        isOpen={interruptDialog}
        message={createPostDialog.interruptDialog.visibleBodyText}
        onConfirm={() => {}} //todo: добавить возможность сохранять черновик в IndexedDB
        onOpenChange={setInterruptDialog}
        rejectButtonText={createPostDialog.interruptDialog.discardButtonText}
        title={createPostDialog.interruptDialog.title}
      />
    </>
  )
}
