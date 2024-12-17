import { useEffect } from 'react'

import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { DocsContent } from '@/shared/ui/components'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'

function PrivacyPolicyPage() {
  const { t } = useTranslation()

  const goBackLink =
    typeof window !== 'undefined' ? (localStorage.getItem('goBackLink') ?? '') : Paths.signUp

  useEffect(() => {
    if (goBackLink) {
      localStorage.removeItem('goBackLink')
    }
  }, [goBackLink])

  return (
    <Page>
      <DocsContent
        buttonText={t.privacyPolicyPage.backButton}
        docsContent={t.privacyPolicyPage.content}
        href={goBackLink}
        title={t.privacyPolicyPage.pageTitle}
      />
    </Page>
  )
}

PrivacyPolicyPage.getLayout = getLayout
export default PrivacyPolicyPage
