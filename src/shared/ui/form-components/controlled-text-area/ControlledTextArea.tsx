import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '@atpradical/picopico-ui-kit'

export type ControlledTextAreaProps<T extends FieldValues> = {
  showCounter?: boolean
} & Omit<TextAreaProps, 'defaultValue' | 'name' | 'onBlur' | 'onChange' | 'value'> &
  UseControllerProps<T>

export const ControlledTextArea = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorText,
  name,
  rules,
  shouldUnregister,
  showCounter = false,
  ...props
}: ControlledTextAreaProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value, ...field },
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
    <TextArea
      {...props}
      counterValue={value?.length}
      errorText={errorText ?? error?.message}
      onChange={onChange}
      ref={ref}
      value={value ?? ''}
      {...field}
    />
  )
}
