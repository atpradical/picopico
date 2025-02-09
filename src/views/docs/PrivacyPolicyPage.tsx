import { useTranslation } from '@/shared/hooks'
import { DocsContent } from '@/shared/ui/components'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'

function PrivacyPolicyPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <DocsContent
        docsContent={t.privacyPolicyPage.content}
        title={t.privacyPolicyPage.pageTitle}
      />
    </Page>
  )
}

PrivacyPolicyPage.getLayout = getLayout
export default PrivacyPolicyPage
