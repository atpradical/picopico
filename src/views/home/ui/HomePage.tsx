import { TotalUsers } from '@/features/public-user/ui'
import { wrapper } from '@/lib/store'
import { picoApi } from '@/services'
import { useGoogleLoginQuery } from '@/services/auth'
import { getCurrentUsersAmount } from '@/services/public-user'
import { Page, getSidebarLayout } from '@/shared/ui/layout'
import { getErrorMessageData } from '@/shared/utils'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import s from './HomePage.module.scss'

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async context => {
  const totalUsersAmount = await store.dispatch(getCurrentUsersAmount.initiate())

  if (!totalUsersAmount.data) {
    return { notFound: true }
  }

  // const postsData = await store.dispatch(
  //   getPostsAllPublic.initiate({
  //     endCursorPostId: INITIAL_CURSOR,
  //     pageSize: POSTS_MAX_PAGE_SIZE,
  //     sortDirection: SortDirection.DESC,
  //   })
  // )
  //
  // if (!postsData.data) {
  //   return { notFound: true }
  // }

  await Promise.all(store.dispatch(picoApi.util.getRunningQueriesThunk()))

  return {
    props: {
      totalUsersAmount: totalUsersAmount.data.totalCount,
    },
  }
})

type PageProps = {
  totalUsersAmount: number
}

const HomePage = ({ totalUsersAmount }: PageProps) => {
  const router = useRouter()
  const code = router.query.code as string
  const { error } = useGoogleLoginQuery({ code }, { skip: !code })

  if (error) {
    const errorMessage = getErrorMessageData(error)

    return <div>{`Error: ${errorMessage}`}</div>
  }

  return (
    <Page>
      <div className={s.container}>
        <TotalUsers counter={`00${totalUsersAmount}`} />
      </div>
    </Page>
  )
}

HomePage.getLayout = getSidebarLayout
export default HomePage
