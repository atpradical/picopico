import { ComponentPropsWithoutRef } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
import { useGetUserPaymentsHistoryQuery } from '@/services/payments'
import { useTranslation } from '@/shared/hooks'
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

import s from './PaymentsTab.module.scss'

type AccountManagementTabProps = {
  tableProps?: ComponentPropsWithoutRef<'table'>
} & ComponentPropsWithoutRef<typeof TabsContent>

export const PaymentsTab = ({ tableProps, ...props }: AccountManagementTabProps) => {
  const { t } = useTranslation()
  const { data: paymentHistory } = useGetUserPaymentsHistoryQuery()

  if (!paymentHistory) {
    return null
  }

  return (
    <>
      {paymentHistory.length ? (
        <TabsContent className={s.container} {...props}>
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
              {paymentHistory.map((el, index) => {
                return (
                  <TableRow key={`${el.subscriptionId}_${index}`}>
                    <TableCell textAlign={'left'}>{el.dateOfPayment}</TableCell>
                    <TableCell textAlign={'left'}>{el.endDateOfSubscription}</TableCell>
                    <TableCell textAlign={'right'}>{el.price}</TableCell>
                    <TableCell textAlign={'left'}>{el.subscriptionType}</TableCell>
                    <TableCell textAlign={'left'}>{el.paymentType}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Pagination
            currentPage={5}
            pageSize={10}
            selectOptions={paginationSelectOptions}
            textPerPage={t.profileSettings.paymentsTab.pagination.textPerPage}
            textShow={t.profileSettings.paymentsTab.pagination.textShow}
            totalCount={90}
          />
        </TabsContent>
      ) : (
        <Typography className={s.noPaymentHistoryText} grey variant={'h3'}>
          {t.profileSettings.paymentsTab.noPayments}
        </Typography>
      )}
      <Typography variant={'error'}>page in development</Typography>
    </>
  )
}
