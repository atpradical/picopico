import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { Nullable } from '@/shared/types'
import { FormErrorData } from '@/shared/utils/index'

type UseSetFormErrorsProps<T extends FieldValues> = {
  errors: Nullable<FormErrorData[]> | string
  fields: (keyof T)[]
  setError: UseFormSetError<T>
}

export const setFormErrors = <T extends FieldValues>({
  errors,
  fields,
  setError,
}: UseSetFormErrorsProps<T>) => {
  if (errors) {
    // if errors are type of FormErrorData[] -> fire certain field
    if (typeof errors !== 'string') {
      errors.forEach(el => {
        setError(el.field as Path<T>, { message: el.message })
      })
    } else {
      // if errors are type of string (from ServerResponseError type) -> fire all fields
      fields.forEach(field => {
        setError(field as Path<T>, { message: ' ' })
      })
    }
  }
}
