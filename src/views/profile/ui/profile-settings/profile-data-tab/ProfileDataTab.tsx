import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks'
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextField,
} from '@/shared/ui/form-components'
import { profileDataSchemeCreator } from '@/views/profile/model/profile-data-scheme-creator'
import { ProfileFormFields } from '@/views/profile/model/types'
import { Avatar, Button, TabsContent } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'
import clsx from 'clsx'

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = {
  data?: any
} & ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, data = {}, ...rest }: ProfileDataTabProps) => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileDataSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(data => {
    // ...
  })

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <div className={s.formWrapper}>
        <div className={s.avatarBlock}>
          <Avatar size={'m'} />
          <Button variant={'outlined'}>Add a Profile Photo</Button>
        </div>
        <form className={s.form} onSubmit={formHandler}>
          <ControlledTextField control={control} isRequired label={'Username'} name={'userName'} />
          <ControlledTextField
            control={control}
            isRequired
            label={'First Name'}
            name={'firstName'}
          />
          <ControlledTextField control={control} isRequired label={'Last Name'} name={'lastName'} />
          <ControlledDatePicker control={control} label={'Date of birth'} name={'dateOfBirth'} />
          <div className={s.selectContainer}>
            <ControlledSelect control={control} label={'Select your country'} name={'country'} />
            <ControlledSelect control={control} label={'Select your city'} name={'city'} />
          </div>
          <ControlledTextArea
            className={s.textArea}
            control={control}
            label={'About Me'}
            name={'aboutMe'}
          />
        </form>
      </div>
      <Separator.Root className={s.separator} />
      <Button className={s.submitButton}>Save Changes</Button>
    </TabsContent>
  )
}
