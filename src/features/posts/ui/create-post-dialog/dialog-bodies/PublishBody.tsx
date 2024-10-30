import { ChangeEvent, ComponentPropsWithoutRef, useContext } from 'react'
import { useSelector } from 'react-redux'

import { postsActions } from '@/features/posts/api'
import { POST_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { selectPostPreview } from '@/features/posts/model'
import { AuthContext } from '@/shared/contexts'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Avatar, DialogBody, TextArea, Typography } from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type PublishBodyProps = ComponentPropsWithoutRef<typeof DialogBody>

export const PublishBody = (props: PublishBodyProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()

  const { meData } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const postPreview = useSelector(selectPostPreview)

  const onDescriptionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.currentTarget.value

    dispatch(postsActions.addPostDescription({ description }))
  }

  return (
    <DialogBody className={s.filteringBody} {...props}>
      <div className={s.previewSizes}>
        <Image
          alt={createPostDialog.altDescription}
          className={s.image} // todo: определиться с cover или contain
          fill
          src={postPreview ?? ''}
        />
      </div>
      <div className={s.formContainer} {...props}>
        {/*  todo: добавить аватар пользователя */}
        <Avatar showUserName size={'s'} userName={meData?.userName} />
        {/*  todo: добавить проверку на кол-во символов */}
        <TextArea
          className={s.textArea}
          counterLimit={POST_DESCRIPTION_MAX_LENGTH}
          label={createPostDialog.publishDialogStep.descriptionFieldLabel}
          onChange={onDescriptionChangeHandler}
          placeholder={createPostDialog.publishDialogStep.descriptionFieldPlaceholder}
          rows={6}
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
