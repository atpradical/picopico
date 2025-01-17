import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { POSTS_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { AuthContext, MyProfileContext } from '@/shared/contexts'
import { useTranslation } from '@/shared/hooks'
import { ControlledTextArea } from '@/shared/ui/form-components'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'

import s from './PostMetadataForm.module.scss'

type PostMetadataFormProps = {
  descriptionLabel?: string
}

export const PostMetadataForm = ({ descriptionLabel }: PostMetadataFormProps) => {
  const { t } = useTranslation()
  const { meData } = useContext(AuthContext)
  const { myProfileData } = useContext(MyProfileContext)
  const { control } = useFormContext()

  return (
    <>
      <form className={s.formContainer}>
        <Avatar
          showUserName
          size={'s'}
          src={myProfileData?.avatars[1]?.url}
          userName={meData?.userName}
        />
        <ControlledTextArea
          className={s.textArea}
          control={control}
          counterLimit={POSTS_DESCRIPTION_MAX_LENGTH}
          label={descriptionLabel || t.createPostDialog.publishDialogStep.descriptionFieldLabel}
          name={'description'}
          placeholder={t.createPostDialog.publishDialogStep.descriptionFieldPlaceholder}
        />
        <Separator.Root className={s.separator} />
        {/*todo: complete posts Location*/}
        <Typography grey style={{ marginTop: '15px', textAlign: 'center' }} variant={'small'}>
          {'Define "Location" feature is coming soon.'}
        </Typography>
      </form>
    </>
  )
}
