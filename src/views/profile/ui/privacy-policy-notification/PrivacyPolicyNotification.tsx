import { Paths } from '@/shared/enums'
import { Translate } from '@/shared/ui/components'
import { Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './PrivacyPolicyNotification.module.scss'

type Props = {
  linkText: string
  notificationMessage: string
}
export const PrivacyPolicyNotification = ({ linkText, notificationMessage }: Props) => {
  const onClickHandler = () => {
    localStorage.setItem('goBackLink', Paths.Settings)
  }

  return (
    <Typography as={'span'}>
      <Translate
        tags={{
          1: () => (
            <Typography
              as={Link}
              className={s.link}
              href={Paths.privacyPolicy}
              onClick={onClickHandler}
              variant={'small_link'}
            >
              {linkText}
            </Typography>
          ),
        }}
        text={notificationMessage}
      />
    </Typography>
  )
}
