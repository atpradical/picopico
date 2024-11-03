import { useContext, useEffect, useState } from 'react'

import { POSTS_MAX_PAGE_SIZE } from '@/features/profile/config'
import { ProfileHeader, Publications } from '@/features/profile/ui'
import { GetPostsItems, useGetPostsQuery } from '@/services/posts'
import { useGetUserProfileQuery } from '@/services/profile'
import { AuthContext } from '@/shared/contexts'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

function ProfilePage() {
  const router = useRouter()
  const { isAuth, meData } = useContext(AuthContext)
  const { data: profileData, isSuccess: isProfileDataSuccess } = useGetUserProfileQuery(undefined, {
    skip: meData?.userId !== Number(router.query.id),
  })

  const [pageNumber, setPageNumber] = useState(1)
  const [skipGetPosts, setSkipGetPosts] = useState(true)
  const [allPosts, setAllPosts] = useState<GetPostsItems[]>([])

  const { data: postsData } = useGetPostsQuery(
    { pageNumber, pageSize: POSTS_MAX_PAGE_SIZE, userName: profileData?.userName ?? '' },
    { skip: skipGetPosts }
  )

  useEffect(() => {
    if (isProfileDataSuccess) {
      setSkipGetPosts(false)
    }
  }, [isProfileDataSuccess])

  useEffect(() => {
    if (postsData?.items) {
      setAllPosts(prevPosts => [...prevPosts, ...postsData.items])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsData])

  const [lastPostRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })

  useEffect(() => {
    if (postsData) {
      if (entry?.isIntersecting && postsData?.pagesCount > pageNumber) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  return (
    <Page>
      <div className={s.container}>
        <ProfileHeader
          aboutMe={profileData?.aboutMe ?? ''}
          avatars={profileData?.avatars ?? []}
          className={s.header}
          isAuth={isAuth}
          userName={profileData?.userName ?? 'userName'}
        />
        <Publications posts={allPosts} ref={lastPostRef} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
