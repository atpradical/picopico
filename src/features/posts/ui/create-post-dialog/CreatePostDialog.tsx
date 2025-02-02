import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import {
  POSTS_ALLOWED_UPLOAD_TYPES,
  POSTS_FILES_LIMIT,
  POSTS_MAX_FILE_SIZE,
  PostFilter,
} from '@/features/posts/config'
import {
  PostsDescriptionField,
  PostsStep,
  postsDescriptionSchemeCreator,
  selectCreatePostAllData,
} from '@/features/posts/model'
import { CreatePostCarousel, CreatePostFilters, CreatePostHeader } from '@/features/posts/ui'
import { PostMetadataForm } from '@/features/posts/ui/post-meta-form'
import { useCreatePostImageMutation, useCreatePostMutation } from '@/services/posts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ConfirmDialog, HiddenDialogComponents, PlaceholderImage } from '@/shared/ui/components'
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
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './create-post-dialog-styles.module.scss'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

// todo: IndexedDB
export const CreatePostDialog = ({ onOpenChange, ...rest }: CreateNewPostDialogProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { dialogMeta, previewList } = useSelector(selectCreatePostAllData)
  const [isAlertDialog, setIsAlertDialog] = useState(false)

  useEffect(() => {
    if (!previewList.length) {
      dispatch(createPostActions.resetPost())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewList.length])

  const methods = useForm<PostsDescriptionField>({
    defaultValues: {
      description: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(postsDescriptionSchemeCreator(t.validation.postDescription.maxLength)),
  })

  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = methods

  const uploadPostHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (previewList && previewList.length >= POSTS_FILES_LIMIT) {
      toasterModal({ text: t.createPostDialog.tooManyFilesForUploading, variant: 'error' })

      return
    }

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (!POSTS_ALLOWED_UPLOAD_TYPES.includes(file.type)) {
        toasterModal({ text: t.createPostDialog.wrongFileFormat, variant: 'error' })

        return
      }
      if (file.size >= POSTS_MAX_FILE_SIZE) {
        toasterModal({ text: t.createPostDialog.wrongFileSize, variant: 'error' })

        return
      }

      const previewUrl = URL.createObjectURL(file)

      dispatch(
        createPostActions.addPostPreview({
          preview: {
            appliedFilter: PostFilter.original,
            appliedZoom: 1,
            aspectModified: 1,
            aspectOrig: 1,
            crop: { x: 0, y: 0 },
            croppedAreaPixels: null,
            previewUrlModified: previewUrl,
            previewUrlOrig: previewUrl,
          },
        })
      )
      dispatch(createPostActions.setPostCreationStep({ step: PostsStep.Crop }))
    }
  }
  const [createPostImage, { isLoading: isLoadingCreatePostImage }] = useCreatePostImageMutation()
  const [createPost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation()

  const publishPostsHandler = handleSubmit(async ({ description }: PostsDescriptionField) => {
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

      // todo: CHECK
      // clearPostsDB()
      dispatch(createPostActions.togglePostCreationDialog({ isOpen: false }))
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  })

  const navigationButtonHandler = (step: PostsStep) => {
    dispatch(createPostActions.setPostCreationStep({ step }))
  }

  const closeDialogHandler = () => {
    // Очищаем все объектные URL-адреса
    previewList?.forEach(preview => {
      URL.revokeObjectURL(preview.previewUrlOrig)
      URL.revokeObjectURL(preview.previewUrlModified)
    })

    // Сбрасываем состояние
    reset()
    dispatch(createPostActions.resetPost())
    dispatch(createPostActions.togglePostCreationDialog({ isOpen: false }))
  }

  const interruptDialogHandler = (event: Event) => {
    event.preventDefault()
    setIsAlertDialog(true)
  }

  const removeImageHandler = (index: number) => {
    if (previewList?.length) {
      // Очищаем URL-адрес для удаляемого изображения
      URL.revokeObjectURL(previewList[index].previewUrlOrig)
      URL.revokeObjectURL(previewList[index].previewUrlModified)

      // Удаляем изображение из состояния
      dispatch(createPostActions.removePostPreview({ index }))
    }
  }

  const isWide =
    dialogMeta.currentStep === PostsStep.Filters || dialogMeta.currentStep === PostsStep.Publish

  const isPublishing = isLoadingCreatePost || isLoadingCreatePostImage

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
            isPublishing={isPublishing}
            isValid={isValid}
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
              <CreatePostCarousel
                onRemove={removeImageHandler}
                onUpload={uploadPostHandler}
                previewList={previewList}
              />
              {dialogMeta.currentStep === PostsStep.Filters && <CreatePostFilters />}
              {dialogMeta.currentStep === PostsStep.Publish && (
                <FormProvider {...methods}>
                  <PostMetadataForm />
                </FormProvider>
              )}
            </DialogBody>
          )}
        </DialogContent>
      </DialogRoot>
      <ConfirmDialog
        isOpen={isAlertDialog}
        onConfirm={() => {}} //todo: добавить возможность сохранять черновик в IndexedDB
        onOpenChange={setIsAlertDialog}
        onReject={closeDialogHandler}
        t={t.createPostDialog.alertDialog}
      />
    </>
  )
}
