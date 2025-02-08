import { PropsWithChildren, ReactElement } from 'react'

import { Layout, Navigation } from '@/shared/ui/layout'
import { NextPage } from 'next'

export const NavigationLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <Navigation />
      {children}
    </Layout>
  )
}

export function getNavigationLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
