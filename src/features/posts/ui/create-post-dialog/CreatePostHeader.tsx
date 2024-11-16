import { ComponentPropsWithoutRef } from 'react'

import { PostsStep } from '@/features/posts/model'
import { LocaleType } from '@/locales/en'
import { useTranslation } from '@/shared/hooks'
import {
  ArrowIosBackIcon,
  Button,
  CloseOutlineIcon,
  DialogClose,
  DialogHeader,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './create-post-dialog-styles.module.scss'

type CreatePostHeaderProps = {
  onBack: (step: PostsStep) => void
  onClose: () => void
  onNext: (step: PostsStep) => void
  onPublish: () => void
  step: PostsStep
} & ComponentPropsWithoutRef<typeof DialogHeader>

export const CreatePostHeader = ({
  onBack,
  onClose,
  onNext,
  onPublish,
  step,
  ...rest
}: CreatePostHeaderProps) => {
  const { t } = useTranslation()

  const title = getDialogTitle(step, t)

  return (
    <DialogHeader className={s.header} {...rest}>
      {step !== PostsStep.Start && (
        <Button
          onClick={() => backStepHandler(step, onBack)}
          title={t.createPostDialog.buttons.backButton}
          variant={'icon'}
        >
          <ArrowIosBackIcon />
        </Button>
      )}
      <Typography as={'h3'} variant={'h3'}>
        {title}
      </Typography>
      {step === PostsStep.Start ? (
        <DialogClose asChild>
          <Button
            className={s.closeButton}
            onClick={onClose}
            title={t.createPostDialog.buttons.closeButton}
            variant={'icon'}
          >
            <CloseOutlineIcon />
          </Button>
        </DialogClose>
      ) : (
        <Button
          className={s.confirmStepButton}
          onClick={() => confirmStepHandler(step, onNext, onPublish)}
          ripple={false}
          type={'submit'}
          variant={'nb-outlined'}
        >
          {step === PostsStep.Publish
            ? t.createPostDialog.buttons.publishButton
            : t.createPostDialog.buttons.nextButton}
        </Button>
      )}
    </DialogHeader>
  )
}

const getDialogTitle = (step: PostsStep, t: LocaleType) => {
  switch (step) {
    case PostsStep.Start:
      return t.createPostDialog.dialogTitles.start
    case PostsStep.Crop:
      return t.createPostDialog.dialogTitles.crop
    case PostsStep.Filters:
      return t.createPostDialog.dialogTitles.filters
    case PostsStep.Publish:
      return t.createPostDialog.dialogTitles.publish
  }
}

const confirmStepHandler = (
  step: PostsStep,
  onNext: (step: PostsStep) => void,
  onPublish: () => void
) => {
  if (step === PostsStep.Crop) {
    onNext(PostsStep.Filters)
  } else if (step === PostsStep.Filters) {
    onNext(PostsStep.Publish)
  } else if (step === PostsStep.Publish) {
    onPublish()
  }
}

const backStepHandler = (step: PostsStep, onBack: (step: PostsStep) => void) => {
  if (step === PostsStep.Crop) {
    onBack(PostsStep.Start)
  } else if (step === PostsStep.Filters) {
    onBack(PostsStep.Crop)
  } else if (step === PostsStep.Publish) {
    onBack(PostsStep.Filters)
  }
}
