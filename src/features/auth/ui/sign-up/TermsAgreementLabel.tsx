import { BackButtonPathFlags, Paths } from '@/shared/enums'
import { Translate } from '@/shared/ui/components'
import { Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

type TermsAgreementLabelProps = {
  policy: string
  terms: string
  termsAgreement: string
}

export const TermsAgreementLabel = ({
  policy,
  terms,
  termsAgreement,
}: TermsAgreementLabelProps) => {
  const onClickHandler = () => {
    sessionStorage.setItem('previousPath', Paths.SignUp)
    sessionStorage.setItem('backButtonPathFlags', BackButtonPathFlags.ToSignUp)
  }

  return (
    <Typography variant={'small'}>
      <Translate
        tags={{
          1: () => (
            <Typography
              as={Link}
              href={Paths.TermsOfService}
              onClick={onClickHandler}
              variant={'small_link'}
            >
              {terms}
            </Typography>
          ),
          2: () => (
            <Typography
              as={Link}
              href={Paths.PrivacyPolicy}
              onClick={onClickHandler}
              variant={'small_link'}
            >
              {policy}
            </Typography>
          ),
        }}
        text={termsAgreement}
      />
    </Typography>
  )
}
