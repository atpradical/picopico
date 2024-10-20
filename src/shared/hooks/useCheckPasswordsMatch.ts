import { useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'

type UsePasswordValidationProps = {
  confirmPassword: string
  password: string
  setError: UseFormSetError<any>
  validationMessage: string
}
/**
 * Custom hook to validate if the password and confirm password fields match.
 *
 * @param confirmPassword confirmPassword value.
 * @param password password value.
 * @param setError The function to setErrors from useForm.
 * @param validationMessage - The message to display when passwords do not match.
 *
 * @returns void
 */
export const useCheckPasswordsMatch = ({
  confirmPassword,
  password,
  setError,
  validationMessage,
}: UsePasswordValidationProps) => {
  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError('confirmPassword', { message: validationMessage })
    } else {
      setError('confirmPassword', { message: '' })
    }
  }, [password, confirmPassword, setError, validationMessage])
}
