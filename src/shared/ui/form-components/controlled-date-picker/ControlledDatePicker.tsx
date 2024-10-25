import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@atpradical/picopico-ui-kit'

export type ControlledDatePickerProps<T extends FieldValues> = Omit<
  DatePickerProps,
  'disabled' | 'name' | 'onBlur' | 'onChange' | 'onSelectSingleDate' | 'ref' | 'selected' | 'value'
> &
  UseControllerProps<T>

export const ControlledDatePicker = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledDatePickerProps<T>) => {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <DatePicker
      defaultValue={defaultValue}
      errorText={error?.message}
      onSelectSingleDate={onChange}
      selected={value}
      {...field}
      {...rest}
    />
  )
}
