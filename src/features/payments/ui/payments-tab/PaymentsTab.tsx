import { ComponentPropsWithoutRef } from 'react'

import { paginationSelectOptions } from '@/features/payments/config'
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
  return (
    <>
      <TabsContent className={s.container} {...props}>
        <Table className={s.tableRoot} {...tableProps}>
          <TableHeader>
            <TableRow>
              <TableHead>Date of Payment</TableHead>
              <TableHead>End date of subscription</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subscription Type</TableHead>
              <TableHead>Payment Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{'12.31.9999'}</TableCell>
              <TableCell>{'12.31.9999'}</TableCell>
              <TableCell>{'$10'}</TableCell>
              <TableCell>{'1 day'}</TableCell>
              <TableCell>{'Stripe'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{'12.31.9999'}</TableCell>
              <TableCell>{'12.31.9999'}</TableCell>
              <TableCell>{'$10'}</TableCell>
              <TableCell>{'1 day'}</TableCell>
              <TableCell>{'Stripe'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{'12.31.9999'}</TableCell>
              <TableCell>{'12.31.9999'}</TableCell>
              <TableCell>{'$10'}</TableCell>
              <TableCell>{'1 day'}</TableCell>
              <TableCell>{'Stripe'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination
          currentPage={5}
          pageSize={10}
          selectOptions={paginationSelectOptions}
          totalCount={90}
        />
        <Typography variant={'error'}>page in development</Typography>
      </TabsContent>
    </>
  )
}
