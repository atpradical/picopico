import { FormProvider, useForm } from 'react-hook-form'

import { PostsDescriptionField, postsDescriptionSchemeCreator } from '@/features/posts/model'
import { PostMetadataForm } from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { PublicPostsItem, useUpdatePostMutation } from '@/services/posts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { HiddenDialogComponents } from '@/shared/ui/components'
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import s from './EditPostContent.module.scss'

type EditPostContentProps = {
  onInterrupt: (event: Event) => void
  postData: PublicPostsItem
}

export const EditPostContent = ({ onInterrupt, postData }: EditPostContentProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [updatePost, { isLoading }] = useUpdatePostMutation()

  const methods = useForm<PostsDescriptionField>({
    defaultValues: {
      description: postData.description,
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

  const savePostHandler = handleSubmit(async ({ description }: PostsDescriptionField) => {
    await updatePost({ description, postId: postData.id })
    dispatch(publicationsActions.updatePostData({ description }))
    dispatch(publicationsActions.toggleEditMode({ isEdit: false }))
  })

  const interruptHandler = (event: Event) => {
    reset()
    onInterrupt(event)
  }

  return (
    <DialogContent
      className={s.dialogContent}
      onEscapeKeyDown={interruptHandler}
      onInteractOutside={interruptHandler}
      overlayClassName={s.dialogOverlay}
    >
      <HiddenDialogComponents
        description={t.postDialog.editPostDialog.accessibilityDescription}
        title={t.postDialog.editPostDialog.accessibilityTitle}
      />
      <div className={s.gridContainer}>
        <DialogHeader className={s.dialogHeader}>
          <Typography as={'h1'} variant={'h1'}>
            {t.postDialog.editPostDialog.visibleTitle}
          </Typography>
          <DialogClose asChild>
            <Button
              onClick={interruptHandler}
              title={t.postDialog.editPostDialog.closeIconTitle}
              variant={'icon'}
            >
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        {/*todo: fix carousel - export to component and reuse in DisplayPost comp*/}
        <Carousel className={s.carousel}>
          <CarouselContent>
            {postData.images.map(el => {
              return (
                <CarouselItem className={s.carouselItem} key={el.uploadId}>
                  <div style={{ height: '530px', position: 'relative', width: '100%' }}>
                    <Image
                      alt={'post image'}
                      layout={'responsive'}
                      objectFit={'cover'}
                      src={el.url}
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDotButtons />
        </Carousel>
        <DialogBody className={s.dialogBody}>
          <FormProvider {...methods}>
            <PostMetadataForm
              descriptionLabel={t.postDialog.editPostDialog.descriptionFieldPlaceholder}
            />
          </FormProvider>
          <div className={s.submitButton}>
            <Button
              className={s.button}
              disabled={!isValid}
              isLoading={isLoading}
              onClick={savePostHandler}
            >
              {t.postDialog.editPostDialog.saveButton}
            </Button>
          </div>
        </DialogBody>
      </div>
    </DialogContent>
  )
}
