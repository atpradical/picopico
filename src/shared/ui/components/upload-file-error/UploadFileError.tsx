import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './UploadFileError.module.scss'

type UploadFileErrorProps = {
  errorText: string
} & ComponentPropsWithoutRef<'div'>
type UploadFileErrorRef = ElementRef<'div'>

export const UploadFileError = forwardRef<UploadFileErrorRef, UploadFileErrorProps>(
  ({ className, errorText, ...rest }, ref) => {
    return (
      <div className={clsx(s.container, className)} ref={ref} {...rest}>
        <Typography className={s.message} variant={'bold_14'}>
          {errorText}
        </Typography>
      </div>
    )
  }
)
