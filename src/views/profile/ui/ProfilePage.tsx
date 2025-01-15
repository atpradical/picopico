import { useEffect, useState } from 'react'

import { POSTS_INITIAL_PAGE_NUMBER, POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { ProfileHeader, Publications } from '@/features/profile/ui'
import { publicationsActions } from '@/features/publication/api'
import { wrapper } from '@/lib/store'
import { picoApi } from '@/services'
import { GetPostsResponse, useGetPostsQuery } from '@/services/posts'
import { ResponseGetUserProfile, getUserProfile } from '@/services/profile'
import { useAppDispatch } from '@/shared/hooks'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      const userId = params?.id as string

      const profileData = await store.dispatch(getUserProfile.initiate({ profileId: userId }))

      if (!profileData.data) {
        return { notFound: true }
      }
      //
      // const postsData = await store.dispatch(
      //   getPosts.initiate({
      //     pageNumber: POSTS_INITIAL_PAGE_NUMBER,
      //     pageSize: POSTS_MAX_PAGE_SIZE,
      //     userName: profileData.data.userName,
      //   })
      // )

      await Promise.all(store.dispatch(picoApi.util.getRunningQueriesThunk()))

      return {
        props: {
          profileData: profileData.data,
          // postsData: postsData.data,
        },
      }
    }
)

type Props = {
  postsData: GetPostsResponse
  profileData: ResponseGetUserProfile
}

// function ProfilePage({ profileData, postsData }: Props) {
function ProfilePage({ profileData }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(POSTS_INITIAL_PAGE_NUMBER)

  const { data: postsData } = useGetPostsQuery({
    pageNumber: page,
    pageSize: POSTS_MAX_PAGE_SIZE,
    userName: profileData?.userName,
  })

  useEffect(() => {
    // очищаем стейт при выходе со страницы
    return () => {
      dispatch(publicationsActions.resetPublications())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updatePageNumber = () => {
    if (postsData && page < postsData?.pagesCount) {
      setPage(prevPage => prevPage + 1)
    }
  }

  return (
    <Page>
      {'dfsdfsdfsdf'}
      <div className={s.container}>
        <ProfileHeader className={s.header} profileData={profileData} />
        <Publications updatePageNumber={updatePageNumber} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
