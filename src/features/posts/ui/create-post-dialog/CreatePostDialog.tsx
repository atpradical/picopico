import { ChangeEvent, ComponentPropsWithoutRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { postsActions } from '@/features/posts/api/posts.reducer'
import { ALLOWED_POST_UPLOAD_TYPES, POST_MAX_FILE_SIZE } from '@/features/posts/config'
import { PostCreationStep, selectPosts } from '@/features/posts/model'
import {
  CroppingBody,
  FilteringBody,
  PublishingBody,
  StartBody,
} from '@/features/posts/ui/create-post-dialog/dialog-bodies'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { HiddenDialogComponents } from '@/shared/ui/components'
import { DialogContent, DialogRoot, clsx } from '@atpradical/picopico-ui-kit'

import s from './CreatePostDialog.module.scss'

import { ProgressHeader, StartHeader } from './dialog-headers'

type CreateNewPostDialogProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const CreatePostDialog = ({ onOpenChange, ...rest }: CreateNewPostDialogProps) => {
  const dispatch = useAppDispatch()
  const { isOpen, newPost, postPreview, step } = useSelector(selectPosts)

  useEffect(() => {
    if (newPost && typeof newPost !== 'string') {
      const newPreview = URL.createObjectURL(newPost)

      if (postPreview) {
        URL.revokeObjectURL(postPreview)
      }
      dispatch(postsActions.setPostPreview({ preview: newPreview })) // todo: вспомнить нак переделать на Actions из to-do когда есть экспорт actions

      return () => URL.revokeObjectURL(newPreview)
    }
    // 'preview' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost])

  const uploadPostHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(postsActions.setPostUploadingError({ error: '' }))
      const file = e.target.files[0]

      if (!ALLOWED_POST_UPLOAD_TYPES.includes(file.type)) {
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

  const isWide = step === PostCreationStep.Filtering || step === PostCreationStep.Publishing

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen} {...rest}>
      <DialogContent className={clsx(s.content, isWide && s.wide)} overlayClassName={s.overlay}>
        {step === PostCreationStep.Idle && (
          <>
            <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
            <StartHeader />
            <StartBody onUpload={uploadPostHandler} />
          </>
        )}
        {step === PostCreationStep.Cropping && (
          <>
            <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
            <ProgressHeader
              confirmButtonTitle={'Next'}
              onBack={() => navigationButtonHandler(PostCreationStep.Idle)}
              onConfirm={() => navigationButtonHandler(PostCreationStep.Filtering)}
              title={'Cropping'}
            />
            <CroppingBody />
          </>
        )}
        {step === PostCreationStep.Filtering && (
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
        {step === PostCreationStep.Publishing && (
          <>
            <HiddenDialogComponents description={'HIDDEN DESCRIPTION'} title={'HIDDEN TITLE'} />
            <ProgressHeader
              confirmButtonTitle={'Publish'}
              onBack={() => navigationButtonHandler(PostCreationStep.Filtering)}
              onConfirm={() => {}}
              title={'Publishing'}
            />
            <PublishingBody onPublish={() => {}} />
          </>
        )}
      </DialogContent>
    </DialogRoot>
  )
}
