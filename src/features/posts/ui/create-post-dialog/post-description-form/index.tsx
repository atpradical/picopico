import { useForm } from 'react-hook-form'

import { PostDescriptionFormFields, postDescriptionSchemeCreator } from '@/features/posts/model'
import { useTranslation } from '@/shared/hooks'
import { ControlledTextArea } from '@/shared/ui/form-components'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'

import s from './post-description-form.module.scss'

type Props = {
  // errors:
}
export const PostDescriptionForm = (props: Props) => {
  const {
    t: { validation },
  } = useTranslation()
  const { control, handleSubmit } = useForm<PostDescriptionFormFields>({
    defaultValues: {
      description: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(postDescriptionSchemeCreator(validation)),
  })

  const formHandler = handleSubmit(async data => {
    console.log(data)
    // try {
    //     await updateProfile({
    //         ...data,
    //         dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString() : '',
    //     }).unwrap()
    //
    //     toaster({ text: profileDataTab.successSettingsChangeMessage })
    // } catch (e) {
    //     const errors = getErrorMessageData(e)
    //
    //     setFormErrors({
    //         errors,
    //         fields: [...(Object.keys(data) as (keyof ProfileFormFields)[])],
    //         setError,
    //     })
    // }
  })

  return (
    <div className={s.formContainer}>
      <Avatar showUserName size={'s'} userName={'User-Name'} />
      <form onSubmit={formHandler}>
        <ControlledTextArea
          className={s.textArea}
          control={control}
          label={'Add publication descriptions'} // todo: добавить переводы
          name={'description'}
          placeholder={'Add post description'} // todo: добавить переводы
          rows={6}
          showCounter
        />
      </form>
      <Separator.Root className={s.separator} />
      <Typography grey style={{ marginTop: '15px', textAlign: 'center' }} variant={'small'}>
        {'Define "Location" feature is coming soon.'}
      </Typography>
    </div>
  )
}
