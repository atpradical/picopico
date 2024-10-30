import { useForm } from 'react-hook-form'

import { ControlledTextArea } from '@/shared/ui/form-components'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'

import s from './post-description-form.module.scss'

type Props = {}
export const PostDescriptionForm = (props: Props) => {
  const {
    control,
    // formState: { dirtyFields, isValid },
    handleSubmit,
    // setError,
  } = useForm<any>({
    defaultValues: {
      postDescription: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    // resolver: zodResolver(profileDataSchemeCreator(validation)),
  })

  const formHandler = handleSubmit(async data => {
    console.log(data)
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
