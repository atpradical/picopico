import { ComponentPropsWithoutRef, ElementRef, forwardRef, useMemo } from 'react'

import { useTranslation } from '@/shared/hooks'
import {
  FlagRussiaIcon,
  FlagUnitedKingdomIcon,
  OptionsValue,
  Select,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './SelectLanguage.module.scss'

type SelectLanguageProps = { isMobile: boolean } & ComponentPropsWithoutRef<typeof Select>
type SelectLanguageRef = ElementRef<typeof Select>

export const SelectLanguage = forwardRef<SelectLanguageRef, SelectLanguageProps>(
  ({ className, isMobile, ...rest }, ref) => {
    const { asPath, locale, pathname, push, query } = useRouter()
    const { t } = useTranslation()

    const languages: OptionsValue[] = useMemo(
      () => [
        {
          icon: <FlagRussiaIcon className={s.icon} />,
          label: t.language.ru,
          value: 'ru',
        },
        {
          icon: <FlagUnitedKingdomIcon className={s.icon} />,
          label: t.language.en,
          value: 'en',
        },
      ],
      [t.language]
    )

    const changeLangHandler = (lang: string) => {
      push({ pathname, query }, asPath, { locale: lang })
    }

    return (
      <Select
        className={clsx(s.container, isMobile && s.containerMobile, className)}
        defaultValue={locale ?? 'en'}
        isSmall={isMobile}
        onValueChange={changeLangHandler}
        options={languages}
        ref={ref}
        {...rest}
      />
    )
  }
)

SelectLanguage.displayName = 'SelectLanguage'
