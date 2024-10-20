import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export type FormErrorData = { field: string; message: string }

export type ServerErrorData = {
  error: string
  messages: FormErrorData[] | string
  statusCode: number
}

export type CustomerError = {
  data: ServerErrorData
  status: number
}

export function getErrorMessageData(error: unknown) {
  if (isFetchBaseQueryError(error)) {
    if ('data' in error) {
      const errorData = error as CustomerError

      if ('messages' in errorData.data) {
        if (errorData.data.messages.length) {
          return errorData.data.messages
        } else {
          // in case if messages is empty []
          return errorData.data.error
        }
      }
    }
  } else if (isErrorWithMessage(error)) {
    return error.message
  }

  // any other errors
  return JSON.stringify(error)
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).message === 'string'
  )
}
