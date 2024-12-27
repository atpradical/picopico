import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { publicationsActions } from '@/features/posts/api'
import { POSTS_MAX_PAGE_SIZE } from '@/features/posts/config'
import { selectPublicationsAllData } from '@/features/posts/model'
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
  const { pageNumber } = useSelector(selectPublicationsAllData)
  const requestIdRef = useRef<string[]>([])

  const { data: profileData } = useGetUserProfileQuery(
    { profileId: router.query.id as string },
    { skip: !router.query.id }
  )

  const {
    data: postsData,
    isSuccess: isPostsSuccess,
    requestId,
  } = useGetPostsQuery(
    {
      pageNumber,
      pageSize: POSTS_MAX_PAGE_SIZE,
      userName: profileData?.userName ?? '',
    },
    { skip: !profileData?.userName }
  )

  useEffect(() => {
    // Выходим если запрос за постами не успешен.
    if (!isPostsSuccess || !postsData || !requestId) {
      return
    }

    // Добавляем посты в стейт только если это новый запрос.
    if (!requestIdRef.current.includes(requestId)) {
      requestIdRef.current.push(requestId)
      if (postsData.items.length > 0) {
        dispatch(publicationsActions.setPublications({ posts: postsData.items }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsData])

  useEffect(() => {
    // очищаем стейт при выходе со страницы
    return () => {
      dispatch(publicationsActions.resetPublications())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updatePageNumber = () => {
    if (postsData && pageNumber < postsData?.pagesCount) {
      dispatch(publicationsActions.setPageNumber({ pageNumber: pageNumber + 1 }))
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
