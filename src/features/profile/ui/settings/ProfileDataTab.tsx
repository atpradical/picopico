'use client'

import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MAX_ABOUT_ME_LENGTH, MAX_CITY_POPULATION } from '@/features/profile/config'
import { profileDataSchemeCreator } from '@/features/profile/model'
import { ProfileFormFields } from '@/features/profile/model/profile.types'
import { ProfileAvatarManager } from '@/features/profile/ui'
import { useGetCountriesQuery, useLazyGetCitiesQuery } from '@/services/countries'
import { ResponseGetUserProfile, useUpdateUserProfileMutation } from '@/services/profile'
import { useTranslation } from '@/shared/hooks'
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextField,
} from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { Button, OptionsValue, TabsContent, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'
import clsx from 'clsx'
import { enUS, ru } from 'date-fns/locale'

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = {
  myProfileData: ResponseGetUserProfile
} & ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, myProfileData, ...rest }: ProfileDataTabProps) => {
  const {
    locale,
    t: {
      profileSettings: { profileDataTab },
      validation,
    },
  } = useTranslation()

  const [selectedCountry, setSelectedCountry] = useState(myProfileData.country)
  const [tempFormData, setTempFormData] = useState<any>()

  const [updateProfile] = useUpdateUserProfileMutation()

  const countrySelectValueChangeHandler = (value: string) => {
    setSelectedCountry(value)
    setValue('city', '')
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

  useEffect(() => {
    const tempFormDataString = localStorage.getItem('tempFormData')

    if (tempFormDataString) {
      setTempFormData(JSON.parse(tempFormDataString))
    }
  }, [])

  const {
    control,
    formState: { isDirty },
    getValues,
    handleSubmit,
    setError,
    setValue,
  } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: myProfileData.aboutMe ?? '',
      city: myProfileData.city ?? '',
      country: myProfileData.country ?? '',
      dateOfBirth: myProfileData?.dateOfBirth ? new Date(myProfileData.dateOfBirth) : null,
      firstName: myProfileData.firstName ?? '',
      lastName: myProfileData.lastName ?? '',
      userName: myProfileData.userName ?? '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileDataSchemeCreator(validation)),
  })

  useEffect(() => {
    if (tempFormData) {
      if (tempFormData.aboutMe) {
        setValue('aboutMe', tempFormData.aboutMe)
      }
      if (tempFormData.city) {
        setValue('city', tempFormData.city)
      }
      if (tempFormData.country) {
        setSelectedCountry(tempFormData.country)
        setValue('country', tempFormData.country)
      }

      if (tempFormData.dateOfBirth) {
        setValue('dateOfBirth', new Date(tempFormData.dateOfBirth))
      }

      if (tempFormData.firstName) {
        setValue('firstName', tempFormData.firstName)
      }
      if (tempFormData.lastName) {
        setValue('lastName', tempFormData.lastName)
      }

      if (tempFormData.userName) {
        setValue('userName', tempFormData.userName)
      }
    }
  }, [tempFormData, setValue])

  useEffect(() => {
    if (isDirty) {
      return () => {
        localStorage.setItem('tempFormData', JSON.stringify(getValues()))
      }
    }
  }, [isDirty, getValues])

  const formHandler = handleSubmit(async data => {
    try {
      await updateProfile({
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString() : '',
      }).unwrap()
      localStorage.removeItem('tempFormData')
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

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <div className={s.formWrapper}>
        <ProfileAvatarManager />
        <form className={s.form} id={'profile-form'} onSubmit={formHandler}>
          <ControlledTextField
            control={control}
            isRequired
            label={profileDataTab.labels.userName}
            name={'userName'}
          />
          <ControlledTextField
            control={control}
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
          {
            <ControlledDatePicker
              control={control}
              defaultValue={
                myProfileData.dateOfBirth
                  ? new Date(tempFormData?.dateOfBirth ?? myProfileData.dateOfBirth)
                  : undefined
              }
              isRequired
              label={profileDataTab.labels.dateOfBirth}
              locale={locale === 'ru' ? ru : enUS}
              name={'dateOfBirth'}
            />
          }
          <div className={s.selectContainer}>
            <ControlledSelect
              control={control}
              defaultValue={tempFormData?.country ?? myProfileData.country}
              label={profileDataTab.labels.country}
              name={'country'}
              onValueChange={countrySelectValueChangeHandler}
              options={countriesDataOptions}
              placeholder={profileDataTab.placeholders.country}
              showScroll
            />
            <ControlledSelect
              control={control}
              defaultValue={tempFormData?.city ?? myProfileData.city}
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
            counterLimit={MAX_ABOUT_ME_LENGTH}
            label={profileDataTab.labels.aboutMe}
            name={'aboutMe'}
            placeholder={profileDataTab.placeholders.aboutMe}
          />
        </form>
      </div>
      <Separator.Root className={s.separator} />
      <Button className={s.submitButton} form={'profile-form'} type={'submit'}>
        {profileDataTab.formSubmitButton}
      </Button>
    </TabsContent>
  )
}
