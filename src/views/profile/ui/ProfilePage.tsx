import { useEffect, useState } from 'react'

import { publicationsActions } from '@/features/posts/api'
import { POSTS_INITIAL_PAGE_NUMBER, POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { ProfileHeader, Publications } from '@/features/profile/ui'
import { useGetPostsQuery } from '@/services/posts'
import { useGetUserProfileQuery } from '@/services/profile'
import { useAppDispatch } from '@/shared/hooks'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(POSTS_INITIAL_PAGE_NUMBER)

  const { data: profileData } = useGetUserProfileQuery(
    { profileId: router.query.id as string },
    { skip: !router.query.id }
  )

  const { data: postsData } = useGetPostsQuery(
    {
      pageNumber: page,
      pageSize: POSTS_MAX_PAGE_SIZE,
      userName: profileData?.userName ?? '',
    },
    { skip: !profileData?.userName }
  )

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
      <div className={s.container}>
        <ProfileHeader className={s.header} profileData={profileData} />
        <Publications updatePageNumber={updatePageNumber} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
