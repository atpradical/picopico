import { PropsWithChildren, ReactElement } from 'react'

import { AuthProvider, MyProfileProvider } from '@/shared/contexts'
import { HeadMeta, Header } from '@/shared/ui/layout'
import { CustomToastContainer } from '@atpradical/picopico-ui-kit'
import { NextPage } from 'next'

import '@atpradical/picopico-ui-kit/dist/style.css'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <MyProfileProvider>
          <HeadMeta />
          <Header />
          <main className={s.layout}>{children}</main>
          <CustomToastContainer />
        </MyProfileProvider>
      </AuthProvider>
    </>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
