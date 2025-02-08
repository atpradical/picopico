import { useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { SearchResult } from '@/views/search/ui/serch-result'
import { TextField, Typography } from '@atpradical/picopico-ui-kit'

import s from './SearchPage.module.scss'

function SearchPage() {
  const { t } = useTranslation()

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <section className={s.section}>
          <Typography className={s.sectionHeader} variant={'h1'}>
            {t.searchPage.pageTitle}
          </Typography>
          <TextField placeholder={t.searchPage.searchFieldPlaceholder} variant={'search'} />
        </section>
        <section className={s.section}>
          <Typography className={s.sectionHeader} variant={'bold_16'}>
            {t.searchPage.searchHistoryTitle}
          </Typography>
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <div className={s.noRequstFound}>
            <Typography grey variant={'bold_14'}>
              {t.searchPage.emptySearchTextOne}
            </Typography>
            <Typography grey variant={'small'}>
              {t.searchPage.emptySearchTextTwo}
            </Typography>
          </div>
          <Typography variant={'error'}>Page in development</Typography>
        </section>
      </div>
    </Page>
  )
}

SearchPage.getLayout = getNavigationLayout
export default SearchPage
