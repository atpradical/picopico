import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { createPostActions, publicationsActions } from '@/features/posts/api'
import {
  POSTS_ALLOWED_UPLOAD_TYPES,
  POSTS_FILES_LIMIT,
  POSTS_MAX_FILE_SIZE,
  PostFilter,
} from '@/features/posts/config'
import { PostsStep, selectCreatePostAllData } from '@/features/posts/model'
import { applyFilter } from '@/features/posts/model/apply-filter'
import { CreatePostHeader } from '@/features/posts/ui'
import {
  CropBody,
  FiltersBody,
  PublishBody,
  StartBody,
} from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { useCreatePostImageMutation, useCreatePostMutation } from '@/services/posts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { ActionConfirmDialog, HiddenDialogComponents } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { DialogContent, DialogRoot, toasterModal } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './create-post-dialog-styles.module.scss'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const CreatePostDialog = ({ onOpenChange, ...rest }: CreateNewPostDialogProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { description, dialogMeta } = useSelector(selectCreatePostAllData)
  const [isAlertDialog, setIsAlertDialog] = useState(false)
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
    } else {
      dispatch(createPostActions.setPostCreationStep({ step: PostsStep.Start }))
    }

    // 'preview' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList])

  const uploadPostHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      if (imagesList && imagesList.length >= POSTS_FILES_LIMIT) {
        toasterModal({ text: t.createPostDialog.tooManyFilesForUploading, variant: 'error' })

        return
      }

      const file = e.target.files[0]

      if (!POSTS_ALLOWED_UPLOAD_TYPES.includes(file.type)) {
        debugger
        toasterModal({ text: t.createPostDialog.wrongFileFormat, variant: 'error' })

        return
      }
      if (file.size >= POSTS_MAX_FILE_SIZE) {
        toasterModal({ text: t.createPostDialog.wrongFileSize, variant: 'error' })

        return
      }

      setImagesList(state => [...(state || []), file])
      // addToPostsDB(file)
      dispatch(createPostActions.setPostCreationStep({ step: PostsStep.Crop }))
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
      dispatch(createPostActions.resetPost())
      setPreviewList(null)
      setImagesList(null)
      // clearPostsDB()
      dispatch(publicationsActions.resetPublications())
      dispatch(createPostActions.togglePostCreationDialog({ isOpen: false }))
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  const navigationButtonHandler = (step: PostsStep) => {
    dispatch(createPostActions.setPostCreationStep({ step }))
  }

  const closeDialogHandler = () => {
    dispatch(createPostActions.resetPost())
    setPreviewList(null)
    setImagesList(null)
  }

  const interruptDialogHandler = (event: Event) => {
    event.preventDefault()
    setIsAlertDialog(true)
  }

  const removeImageHandler = (index: number) => {
    if (imagesList?.length) {
      const updatedImagesList = imagesList?.filter((_, i) => i !== index)

      setImagesList([...updatedImagesList])
    }
  }

  const setPostFilterHandler = async (filter: PostFilter, index: number) => {
    if (!previewList) {
      return
    }

    const newPreviewList = await Promise.all(
      previewList.map(async (el, i) => {
        if (i === index) {
          return await applyFilter(el, filter)
        }

        return el
      })
    )

    setPreviewList(newPreviewList)
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
          <HiddenDialogComponents
            description={t.createPostDialog.accessibilityDescription}
            title={t.createPostDialog.accessibilityTitle}
          />
          <CreatePostHeader
            onBack={navigationButtonHandler}
            onClose={closeDialogHandler}
            onNext={navigationButtonHandler}
            onPublish={publishPostsHandler}
            step={dialogMeta.currentStep}
          />
          {dialogMeta.currentStep === PostsStep.Start && <StartBody onUpload={uploadPostHandler} />}
          {dialogMeta.currentStep === PostsStep.Crop && (
            <CropBody
              onRemove={removeImageHandler}
              onUpload={uploadPostHandler}
              previewList={previewList}
            />
          )}
          {dialogMeta.currentStep === PostsStep.Filters && (
            <FiltersBody onFilterChange={setPostFilterHandler} previewList={previewList} />
          )}
          {dialogMeta.currentStep === PostsStep.Publish && (
            <PublishBody previewList={previewList} />
          )}
        </DialogContent>
      </DialogRoot>
      <ActionConfirmDialog
        accessibilityDescription={t.createPostDialog.interruptDialog.accessibilityDescription}
        accessibilityTitle={t.createPostDialog.interruptDialog.accessibilityTitle}
        confirmButtonText={t.createPostDialog.interruptDialog.saveButtonText}
        isOpen={isAlertDialog}
        message={t.createPostDialog.interruptDialog.visibleBodyText}
        onConfirm={() => {}} //todo: добавить возможность сохранять черновик в IndexedDB
        onOpenChange={setIsAlertDialog}
        rejectButtonText={t.createPostDialog.interruptDialog.discardButtonText}
        title={t.createPostDialog.interruptDialog.title}
      />
    </>
  )
}
