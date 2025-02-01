import { ComponentPropsWithoutRef } from 'react'

import { useTranslation } from '@/shared/hooks'
import {
  Button,
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
  PolaroidIllustration,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './NotFoundContent.module.scss'

type NotFoundContentProps = ComponentPropsWithoutRef<typeof DialogRoot>

export const NotFoundContent = (props: NotFoundContentProps) => {
  const { t } = useTranslation()

  return (
    <DialogRoot {...props}>
      <DialogContent className={s.dialogContent}>
        <DialogBody className={s.bodyDialog}>
          <Typography variant={'h3'}>{t.postDialog.notFoundPostDialog}</Typography>
          <PolaroidIllustration className={s.illustration} />
          <DialogTrigger asChild>
            <Button variant={'outlined'}>Ok</Button>
          </DialogTrigger>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
