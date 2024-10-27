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
import { UploadAvatar } from '@/views/profile/ui/upload-avatar'
import { Button, OptionsValue, TabsContent, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'
import clsx from 'clsx'
import { enUS, ru } from 'date-fns/locale'

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = {
  data?: ResponseGetUserProfile
} & ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, data, ...rest }: ProfileDataTabProps) => {
  const {
    locale,
    t: {
      profileSettings: { profileDataTab },
      validation,
    },
  } = useTranslation()
  const [selectedCountry, setSelectedCountry] = useState(data?.country ?? '')
  const [updateProfile] = useUpdateUserProfileMutation()

  const countrySelectValueChangeHandler = (value: string) => {
    setSelectedCountry(value)
  }

  const { data: countriesData } = useGetCountriesQuery({
    locale: locale ?? 'en',
  })

  const [getCities, { data: citiesData }] = useLazyGetCitiesQuery()

  let countriesDataOptions: OptionsValue[] = []
  let citiesDataOptions: OptionsValue[] = []

  if (countriesData) {
    countriesDataOptions = countriesData.geonames.map(country => ({
      option: country.countryName,
      value: country.countryCode,
    }))
  }

  if (citiesData) {
    citiesDataOptions = citiesData.geonames.map(city => ({
      option: city.name,
      value: city.geonameId.toString(), // City ID in geonames
    }))
  }

  useEffect(() => {
    if (selectedCountry) {
      getCities({
        countryName: selectedCountry,
        locale: locale ?? 'en',
        minPopulation: MAX_CITY_POPULATION,
      })
    }
  }, [selectedCountry, getCities, locale])

  const {
    control,
    formState: { dirtyFields, isValid },
    handleSubmit,
    setError,
  } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: data?.aboutMe ?? '',
      city: data?.city ?? '',
      country: data?.country ?? '',
      dateOfBirth: data?.dateOfBirth ? new Date(data?.dateOfBirth) : undefined,
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      userName: data?.userName ?? '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileDataSchemeCreator(validation)),
  })

  const formHandler = handleSubmit(async data => {
    try {
      await updateProfile({
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString() : '',
      }).unwrap()

      toaster({ text: profileDataTab.successSettingsChangeMessage })
    } catch (e) {
      const errors = getErrorMessageData(e)

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof ProfileFormFields)[])],
        setError,
      })
    }
  })

  const isSubmitDisabled = !isValid || !Object.keys(dirtyFields).length

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <div className={s.formWrapper}>
        <UploadAvatar avatarImage={data?.avatars.length ? data?.avatars[0].url : ''} />
        <form className={s.form} id={'profile-form'} onSubmit={formHandler}>
          <ControlledTextField
            control={control}
            isRequired
            label={profileDataTab.labels.userName}
            name={'userName'}
          />
          <ControlledTextField
            control={control}
            defaultValue={data?.firstName ?? ''}
            isRequired
            label={profileDataTab.labels.firstName}
            name={'firstName'}
            placeholder={profileDataTab.placeholders.firstName}
          />
          <ControlledTextField
            control={control}
            isRequired
            label={profileDataTab.labels.lastName}
            name={'lastName'}
            placeholder={profileDataTab.placeholders.lastName}
          />
          <ControlledDatePicker
            control={control}
            defaultValue={data?.dateOfBirth ? new Date(data?.dateOfBirth) : undefined}
            isRequired
            label={profileDataTab.labels.dateOfBirth}
            locale={locale === 'ru' ? ru : enUS}
            name={'dateOfBirth'}
          />
          <div className={s.selectContainer}>
            <ControlledSelect
              control={control}
              defaultValue={data?.country ?? ''}
              label={profileDataTab.labels.country}
              name={'country'}
              onValueChange={countrySelectValueChangeHandler}
              options={countriesDataOptions}
              placeholder={profileDataTab.placeholders.country}
              showScroll
            />
            <ControlledSelect
              control={control}
              defaultValue={data?.city ?? ''}
              label={profileDataTab.labels.city}
              name={'city'}
              options={citiesDataOptions}
              placeholder={profileDataTab.placeholders.city}
              showScroll
            />
          </div>
          <ControlledTextArea
            className={s.textArea}
            control={control}
            defaultValue={data?.aboutMe ?? ''}
            label={profileDataTab.labels.aboutMe}
            name={'aboutMe'}
            placeholder={profileDataTab.placeholders.aboutMe}
          />
        </form>
      </div>
      <Separator.Root className={s.separator} />
      <Button
        className={s.submitButton}
        disabled={isSubmitDisabled}
        form={'profile-form'}
        type={'submit'}
      >
        {profileDataTab.formSubmitButton}
      </Button>
    </TabsContent>
  )
}
