import { formatDistanceToNow } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

export const getDateDistanceToNow = (date: Date, locale: string): string => {
  const resultLocale = locale === 'ru' ? ru : enUS

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: resultLocale,
  })
}
