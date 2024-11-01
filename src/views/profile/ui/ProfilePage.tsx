// import { useContext, useEffect, useState } from 'react'
//
// import { ProfileHeader, Publications } from '@/features/profile/ui'
// import { useGetPostsQuery } from '@/services/posts'
// import { useGetUserProfileQuery } from '@/services/profile'
// import { AuthContext } from '@/shared/contexts'
// import { getSidebarLayout } from '@/shared/ui/layout'
// import { Page } from '@/shared/ui/layout/page'
// import { useRouter } from 'next/router'
//
// import s from './ProfilePage.module.scss'
//
// function ProfilePage() {
//   const router = useRouter()
//   const { isAuth, meData } = useContext(AuthContext)
//   const skip = meData?.userId !== Number(router.query.id)
//   const { data: profileData } = useGetUserProfileQuery(undefined, { skip })
//
//   const [skipGetPosts, setSkipGetPosts] = useState(true)
//   const { data: postsData } = useGetPostsQuery(
//     { userName: profileData?.userName ?? '' },
//     { skip: skipGetPosts }
//   )
//
//   useEffect(() => {
//     if (profileData?.userName) {
//       setSkipGetPosts(false)
//     }
//   }, [profileData])
//
//   return (
//     <Page>
//       <div className={s.container}>
//         <ProfileHeader
//           aboutMe={profileData?.aboutMe ?? ''}
//           avatars={profileData?.avatars ?? []}
//           className={s.header}
//           isAuth={isAuth}
//           userName={profileData?.userName ?? 'userName'}
//         />
//         <Publications items={postsData?.items ?? []} />
//       </div>
//     </Page>
//   )
// }
//
// ProfilePage.getLayout = getSidebarLayout
// export default ProfilePage

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
  const skip = meData?.userId !== Number(router.query.id)
  const { data: profileData, isSuccess: isProfileDataSuccess } = useGetUserProfileQuery(undefined, {
    skip,
  })

  const [pageNumber, setPageNumber] = useState(1)
  const [skipGetPosts, setSkipGetPosts] = useState(true)
  const [allPosts, setAllPosts] = useState<GetPostsItems[]>([])

  const {
    data: postsData,
    isFetching,
    isSuccess: isPostsDataSuccess,
  } = useGetPostsQuery(
    { pageNumber, pageSize: 2, userName: profileData?.userName ?? '' },
    { skip: skipGetPosts }
  )

  useEffect(() => {
    if (isProfileDataSuccess) {
      setSkipGetPosts(false)
    }
  }, [isProfileDataSuccess])

  useEffect(() => {
    if (isPostsDataSuccess) {
      setAllPosts(prevPosts => [...prevPosts, ...postsData.items])
    }
  }, [isPostsDataSuccess])

  const [lastPostRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '40px',
    threshold: 0,
  })

  useEffect(() => {
    if (entry?.isIntersecting && postsData && postsData?.totalCount > allPosts.length) {
      setPageNumber(prevPageNumber => prevPageNumber + 1)
    }
  }, [entry?.isIntersecting, postsData?.totalCount, allPosts.length])

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
        <Publications items={allPosts} ref={lastPostRef} />

        {isFetching && <div>Loading more posts...</div>}
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
