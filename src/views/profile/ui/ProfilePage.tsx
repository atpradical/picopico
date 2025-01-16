import { useEffect, useState } from 'react'

import { POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { ProfileHeader, Publications } from '@/features/profile/ui'
import { publicationsActions } from '@/features/publication/api'
import { wrapper } from '@/lib/store'
import { picoApi } from '@/services'
import { getPostsAllPublic, useGetPostsAllPublicQuery } from '@/services/posts'
import { ResponseGetUserProfile, getUserProfile } from '@/services/profile'
import { SortDirection } from '@/shared/enums/sort.enums'
import { useAppDispatch } from '@/shared/hooks'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { GetServerSideProps } from 'next'

import s from './ProfilePage.module.scss'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      const userId = params?.id as string

      const profileData = await store.dispatch(getUserProfile.initiate({ profileId: userId }))

      if (!profileData.data) {
        return { notFound: true }
      }

      const postsData = await store.dispatch(
        getPostsAllPublic.initiate({
          pageSize: POSTS_MAX_PAGE_SIZE,
          sortDirection: SortDirection.DESC,
          userId: Number(userId),
        })
      )

      if (!postsData.data) {
        return { notFound: true }
      }

      await Promise.all(store.dispatch(picoApi.util.getRunningQueriesThunk()))

      return {
        props: {
          // postsData: postsData.data,
          profileData: profileData.data,
        },
      }
    }
)

type Props = {
  // postsData: GetPostsAllPublicResponse
  profileData: ResponseGetUserProfile
}

function ProfilePage({ profileData }: Props) {
  const dispatch = useAppDispatch()
  const [cursor, setCursor] = useState(-1)

  useGetPostsAllPublicQuery(
    {
      endCursorPostId: cursor,
      pageSize: POSTS_MAX_PAGE_SIZE,
      sortDirection: SortDirection.DESC,
      userId: Number(profileData.id),
    },
    { skip: cursor === -1 }
  )

  useEffect(() => {
    // очищаем стейт при выходе со страницы
    return () => {
      dispatch(publicationsActions.resetPublications())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCursor = (postId: number) => {
    setCursor(postId)
  }

  return (
    <Page>
      <div className={s.container}>
        <ProfileHeader className={s.header} profileData={profileData} />
        <Publications updateCursor={updateCursor} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
