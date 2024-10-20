import { FormErrorData } from '@/shared/utils/get-error-message-data'
import { toaster } from '@atpradical/picopico-ui-kit'

export const showErrorToast = (error: unknown) => {
  if (error instanceof Array) {
    const errorData = error as FormErrorData[]

    errorData.forEach(el => {
      toaster({ text: el.message, variant: 'error' })
    })
    //todo: check if such error case is relevant?
  } else if (typeof error === 'string') {
    toaster({ text: error, variant: 'error' })
  }
}
