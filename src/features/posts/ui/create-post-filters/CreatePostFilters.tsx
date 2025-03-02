import { useState } from 'react'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import { FILTERS_LIST, PostFilter } from '@/features/posts/config'
import { selectActiveSlideIndex, selectPreviewList } from '@/features/posts/model'
import { applyFilter } from '@/features/posts/model/apply-filter'
import { useAppDispatch } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { ScrollArea, ScrollBar, Typography, clsx } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './CreatePostFilters.module.scss'

export const CreatePostFilters = () => {
  const dispatch = useAppDispatch()

  const previewList = useSelector(selectPreviewList)
  const activeSlideIndex = useSelector(selectActiveSlideIndex)

  const setPostFilterHandler = async (filter: PostFilter, index: number) => {
    if (!previewList) {
      return
    }

    const preview = previewList[index].previewUrlOrig

    if (preview) {
      applyFilter(preview, filter).then(previewWithFilter => {
        dispatch(
          createPostActions.applyFilterToPostPreview({
            filter,
            index,
            preview: previewWithFilter,
          })
        )
      })
    }
  }

  return (
    <div className={s.gridItemContainer}>
      <ScrollArea type={'always'}>
        <div className={s.filtersContainer}>
          {FILTERS_LIST.map(filter => (
            <FilterItem
              filter={filter}
              imageUrl={previewList?.[activeSlideIndex].previewUrlOrig ?? ''}
              key={filter}
              onClick={setPostFilterHandler}
            />
          ))}
        </div>
        <ScrollBar orientation={'horizontal'} />
      </ScrollArea>
    </div>
  )
}

type FilterItemProps = {
  filter: PostFilter
  imageUrl: string
  onClick: (filter: PostFilter, index: number) => void
}

const FilterItem = ({ filter, imageUrl, onClick }: FilterItemProps) => {
  const previewList = useSelector(selectPreviewList)
  const activeSlideIndex = useSelector(selectActiveSlideIndex)
  const [preview] = useState<Nullable<string>>(null)

  const isActiveFilter = previewList?.[activeSlideIndex].appliedFilter === filter

  return (
    <div
      className={s.filter}
      data-state={isActiveFilter ? 'active' : 'inactive'}
      onClick={() => onClick(filter, activeSlideIndex)}
    >
      <Image
        alt={'preview'}
        className={clsx(s.image, s[filter])}
        height={108}
        src={preview ?? imageUrl}
        width={108}
      />
      <Typography>{filter}</Typography>
    </div>
  )
}
