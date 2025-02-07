import { Locale, format } from 'date-fns'

export function longLocalizedDate(date: Date, locale: Locale) {
  return format(new Date(date), 'P', { locale: locale })
}
