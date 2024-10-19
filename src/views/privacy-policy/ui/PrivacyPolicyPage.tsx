import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { DocsContent } from '@/shared/ui/components'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'

function PrivacyPolicyPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <DocsContent
        buttonText={t.privacyPolicyPage.backButton}
        docsContent={t.privacyPolicyPage.content}
        href={Paths.signUp}
        title={t.privacyPolicyPage.pageTitle}
      />
    </Page>
  )
}

PrivacyPolicyPage.getLayout = getLayout
export default PrivacyPolicyPage
