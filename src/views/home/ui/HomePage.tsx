import { POSTS_HOME_PAGE_SIZE } from '@/features/public-user/config'
import { TotalUsers } from '@/features/public-user/ui'
import { Publications } from '@/features/publication/ui/publications'
import { wrapper } from '@/lib/store'
import { picoApi } from '@/services'
import { useGoogleLoginQuery } from '@/services/auth'
import { PublicPostsItem } from '@/services/posts'
import { getCurrentUsersAmount, getPublicPostsAll } from '@/services/public-user'
import { SortDirection } from '@/shared/enums'
import { Page, getSidebarLayout } from '@/shared/ui/layout'
import { getErrorMessageData } from '@/shared/utils'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import s from './HomePage.module.scss'

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async context => {
  const totalUsersAmount = await store.dispatch(getCurrentUsersAmount.initiate())

  if (!totalUsersAmount.data) {
    return {
      notFound: true,
    }
  }

  const postsData = await store.dispatch(
    getPublicPostsAll.initiate({
      pageSize: POSTS_HOME_PAGE_SIZE,
      sortDirection: SortDirection.DESC,
    })
  )

  if (!postsData.data) {
    return {
      notFound: true,
    }
  }

  await Promise.all(store.dispatch(picoApi.util.getRunningQueriesThunk()))

  return {
    props: {
      postsData: postsData.data.items,
      totalUsersAmount: totalUsersAmount.data.totalCount,
    },
    // Регенерировать страницу каждые 60 секунд
    revalidate: 60,
  }
})

type PageProps = {
  postsData: PublicPostsItem[]
  totalUsersAmount: number
}

const HomePage = ({ postsData, totalUsersAmount }: PageProps) => {
  const router = useRouter()
  const code = router.query.code as string
  const { error } = useGoogleLoginQuery({ code }, { skip: !code })

  if (error) {
    const errorMessage = getErrorMessageData(error)

    return <div>{`Error: ${errorMessage}`}</div>
  }

  // todo: добавить просмотр постов, вынести диалог в общий компонент чтобы избежать дублирования с ProfilePage.
  return (
    <Page>
      <div className={s.container}>
        <TotalUsers counter={`00${totalUsersAmount}`} />
        <Publications posts={postsData} showDescription />
      </div>
    </Page>
  )
}

HomePage.getLayout = getSidebarLayout
export default HomePage
