import {POSTS_HOME_PAGE_SIZE} from '@/features/public-user/config'
import {TotalUsers} from '@/features/public-user/ui'
import {Publication} from '@/features/publication/ui'
import {wrapper} from '@/lib/store'
import {picoApi} from '@/services'
import {PublicPostsItem} from '@/services/posts'
import {getCurrentUsersAmount, getPublicPostsAll} from '@/services/public-user'
import {SortDirection} from '@/shared/enums'
import {Page, getNavigationLayout} from '@/shared/ui/layout'
import {GetStaticProps} from 'next'

import s from './PublicPage.module.scss'

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async () => {
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
            postsData: postsData.data.items || [],
            totalUsersAmount: totalUsersAmount.data.totalCount || 0,
        },
        revalidate: 60,
    }
})

type PageProps = {
    postsData: PublicPostsItem[]
    totalUsersAmount: number
}

const PublicPage = ({postsData, totalUsersAmount}: PageProps) => {

    return (
        <Page>
            <div className={s.container}>
                <TotalUsers counter={`00${totalUsersAmount}`}/>
                <section className={s.publicationsContainer}>
                    {postsData.map(post => {
                        return (
                            <Publication
                                isCarousel={post.images.length > 1}
                                isLink
                                key={post.id}
                                post={post}
                                showDescription
                            />
                        )
                    })}
                </section>
            </div>
        </Page>
    )
}

PublicPage.getLayout = getNavigationLayout
export default PublicPage
