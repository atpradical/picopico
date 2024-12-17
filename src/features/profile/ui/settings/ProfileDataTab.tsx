import { ComponentPropsWithoutRef, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MAX_ABOUT_ME_LENGTH, MAX_CITY_POPULATION } from '@/features/profile/config'
import { profileDataSchemeCreator } from '@/features/profile/model'
import { ProfileFormFields } from '@/features/profile/model/profile.types'
import { ProfileAvatarManager } from '@/features/profile/ui'
import { useGetCountriesQuery, useLazyGetCitiesQuery } from '@/services/countries'
import { useUpdateUserProfileMutation } from '@/services/profile'
import { MyProfileContext } from '@/shared/contexts'
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

type ProfileDataTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const ProfileDataTab = ({ className, ...rest }: ProfileDataTabProps) => {
  const {
    locale,
    t: {
      profileSettings: { profileDataTab },
      validation,
    },
  } = useTranslation()
  const { myProfileData } = useContext(MyProfileContext)
  const [selectedCountry, setSelectedCountry] = useState(myProfileData.country ?? '')
  const [updateProfile] = useUpdateUserProfileMutation()

  // получаем временные данные для формы из localStorage если они есть
  const tempFormDataString =
    typeof window !== 'undefined' ? localStorage.getItem('tempFormData') : null

  const tempFormData = tempFormDataString ? JSON.parse(tempFormDataString) : null

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

  const {
    control,
    formState: { isDirty, isValid },
    getValues,
    handleSubmit,
    setError,
    setValue,
  } = useForm<ProfileFormFields>({
    defaultValues: {
      aboutMe: tempFormData?.aboutMe ?? myProfileData.aboutMe ?? '',
      city: tempFormData?.city ?? myProfileData.city ?? '',
      country: tempFormData?.country ?? myProfileData.country ?? '',
      dateOfBirth: myProfileData.dateOfBirth
        ? new Date(tempFormData?.dateOfBirth ?? myProfileData.dateOfBirth)
        : undefined,
      firstName: tempFormData?.firstName ?? myProfileData.firstName ?? '',
      lastName: tempFormData?.lastName ?? myProfileData.lastName ?? '',
      userName: tempFormData?.userName ?? myProfileData.userName ?? '',
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
      localStorage.removeItem('tempFormData')
      localStorage.removeItem('isFormChanged')
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

  useEffect(() => {
    if (tempFormData?.country && selectedCountry !== tempFormData?.country) {
      setSelectedCountry(tempFormData.country)
    }
  }, [tempFormData?.country, selectedCountry])

  // save temp form data to localStorage in case if user started form filling
  useEffect(() => {
    if (isDirty) {
      return () => {
        const currentFormData = getValues()

        localStorage.setItem('tempFormData', JSON.stringify(currentFormData))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, selectedCountry])

  // disable submit button if form is not valid or not dirty or if tempFormData exists
  let isSubmitDisabled = !isValid || !isDirty

  if (tempFormData) {
    isSubmitDisabled = false
  }

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
          <div className={s.selectContainer}>
            <ControlledSelect
              control={control}
              defaultValue={tempFormData?.country ?? myProfileData.country ?? ''}
              label={profileDataTab.labels.country}
              name={'country'}
              onValueChange={countrySelectValueChangeHandler}
              options={countriesDataOptions}
              placeholder={profileDataTab.placeholders.country}
              showScroll
            />
            <ControlledSelect
              control={control}
              defaultValue={tempFormData?.city ?? myProfileData.city ?? ''}
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
        disabled={isSubmitDisabled}
        form={'profile-form'}
        type={'submit'}
      >
        {profileDataTab.formSubmitButton}
      </Button>
    </TabsContent>
  )
}
