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
  CarouselDotButton,
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
      <DialogBody className={s.dialogBody}>
        {/*todo: fix carousel - export to component and reuse in DisplayPost comp*/}
        <Carousel className={s.carousel}>
          <CarouselContent>
            {postData.images.map(el => {
              return (
                <CarouselItem className={s.carouselItem} key={el.uploadId}>
                  <Image
                    alt={'post image'}
                    height={530}
                    src={el.url}
                    style={{ objectFit: 'cover' }}
                    width={490}
                  />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDotButton />
        </Carousel>
        <div className={s.formContainer}>
          <FormProvider {...methods}>
            <PostMetadataForm
              descriptionLabel={t.postDialog.editPostDialog.descriptionFieldPlaceholder}
            />
          </FormProvider>
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
    </DialogContent>
  )
}
