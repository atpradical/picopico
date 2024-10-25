import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGetCountriesQuery, useLazyGetCitiesQuery } from '@/shared/api/countries'
import { useUpdateUserProfileMutation } from '@/shared/api/profile'
import { ResponseGetUserProfile } from '@/shared/api/profile/profile.types'
import { MAX_CITY_POPULATION } from '@/shared/constants'
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
import { Avatar, Button, TabsContent, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'
import clsx from 'clsx'
import { enUS, ru } from 'date-fns/locale'

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = {
  data?: ResponseGetUserProfile
} & ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, data, ...rest }: ProfileDataTabProps) => {
  const { locale, t } = useTranslation()
  const [selectedCountry, setSelectedCountry] = useState(data?.country ?? '')
  const [updateProfile] = useUpdateUserProfileMutation()

  const countrySelectValueChangeHandler = (value: string) => {
    setSelectedCountry(value)
  }

  const { data: countriesData } = useGetCountriesQuery({
    locale: locale ?? 'en',
  })

  const [getCities, { data: citiesData }] = useLazyGetCitiesQuery()

  useEffect(() => {
    if (selectedCountry) {
      getCities({
        countryName: selectedCountry,
        locale: locale ?? 'en',
        minPopulation: MAX_CITY_POPULATION,
      })
    }
  }, [selectedCountry, getCities, locale])

  const { control, handleSubmit, setError } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: data?.aboutMe ?? '',
      city: data?.city ?? '',
      country: data?.country ?? '',
      dateOfBirth: new Date(data?.dateOfBirth ?? ''),
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      userName: data?.userName ?? '',
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

      toaster({ text: 'Your settings are saved!' })
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
            defaultValue={data?.firstName ?? ''}
            isRequired
            label={'First Name'}
            name={'firstName'}
            placeholder={'add first name'}
          />
          <ControlledTextField
            control={control}
            isRequired
            label={'Last Name'}
            name={'lastName'}
            placeholder={'add second name'}
          />
          <ControlledDatePicker
            control={control}
            defaultValue={data?.dateOfBirth ? new Date(data?.dateOfBirth) : undefined}
            label={'Date of birth'}
            locale={locale === 'ru' ? ru : enUS}
            name={'dateOfBirth'}
          />
          <div className={s.selectContainer}>
            <ControlledSelect
              control={control}
              defaultValue={data?.country ?? ''}
              label={'Select your country'}
              name={'country'}
              onValueChange={countrySelectValueChangeHandler}
              //@ts-ignore todo: fix Type ResponseGetСountries | undefined is not assignable to type OptionsValue[] | undefined
              options={countriesData}
              placeholder={'add country'}
              showScroll
            />
            <ControlledSelect
              control={control}
              defaultValue={data?.city ?? ''}
              label={'Select your city'}
              name={'city'}
              //@ts-ignore todo: fix Type ResponseGetCities | undefined is not assignable to type OptionsValue[] | undefined
              options={citiesData}
              placeholder={'add city'}
              showScroll
            />
          </div>
          <ControlledTextArea
            className={s.textArea}
            control={control}
            defaultValue={data?.aboutMe ?? ''}
            label={'About Me'}
            name={'aboutMe'}
            placeholder={'tell us about yourself '}
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
