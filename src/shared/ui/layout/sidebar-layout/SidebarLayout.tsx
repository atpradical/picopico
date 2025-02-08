import { PropsWithChildren, ReactElement } from 'react'

import { BottomBar, Layout } from '@/shared/ui/layout'
import { SideBar } from '@/shared/ui/layout/sidebar'
import { NextPage } from 'next'

export const SidebarLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <SideBar />
      {children}
      <BottomBar />
    </Layout>
  )
}

export function getSidebarLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>
}
