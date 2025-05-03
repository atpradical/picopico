import { useContext, useEffect, useRef, useState } from 'react'

import { INITIAL_CURSOR } from '@/features/profile/config'
import { useGetAllUsersQuery } from '@/services/users'
import { AuthContext } from '@/shared/contexts'
import { useSearch, useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { SearchResult } from '@/views/search/ui/serch-result'
import { Spinner, TextField, Typography } from '@atpradical/picopico-ui-kit'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useRouter } from 'next/router'

import s from './SearchPage.module.scss'

function SearchPage() {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)

  // query
  const { query } = useRouter()
  const { clearSearchHandler, searchChangeHandler } = useSearch()
  const search = query.search ? (query.search as string) : ''

  // infinity scroll
  const [cursor, setCursor] = useState(INITIAL_CURSOR)
  const sectionRef = useRef(null)
  const [searchItemRef, entry] = useIntersectionObserver({ root: null, threshold: 1 })

  const {
    data: users,
    isFetching,
    status,
  } = useGetAllUsersQuery(
    {
      cursor,
      search,
    },
    { skip: !isAuth }
  )

  useEffect(() => {
    if (entry?.isIntersecting && users?.nextCursor) {
      setCursor(users?.nextCursor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, users?.nextCursor])

  // если изменился поиск сбрасываем крусор
  useEffect(() => {
    setCursor(INITIAL_CURSOR)
  }, [search])

  const isSearchResult = !!users?.items?.length

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <section className={s.section}>
          <Typography className={s.sectionHeader} variant={'h1'}>
            {t.searchPage.pageTitle}
          </Typography>
          <TextField
            onChange={searchChangeHandler}
            onClear={clearSearchHandler}
            placeholder={t.searchPage.searchFieldPlaceholder}
            value={search}
            variant={'search'}
          />
        </section>
        <section className={s.section} ref={sectionRef}>
          {isSearchResult ? (
            <>
              {users?.items?.map(user => {
                return <SearchResult key={user.id} ref={searchItemRef} user={user} />
              })}
            </>
          ) : (
            <>
              {status === 'fulfilled' && (
                <div className={s.noRequstFound}>
                  <Typography grey variant={'bold_14'}>
                    {t.searchPage.emptySearchTextOne}
                  </Typography>

                  <Typography grey variant={'small'}>
                    {t.searchPage.emptySearchTextTwo}
                  </Typography>
                </div>
              )}
            </>
          )}
        </section>
        {isFetching && <Spinner containerClassName={s.spinner} label={t.loading} />}
      </div>
    </Page>
  )
}

SearchPage.getLayout = getNavigationLayout
export default SearchPage
