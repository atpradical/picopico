import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import {
  POSTS_ALLOWED_UPLOAD_TYPES,
  POSTS_FILES_LIMIT,
  POSTS_MAX_FILE_SIZE,
  PostFilter,
} from '@/features/posts/config'
import { PostsStep, selectCreatePostAllData } from '@/features/posts/model'
import {
  CreatePostCarousel,
  CreatePostDescription,
  CreatePostFilters,
  CreatePostHeader,
} from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { useCreatePostImageMutation, useCreatePostMutation } from '@/services/posts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { AlertDialog, HiddenDialogComponents, PlaceholderImage } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import getCroppedImg from '@/shared/utils/crop-image'
import {
  Button,
  DialogBody,
  DialogContent,
  DialogRoot,
  FileUploader,
  toasterModal,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './create-post-dialog-styles.module.scss'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const CreatePostDialog = ({ onOpenChange, ...rest }: CreateNewPostDialogProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { description, dialogMeta, previewList } = useSelector(selectCreatePostAllData)
  const [isAlertDialog, setIsAlertDialog] = useState(false)
  // todo: переделать на Redux + IndexedDB
  const [imagesList, setImagesList] = useState<Nullable<File[]>>(null)

  useEffect(() => {
    if (imagesList && imagesList.length) {
      const newPreviews = imagesList.map(el => {
        const previewUrl = URL.createObjectURL(el)

        return {
          appliedFilter: PostFilter.original,
          appliedZoom: 1,
          aspectModified: 1,
          aspectOrig: 1,
          crop: { x: 0, y: 0 },
          croppedAreaPixels: null,
          previewUrlModified: previewUrl,
          previewUrlOrig: previewUrl,
        }
      })

      if (previewList && previewList.length) {
        previewList.forEach(el => URL.revokeObjectURL(el.previewUrlOrig ?? ''))
      }

      dispatch(createPostActions.addPostPreview({ preview: newPreviews }))

      return () => newPreviews.forEach(el => URL.revokeObjectURL(el.previewUrlOrig))
    } else {
      dispatch(createPostActions.setPostCreationStep({ step: PostsStep.Start }))
    }
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

    if (!previewList?.length) {
      return
    }

    const filesPromises = previewList.map(async el => {
      return await getCroppedImg(el.previewUrlModified, el.croppedAreaPixels, 0)
    })

    try {
      const files = await Promise.all(filesPromises)

      const { images } = await createPostImage({
        file: files,
      }).unwrap()

      const uploadIdList = images.map(el => ({ uploadId: el.uploadId }))

      await createPost({ childrenMetadata: uploadIdList, description }).unwrap()
      dispatch(createPostActions.resetPost())

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

  const isWide =
    dialogMeta.currentStep === PostsStep.Filters || dialogMeta.currentStep === PostsStep.Publish

  return (
    <>
      <DialogRoot onOpenChange={onOpenChange} open={dialogMeta.isDialogOpen} {...rest}>
        <DialogContent
          className={clsx(s.content, isWide && s.wide)}
          noBorder
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
          />
          {dialogMeta.currentStep === PostsStep.Start ? (
            <DialogBody className={s.body}>
              <PlaceholderImage />
              <FileUploader
                accept={POSTS_ALLOWED_UPLOAD_TYPES}
                className={s.button}
                onChange={uploadPostHandler}
              >
                {t.createPostDialog.buttons.selectFilesButton}
              </FileUploader>
              <Button
                className={s.button}
                onClick={() => {}} // todo: добавить черновик
                variant={'outlined'}
              >
                {t.createPostDialog.buttons.openDraftButton}
              </Button>
            </DialogBody>
          ) : (
            <DialogBody
              className={clsx(
                s.bodyFilters,
                dialogMeta.currentStep === PostsStep.Crop && s.bodyCrop
              )}
            >
              <CreatePostCarousel onRemove={removeImageHandler} onUpload={uploadPostHandler} />
              {dialogMeta.currentStep === PostsStep.Filters && <CreatePostFilters />}
              {dialogMeta.currentStep === PostsStep.Publish && <CreatePostDescription />}
            </DialogBody>
          )}
        </DialogContent>
      </DialogRoot>
      <AlertDialog
        isOpen={isAlertDialog}
        onConfirm={() => {}} //todo: добавить возможность сохранять черновик в IndexedDB
        onOpenChange={setIsAlertDialog}
        t={t.createPostDialog.alertDialog}
      />
    </>
  )
}
