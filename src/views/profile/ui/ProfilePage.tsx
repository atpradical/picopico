import { useState } from 'react'

import { POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { ProfileHeader, Publications } from '@/features/profile/ui'
import { wrapper } from '@/lib/store'
import { picoApi } from '@/services'
import { getPostsAllPublic, useGetPostsAllPublicQuery } from '@/services/posts'
import { ResponseGetUserProfile, getUserProfile } from '@/services/profile'
import { SortDirection } from '@/shared/enums/sort.enums'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { INITIAL_CURSOR } from '@/views/profile/config'
import { GetServerSideProps } from 'next'

import s from './ProfilePage.module.scss'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const userId = context.params?.id as string

    const profileData = await store.dispatch(getUserProfile.initiate({ profileId: userId }))

    if (!profileData.data) {
      return { notFound: true }
    }

    const postsData = await store.dispatch(
      getPostsAllPublic.initiate({
        endCursorPostId: INITIAL_CURSOR,
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
        profileData: profileData.data,
      },
    }
  }
)

type Props = {
  profileData: ResponseGetUserProfile
}

function ProfilePage({ profileData }: Props) {
  const [cursor, setCursor] = useState(INITIAL_CURSOR)

  const { data } = useGetPostsAllPublicQuery({
    endCursorPostId: cursor,
    pageSize: POSTS_MAX_PAGE_SIZE,
    sortDirection: SortDirection.DESC,
    userId: Number(profileData.id),
  })

  const updateCursor = (postId: number) => {
    setCursor(postId)
  }

  if (!data) {
    return null
  }

  return (
    <Page>
      <div className={s.container}>
        <ProfileHeader className={s.header} profileData={profileData} />
        <Publications posts={data?.items} updateCursor={updateCursor} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
