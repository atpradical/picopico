import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectProps } from '@atpradical/picopico-ui-kit'

export type ControlledSelectProps<T extends FieldValues> = Omit<
  SelectProps,
  'defaultValue' | 'disabled' | 'name' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const ControlledSelect = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  onValueChange,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  const onValueChangeHandler = (value: string) => {
    onValueChange?.(value)
    onChange(value)
  }

  return <Select {...selectProps} onValueChange={onValueChangeHandler} value={value} {...field} />
}
