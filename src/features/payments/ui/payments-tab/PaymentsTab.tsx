import { ComponentPropsWithoutRef, useMemo, useState } from 'react'

import {
  PaymentSystemDisplay,
  SubscriptionShortLabel,
  paginationSelectOptions,
} from '@/features/payments/config'
import { useGetUserPaymentsHistoryQuery } from '@/services/payments'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabsContent,
  Typography,
} from '@atpradical/picopico-ui-kit'
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
          <Table className={s.tableRoot} {...tableProps}>
            <TableHeader>
              <TableRow>
                <TableHead textAlign={'left'}>
                  {t.profileSettings.paymentsTab.paymentsTable.header.dateOfPayment}
                </TableHead>
                <TableHead textAlign={'left'}>
                  {t.profileSettings.paymentsTab.paymentsTable.header.dateEndOfSubscription}
                </TableHead>
                <TableHead textAlign={'right'}>
                  {t.profileSettings.paymentsTab.paymentsTable.header.price}
                </TableHead>
                <TableHead textAlign={'left'}>
                  {t.profileSettings.paymentsTab.paymentsTable.header.subscriptionDescription}
                </TableHead>
                <TableHead textAlign={'left'}>
                  {t.profileSettings.paymentsTab.paymentsTable.header.paymentSystem}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((el, index) => {
                const formattedDateOfPayment = longLocalizedDate(
                  new Date(el.dateOfPayment),
                  dateLocale
                )
                const formattedEndDateOfSubscription = longLocalizedDate(
                  new Date(el.endDateOfSubscription),
                  dateLocale
                )

                const subscriptionTextsWithTranslation = SubscriptionShortLabel[
                  locale ?? 'en'
                ].find(option => option.period === el.subscriptionType)

                return (
                  <TableRow key={`${el.subscriptionId}_${index}`}>
                    <TableCell textAlign={'left'}>{formattedDateOfPayment}</TableCell>
                    <TableCell textAlign={'left'}>{formattedEndDateOfSubscription}</TableCell>
                    <TableCell textAlign={'right'}>{`$${el.price}`}</TableCell>
                    <TableCell textAlign={'left'}>
                      {subscriptionTextsWithTranslation?.label}
                    </TableCell>
                    <TableCell textAlign={'left'}>{PaymentSystemDisplay[el.paymentType]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
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
