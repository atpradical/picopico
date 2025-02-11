import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

export type ControlledDatePickerProps<T extends FieldValues> = Omit<
  DatePickerProps,
  'disabled' | 'name' | 'onBlur' | 'onChange' | 'onSelect' | 'ref' | 'selected' | 'value'
> &
  UseControllerProps<T>

export const ControlledDatePicker = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorText,
  label,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledDatePickerProps<T>) => {
  const { locale } = useRouter()

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      {...rest}
      render={({ field: { ref, ...restField }, fieldState: { error } }) => {
        return (
          <DatePicker
            errorText={error?.message}
            label={label}
            localeString={locale}
            onSelect={date => {
              if (date) {
                restField.onChange(date) // Передаём выбранную дату в React Hook Form
              } else {
                restField.onChange(null) // Очищаем значение даты
              }
            }}
            selected={restField.value}
            {...restField}
          />
        )
      }}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  )
}
