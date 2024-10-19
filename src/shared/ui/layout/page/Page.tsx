import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Page.module.scss'

type PageProps = {
  mb?: CSSProperties['marginBottom']
  mt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

type PageRef = ElementRef<'div'>

export const Page = forwardRef<PageRef, PageProps>((props, ref) => {
  const { className, mb = '24px', mt = '24px', style, ...rest } = props

  const styles = { marginBottom: mb, marginTop: mt, ...style }

  return <div className={clsx(s.page, className)} ref={ref} style={styles} {...rest} />
})

Page.displayName = 'Page'
