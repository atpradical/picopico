import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@atpradical/picopico-ui-kit'

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
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledDatePickerProps<T>) => {
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
            onSelect={restField.onChange} // Передаём выбранную дату в React Hook Form
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
