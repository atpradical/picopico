import { ChangeEvent, useEffect, useState } from 'react'

import { POSTS_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { postsDescriptionSchemeCreator } from '@/features/posts/model'
import { GetPostsItems } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { HiddenDialogComponents } from '@/shared/ui/components'
import {
  Avatar,
  Button,
  Carousel,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  TextArea,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './EditPostContent.module.scss'

type EditPostContentProps = {
  onInterrupt: (event: Event) => void
  onSave: (description: string) => void
  postData: GetPostsItems
}

export const EditPostContent = ({ onInterrupt, onSave, postData }: EditPostContentProps) => {
  const { t } = useTranslation()

  const [description, setDescription] = useState(postData.description)
  const [descriptionError, setDescriptionError] = useState('')

  useEffect(() => {
    if (description) {
      const checkResult = postsDescriptionSchemeCreator(
        t.validation.postDescription.maxLength
      ).safeParse({
        description,
      })

      if (checkResult.error) {
        setDescriptionError(checkResult.error.errors[0].message)
      }
      if (checkResult.success) {
        setDescriptionError('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description])

  const newDescriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value)
  }

  const savePostHandler = () => {
    onSave(description)
  }

  return (
    <DialogContent
      className={s.dialogContent}
      onEscapeKeyDown={onInterrupt}
      onInteractOutside={onInterrupt}
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
            onClick={onInterrupt}
            title={t.postDialog.editPostDialog.closeIconTitle}
            variant={'icon'}
          >
            <CloseOutlineIcon />
          </Button>
        </DialogClose>
      </DialogHeader>
      <DialogBody className={s.dialogBody}>
        <Carousel className={s.carousel} slides={postData.images.map(el => el.url)} />
        <div className={s.formContainer}>
          <div className={s.descriptionContainer}>
            <Avatar
              showUserName
              size={'s'}
              src={postData.avatarOwner}
              userName={postData.userName}
            />
            <TextArea
              className={s.textArea}
              counterLimit={POSTS_DESCRIPTION_MAX_LENGTH}
              counterValue={description.length}
              errorText={descriptionError}
              label={t.postDialog.editPostDialog.descriptionFieldLabel}
              onChange={newDescriptionHandler}
              placeholder={t.postDialog.editPostDialog.descriptionFieldPlaceholder}
              rows={6}
              value={description}
            />
          </div>
          <Button className={s.button} onClick={savePostHandler}>
            {t.postDialog.editPostDialog.saveButton}
          </Button>
        </div>
      </DialogBody>
    </DialogContent>
  )
}
