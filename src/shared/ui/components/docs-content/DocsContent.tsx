import { useGoBackLinkButton } from '@/shared/hooks'
import { ArrowBackOutlineIcon, Button, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './DocsContent.module.scss'

type DocsContentProps = {
  docsContent: string
  title: string
}

export const DocsContent = ({ docsContent, title }: DocsContentProps) => {
  const { buttonTitle, href } = useGoBackLinkButton()

  return (
    <div className={s.container}>
      <Button as={Link} className={s.button} href={href} variant={'link'}>
        <ArrowBackOutlineIcon />
        {buttonTitle}
      </Button>
      <div className={s.docsContainer}>
        <Typography as={'h1'} variant={'h1'}>
          {title}
        </Typography>
        <Typography className={s.content} variant={'regular_14'}>
          {docsContent}
        </Typography>
      </div>
    </div>
  )
}
