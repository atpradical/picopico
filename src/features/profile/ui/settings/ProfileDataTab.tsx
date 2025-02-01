import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MAX_ABOUT_ME_LENGTH, MAX_CITY_POPULATION } from '@/features/profile/config'
import { profileDataSchemeCreator } from '@/features/profile/model'
import { ProfileFormFields } from '@/features/profile/model/profile.types'
import { ProfileAvatarManager } from '@/features/profile/ui'
import { useGetCountriesQuery, useLazyGetCitiesQuery } from '@/services/countries'
import { ResponseGetMyProfile, useUpdateMyProfileMutation } from '@/services/profile'
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

import s from './ProfileDataTab.module.scss'

type ProfileDataTabProps = {
  myProfileData: ResponseGetMyProfile
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

  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation()

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
      label: country.countryName,
      value: country.countryCode,
    }))
  }

  if (citiesData) {
    citiesDataOptions = citiesData.geonames.map(city => ({
      label: city.name,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, locale])

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    setError,
    setValue,
  } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: myProfileData.aboutMe ?? '',
      city: myProfileData.city ?? '',
      country: myProfileData.country ?? '',
      dateOfBirth: myProfileData?.dateOfBirth ? new Date(myProfileData.dateOfBirth) : undefined,
      firstName: myProfileData.firstName ?? '',
      lastName: myProfileData.lastName ?? '',
      userName: myProfileData.userName ?? '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileDataSchemeCreator(validation)),
  })

  const formHandler = handleSubmit(async data => {
    try {
      await updateProfile({
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toString() : undefined,
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

  const datePickerDefault = myProfileData.dateOfBirth
    ? new Date(myProfileData.dateOfBirth)
    : undefined

  const isDisabledConfirmButton = !isValid || !isDirty

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
              defaultValue={datePickerDefault}
              isRequired
              label={profileDataTab.labels.dateOfBirth}
              name={'dateOfBirth'}
            />
          }
          <div className={s.selectContainer}>
            <ControlledSelect
              control={control}
              defaultValue={myProfileData.country ?? undefined}
              label={profileDataTab.labels.country}
              name={'country'}
              onValueChange={countrySelectValueChangeHandler}
              options={countriesDataOptions}
              placeholder={profileDataTab.placeholders.country}
              showScroll
            />
            <ControlledSelect
              control={control}
              defaultValue={myProfileData.city ?? undefined}
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
      <Button
        className={s.submitButton}
        disabled={isDisabledConfirmButton}
        form={'profile-form'}
        isLoading={isLoading}
        type={'submit'}
      >
        {profileDataTab.formSubmitButton}
      </Button>
    </TabsContent>
  )
}
