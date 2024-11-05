import { ChangeEvent, ComponentPropsWithoutRef, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import { POSTS_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { postsDescriptionSchemeCreator, selectCreatePostAllData } from '@/features/posts/model'
import { AuthContext } from '@/shared/contexts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { Avatar, Carousel, DialogBody, TextArea, Typography } from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type PublishBodyProps = {
  previewList: Nullable<string[]>
} & ComponentPropsWithoutRef<typeof DialogBody>

export const PublishBody = ({ previewList, ...rest }: PublishBodyProps) => {
  const {
    t: { createPostDialog, validation },
  } = useTranslation()

  const { meData } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const { description, dialogMeta } = useSelector(selectCreatePostAllData)

  const onDescriptionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = e.currentTarget.value

    dispatch(createPostActions.addPostDescription({ description: descriptionValue }))
  }

  useEffect(() => {
    if (description) {
      const checkResult = postsDescriptionSchemeCreator(
        validation.postDescription.maxLength
      ).safeParse({
        description,
      })

      if (checkResult.error) {
        dispatch(
          createPostActions.setPostErrorMessage({ error: checkResult.error.errors[0].message })
        )
      }
      if (checkResult.success) {
        dispatch(createPostActions.setPostErrorMessage({ error: '' }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description])

  return (
    <DialogBody className={s.filteringBody} {...rest}>
      <div className={s.previewSizes}>
        {/* todo: решить что делать с каруселью */}
        <Carousel slides={previewList ?? []} />
        {/*<Image*/}
        {/*  alt={createPostDialog.altDescription}*/}
        {/*  className={s.image} // todo: определиться с cover или contain*/}
        {/*  fill*/}
        {/*  src={previewList?.[0] ?? ''}*/}
        {/*/>*/}
      </div>
      <div className={s.formContainer}>
        {/*  todo: добавить аватар пользователя */}
        <Avatar showUserName size={'s'} userName={meData?.userName} />
        <TextArea
          className={s.textArea}
          counterLimit={POSTS_DESCRIPTION_MAX_LENGTH}
          counterValue={description.length}
          errorText={dialogMeta.errorMessage}
          label={createPostDialog.publishDialogStep.descriptionFieldLabel}
          onChange={onDescriptionChangeHandler}
          placeholder={createPostDialog.publishDialogStep.descriptionFieldPlaceholder}
          rows={6}
          value={description}
        />
        <Separator.Root className={s.separator} />
        {/*todo: complete posts Location*/}
        <Typography grey style={{ marginTop: '15px', textAlign: 'center' }} variant={'small'}>
          {'Define "Location" feature is coming soon.'}
        </Typography>
      </div>
    </DialogBody>
  )
}
