import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { useGetCountriesQuery } from '@/shared/api/countries'
import { useUpdateUserProfileMutation } from '@/shared/api/profile'
import { ResponseGetUserProfile } from '@/shared/api/profile/profile.types'
import { useTranslation } from '@/shared/hooks'
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextField,
} from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { profileDataSchemeCreator } from '@/views/profile/model/profile-data-scheme-creator'
import { ProfileFormFields } from '@/views/profile/model/types'
import { Avatar, Button, TabsContent } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'
import clsx from 'clsx'
import { enUS, ru } from 'date-fns/locale'

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = {
  defaultData?: ResponseGetUserProfile
} & ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, defaultData, ...rest }: ProfileDataTabProps) => {
  const { locale, t } = useTranslation()
  const [updateProfile] = useUpdateUserProfileMutation()

  const { data: countriesData } = useGetCountriesQuery({
    locale: locale ?? 'en',
  })

  console.log(countriesData)

  const { control, handleSubmit, setError } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: defaultData?.aboutMe ?? '',
      city: defaultData?.city ?? '',
      country: defaultData?.country ?? '',
      dateOfBirth: new Date(defaultData?.dateOfBirth ?? ''),
      firstName: defaultData?.firstName ?? '',
      lastName: defaultData?.lastName ?? '',
      userName: defaultData?.userName ?? '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileDataSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async data => {
    try {
      await updateProfile({
        ...data,
        dateOfBirth: new Date(data.dateOfBirth).toLocaleDateString(),
      }).unwrap()
    } catch (e) {
      const errors = getErrorMessageData(e)

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof ProfileFormFields)[])],
        setError,
      })
    }
  })

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <div className={s.formWrapper}>
        <div className={s.avatarBlock}>
          <Avatar size={'m'} src={''} />
          <Button variant={'outlined'}>Add a Profile Photo</Button>
        </div>
        <form className={s.form} id={'profile-form'} onSubmit={formHandler}>
          <ControlledTextField control={control} isRequired label={'Username'} name={'userName'} />
          <ControlledTextField
            control={control}
            defaultValue={defaultData?.firstName ?? ''}
            isRequired
            label={'First Name'}
            name={'firstName'}
          />
          <ControlledTextField control={control} isRequired label={'Last Name'} name={'lastName'} />
          <ControlledDatePicker
            control={control}
            defaultValue={defaultData?.dateOfBirth ? new Date(defaultData?.dateOfBirth) : undefined}
            label={'Date of birth'}
            locale={locale === 'ru' ? ru : enUS}
            name={'dateOfBirth'}
          />
          <div className={s.selectContainer}>
            <ControlledSelect
              control={control}
              defaultValue={defaultData?.country ?? ''}
              label={'Select your country'}
              name={'country'}
              //todo: fix Type ResponseGetCountries | undefined is not assignable to type OptionsValue[] | undefined
              options={countriesData}
            />
            <ControlledSelect
              control={control}
              defaultValue={defaultData?.city ?? ''}
              label={'Select your city'}
              name={'city'}
            />
          </div>
          <ControlledTextArea
            className={s.textArea}
            control={control}
            defaultValue={defaultData?.aboutMe ?? ''}
            label={'About Me'}
            name={'aboutMe'}
          />
        </form>
      </div>
      <Separator.Root className={s.separator} />
      <Button className={s.submitButton} form={'profile-form'} type={'submit'}>
        Save Changes
      </Button>
    </TabsContent>
  )
}
