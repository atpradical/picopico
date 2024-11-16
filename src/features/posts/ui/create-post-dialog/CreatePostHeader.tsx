import { ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { PostsStep, selectPostDialogMeta } from '@/features/posts/model'
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
} & ComponentPropsWithoutRef<typeof DialogHeader>

export const CreatePostHeader = ({
  onBack,
  onClose,
  onNext,
  onPublish,
  ...rest
}: CreatePostHeaderProps) => {
  const { t } = useTranslation()

  const { currentStep } = useSelector(selectPostDialogMeta)

  const title = getDialogTitle(currentStep, t)

  return (
    <DialogHeader className={s.header} {...rest}>
      {currentStep !== PostsStep.Start && (
        <Button
          onClick={() => backStepHandler(currentStep, onBack)}
          title={t.createPostDialog.buttons.backButton}
          variant={'icon'}
        >
          <ArrowIosBackIcon />
        </Button>
      )}
      <Typography as={'h3'} variant={'h3'}>
        {title}
      </Typography>
      {currentStep === PostsStep.Start ? (
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
          onClick={() => confirmStepHandler(currentStep, onNext, onPublish)}
          ripple={false}
          type={'submit'}
          variant={'nb-outlined'}
        >
          {currentStep === PostsStep.Publish
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
