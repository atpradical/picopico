import { useEffect, useState } from 'react'

import { POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { ProfileHeader, Publications } from '@/features/profile/ui'
import { publicationsActions } from '@/features/publication/api'
import { wrapper } from '@/lib/store'
import { picoApi } from '@/services'
import {
  PublicPostsItem,
  getPostsAllPublicByUserId,
  getPublicPostById,
  useGetPostsAllPublicByUserIdQuery,
} from '@/services/posts'
import { ResponseGetUserProfile, getPublicUserProfile } from '@/services/profile'
import { SortDirection } from '@/shared/enums/sort.enums'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { INITIAL_CURSOR } from '@/views/profile/config'
import { Spinner } from '@atpradical/picopico-ui-kit'
import { GetServerSideProps } from 'next'

import s from './ProfilePage.module.scss'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const userId = context.params?.id as string

    const profileData = await store.dispatch(getPublicUserProfile.initiate({ profileId: userId }))

    if (!profileData.data) {
      return { notFound: true }
    }

    const postsData = await store.dispatch(
      getPostsAllPublicByUserId.initiate({
        endCursorPostId: INITIAL_CURSOR,
        pageSize: POSTS_MAX_PAGE_SIZE,
        sortDirection: SortDirection.DESC,
        userId: Number(userId),
      })
    )

    if (!postsData.data) {
      return { notFound: true }
    }

    const postId = context.query?.postId as string

    let prerenderedPostData
    let postNotFound = false

    if (postId) {
      const result = await store.dispatch(getPublicPostById.initiate({ postId: +postId }))

      if (result.data) {
        prerenderedPostData = result.data
      } else {
        postNotFound = true
      }
    }

    await Promise.all(store.dispatch(picoApi.util.getRunningQueriesThunk()))

    return {
      props: {
        postNotFound,
        prerenderedPostData: prerenderedPostData || null,
        profileData: profileData.data,
      },
    }
  }
)

type Props = {
  postNotFound: boolean
  prerenderedPostData?: PublicPostsItem
  profileData: ResponseGetUserProfile
}

function ProfilePage({ postNotFound, prerenderedPostData, profileData }: Props) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (prerenderedPostData) {
      dispatch(publicationsActions.setPostData({ postData: prerenderedPostData }))
      dispatch(
        publicationsActions.togglePostDisplayDialog({
          isOpen: true,
          postId: prerenderedPostData.id,
        })
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prerenderedPostData])

  const [cursor, setCursor] = useState(INITIAL_CURSOR)

  const { data, isFetching } = useGetPostsAllPublicByUserIdQuery({
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
        <ProfileHeader className={s.header} />
        <Publications postNotFound={postNotFound} posts={data?.items} updateCursor={updateCursor} />
        {isFetching && <Spinner containerClassName={s.spinner} label={t.loading} />}
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
