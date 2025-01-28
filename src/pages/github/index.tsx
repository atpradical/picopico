import { useEffect } from 'react'

import { useLazyMeQuery } from '@/services/auth'
import { useTranslation } from '@/shared/hooks'
import { Spinner } from '@atpradical/picopico-ui-kit'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Github() {
  const router = useRouter()
  const accessToken = router.query.accessToken as string
  const { t } = useTranslation()
  const [getMe, { isFetching }] = useLazyMeQuery()

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      getMe().then(response => {
        void router.push(`/profile/${response.data?.userId}`)
      })
    }
  }, [accessToken, getMe, router])

  if (isFetching) {
    return <Spinner label={t.loading} />
  }

  return (
    <Head>
      <title>{'Login via GitHub'}</title>
    </Head>
  )
}
