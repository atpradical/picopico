import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@atpradical/picopico-ui-kit'

export type ControlledCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  | 'checked'
  | 'defaultValue'
  | 'disabled'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onCheckedChange'
  | 'ref'
  | 'value'
> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
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
    <Checkbox
      {...checkboxProps}
      checked={value}
      error={error?.message}
      onCheckedChange={onChange}
      {...field}
    />
  )
}
