import { PropsWithChildren, ReactElement } from 'react'

import { AuthProvider } from '@/shared/contexts'
import { HeadMeta, Header } from '@/shared/ui/layout'
import { CustomToastContainer } from '@atpradical/picopico-ui-kit'
import { NextPage } from 'next'

import '@atpradical/picopico-ui-kit/dist/style.css'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  //todo: add User data into context
  return (
    <>
      <AuthProvider>
        <HeadMeta />
        <Header />
        <main className={s.layout}>{children}</main>
        <CustomToastContainer />
      </AuthProvider>
    </>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
