import { BackButtonPathFlags } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { useIsClient } from 'usehooks-ts'

export const useGoBackLinkButton = () => {
  const { t } = useTranslation()

  const isClient = useIsClient()

  const href: string = isClient ? (sessionStorage.getItem('previousPath') ?? '') : ''
  const hrefFlag: string = isClient
    ? (sessionStorage.getItem('backButtonPathFlags') ?? BackButtonPathFlags.goBack)
    : BackButtonPathFlags.goBack

  const buttonTitle = t.docsBackButtons[hrefFlag as keyof typeof t.docsBackButtons]

  return {
    buttonTitle,
    href,
  }
}
