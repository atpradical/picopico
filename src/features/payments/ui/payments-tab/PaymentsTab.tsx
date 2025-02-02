import { ComponentPropsWithoutRef } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
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

  return (
    <>
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
            <TableRow>
              <TableCell textAlign={'left'}>{'12.31.9999'}</TableCell>
              <TableCell textAlign={'left'}>{'12.31.9999'}</TableCell>
              <TableCell textAlign={'right'}>{'$10'}</TableCell>
              <TableCell textAlign={'left'}>{'1 day'}</TableCell>
              <TableCell textAlign={'left'}>{'Stripe'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell textAlign={'left'}>{'12.31.9999'}</TableCell>
              <TableCell textAlign={'left'}>{'12.31.9999'}</TableCell>
              <TableCell textAlign={'right'}>{'$10'}</TableCell>
              <TableCell textAlign={'left'}>{'1 day'}</TableCell>
              <TableCell textAlign={'left'}>{'Stripe'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell textAlign={'left'}>{'12.31.9999'}</TableCell>
              <TableCell textAlign={'left'}>{'12.31.9999'}</TableCell>
              <TableCell textAlign={'right'}>{'$10'}</TableCell>
              <TableCell textAlign={'left'}>{'1 day'}</TableCell>
              <TableCell textAlign={'left'}>{'Stripe'}</TableCell>
            </TableRow>
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
        <Typography variant={'error'}>page in development</Typography>
      </TabsContent>
    </>
  )
}
