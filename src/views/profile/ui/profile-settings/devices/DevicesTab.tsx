import { ComponentPropsWithoutRef } from 'react'

import { Card, MSEdgeIcon, TabsContent, Typography } from '@atpradical/picopico-ui-kit'

import s from './DevicesTab.module.scss'

type DevicesTabProps = ComponentPropsWithoutRef<typeof TabsContent>
export const DevicesTab = ({ ...rest }: DevicesTabProps) => {
  return (
    <TabsContent {...rest}>
      <div className={s.section}>
        <Typography as={'h3'} variant={'h3'}>
          Current devices
        </Typography>
        <Card>
          <MSEdgeIcon />
          <Typography>Microsoft Edge</Typography>
          <Typography>IP: 22.345.345.12</Typography>
        </Card>
      </div>
      <div>
        <Typography as={'h3'} variant={'h3'}>
          Active sessions
        </Typography>
        <Card>
          <MSEdgeIcon />
        </Card>
      </div>
    </TabsContent>
  )
}
