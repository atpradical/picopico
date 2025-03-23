import { useEffect } from 'react'

import { useGoogleLoginMutation } from '@/services/auth'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { getErrorMessageData } from '@/shared/utils'
import { Typography } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './FeedPage.module.scss'

const FeedPage = () => {
  const router = useRouter()
  const code = router.query.code as string
  const [googleLogin, { error, isError }] = useGoogleLoginMutation()

  useEffect(() => {
    if (code) {
      googleLogin({ code })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  if (isError) {
    const errorMessage = getErrorMessageData(error)

    return <div>{`Error: ${errorMessage}`}</div>
  }

  return (
    <Page>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          Feed Page
        </Typography>
        <Typography variant={'error'}>Page in development...</Typography>
      </div>
    </Page>
  )
}

FeedPage.getLayout = getNavigationLayout
export default FeedPage
