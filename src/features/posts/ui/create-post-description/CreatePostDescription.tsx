import { ChangeEvent, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import { POSTS_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { postsDescriptionSchemeCreator, selectCreatePostAllData } from '@/features/posts/model'
import { AuthContext, MyProfileContext } from '@/shared/contexts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Avatar, TextArea, Typography } from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'

import s from './CreatePostDescription.module.scss'

export const CreatePostDescription = () => {
  const {
    t: { createPostDialog, validation },
  } = useTranslation()

  const { meData } = useContext(AuthContext)
  const { myProfileData } = useContext(MyProfileContext)
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
    <div className={s.formContainer}>
      <Avatar
        showUserName
        size={'s'}
        src={myProfileData?.avatars[1]?.url}
        userName={meData?.userName}
      />
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
  )
}
