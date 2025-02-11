import { PaymentHistoryItem } from '@/services/payments'
import { Locale } from 'date-fns'

type Props = {
  dateLocale: Locale
  paginatedData: PaymentHistoryItem[]
}

export const PaymentHistoryTableMobile = (props: Props) => {
  return <div>PaymentHistoryTableMobile</div>
}
