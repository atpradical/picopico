import { ComponentPropsWithoutRef, useMemo, useState } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { PaymentHistoryTable } from '@/features/payments/ui'
import { PaymentHistoryTableMobile } from '@/features/payments/ui/payment-history-table-mobile'
import { useGetUserPaymentsHistoryQuery } from '@/services/payments'
import { useTranslation } from '@/shared/hooks'
import { Pagination, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './PaymentsTab.module.scss'

type AccountManagementTabProps = {
  tableProps?: ComponentPropsWithoutRef<'table'>
} & ComponentPropsWithoutRef<typeof TabsContent>

export const PaymentsTab = ({ tableProps, ...props }: AccountManagementTabProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { data: paymentHistory } = useGetUserPaymentsHistoryQuery()
  const dateLocale = locale === 'ru' ? ru : enUS

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const paginatedData = useMemo(() => {
    if (!paymentHistory) {
      return []
    }

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    return paymentHistory.slice(startIndex, endIndex)
  }, [paymentHistory, currentPage, pageSize])

  const totalCount = paymentHistory?.length ?? 0

  const nextPage = () => {
    setCurrentPage(value => value + 1)
  }

  const prevPage = () => {
    setCurrentPage(value => value - 1)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const changePageSize = (value: string) => {
    setPageSize(+value)
    setCurrentPage(1)
  }

  return (
    <TabsContent className={s.container} {...props}>
      {paymentHistory && paymentHistory.length ? (
        <>
          <PaymentHistoryTable dateLocale={dateLocale} paginatedData={paginatedData} />
          <PaymentHistoryTableMobile dateLocale={dateLocale} paginatedData={paginatedData} />
          <Pagination
            currentPage={currentPage}
            onNextPage={nextPage}
            onPageChange={changePage}
            onPrevPage={prevPage}
            onSelectValueChange={changePageSize}
            pageSize={pageSize}
            selectOptions={paginationSelectOptions}
            textPerPage={t.profileSettings.paymentsTab.pagination.textPerPage}
            textShow={t.profileSettings.paymentsTab.pagination.textShow}
            totalCount={totalCount}
          />
        </>
      ) : (
        <Typography className={s.noPaymentHistoryText} grey variant={'h3'}>
          {t.profileSettings.paymentsTab.noPayments}
        </Typography>
      )}
    </TabsContent>
  )
}
