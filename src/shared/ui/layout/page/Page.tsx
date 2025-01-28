import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ScrollArea } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './Page.module.scss'

type PageProps = {
  pb?: CSSProperties['paddingBottom']
  pt?: CSSProperties['paddingTop']
} & ComponentPropsWithoutRef<'div'>

type PageRef = ElementRef<'div'>

export const Page = forwardRef<PageRef, PageProps>(({ children, ...props }, ref) => {
  const { className, pb = '24px', pt = '24px', style, ...rest } = props

  const styles = { paddingBottom: pb, paddingTop: pt, ...style }

  return (
    <ScrollArea>
      <div className={clsx(s.page, className)} ref={ref} style={styles} {...rest}>
        {children}
      </div>
    </ScrollArea>
  )
})

Page.displayName = 'Page'
