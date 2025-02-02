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
              <TableHead textAlign={'left'}>Date of Payment</TableHead>
              <TableHead textAlign={'left'}>End date of subscription</TableHead>
              <TableHead textAlign={'right'}>Price</TableHead>
              <TableHead textAlign={'left'}>Subscription Type</TableHead>
              <TableHead textAlign={'left'}>Payment Type</TableHead>
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
          totalCount={90}
        />
        <Typography variant={'error'}>page in development</Typography>
      </TabsContent>
    </>
  )
}
