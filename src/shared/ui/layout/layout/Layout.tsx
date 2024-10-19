import { PropsWithChildren, ReactElement } from 'react'

import { useMeQuery } from '@/shared/api'
import { HeadMeta, Header } from '@/shared/ui/layout'
import { CustomToastContainer } from '@atpradical/picopico-ui-kit'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import '@atpradical/picopico-ui-kit/dist/style.css'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { data, isError, isLoading, isSuccess } = useMeQuery()
  const isAuth = !isError && !isLoading

  console.log(data)

  //todo: add User data into context
  return (
    <>
      <HeadMeta />
      <Header isAuth={isAuth} />
      <main className={s.layout}>{children}</main>
      <CustomToastContainer />
    </>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
