import { useTranslation } from '@/shared/hooks'
import { Button, GithubIcon, GoogleIcon } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './OAuth.module.scss'

// https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
const GOOGLE_LOGIN_URL = {
  pathname: 'https://accounts.google.com/o/oauth2/v2/auth',
  query: {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_BASE_URL,
    response_type: 'code',
    scope: 'email profile',
  },
} as const

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
const GITHUB_LOGIN_URL = 'https://inctagram.work/api/v1/auth/github/login'

export const OAuth = () => {
  const { t } = useTranslation()
  const { githubButton, googleButton } = t.signUpPage

  return (
    <div className={s.socials}>
      <Button as={Link} href={GITHUB_LOGIN_URL} title={githubButton} variant={'icon'}>
        <GithubIcon className={s.icon} />
      </Button>
      <Button as={Link} href={GOOGLE_LOGIN_URL} title={googleButton} variant={'icon'}>
        <GoogleIcon className={s.icon} />
      </Button>
    </div>
  )
}
