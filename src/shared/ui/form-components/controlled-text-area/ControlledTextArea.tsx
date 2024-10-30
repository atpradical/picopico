import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { POST_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { TextArea, TextAreaProps, Typography } from '@atpradical/picopico-ui-kit'

import s from './ControlledTextArea.module.scss'

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
    field,
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
    <>
      <TextArea errorText={errorText ?? error?.message} {...props} {...field} />
      {showCounter && (
        <Typography className={s.charactersCount} variant={'small'}>
          {`${field.value?.length ?? '0'}/${POST_DESCRIPTION_MAX_LENGTH}`}
        </Typography>
      )}
    </>
  )
}
