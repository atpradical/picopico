import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { createPostActions } from '@/features/posts/api'
import { FILTERS_LIST, PostFilter } from '@/features/posts/config'
import { selectCreatePostAllData } from '@/features/posts/model'
import { applyFilter } from '@/features/posts/model/apply-filter'
import { useAppDispatch } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { Typography, toaster } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './CreatePostFilters.module.scss'

export const CreatePostFilters = () => {
  const dispatch = useAppDispatch()
  const { activeSlideIndex, previewList, previewListWithFilter } =
    useSelector(selectCreatePostAllData)

  useEffect(() => {
    dispatch(createPostActions.setInitialPreviewListWithFilter())
  }, [dispatch])

  const setPostFilterHandler = async (filter: PostFilter, index: number) => {
    if (!previewList) {
      return
    }

    const preview = previewList[index]

    if (preview) {
      applyFilter(preview, filter).then(previewWithFilter =>
        dispatch(
          createPostActions.addPostPreviewWithFilter({
            index,
            preview: previewWithFilter,
          })
        )
      )
    }
  }

  if (previewListWithFilter === null) {
    return null
  }

  return (
    <div className={s.filtersContainer}>
      {FILTERS_LIST.map(filter => (
        <FilterItem
          filter={filter}
          imageUrl={previewList?.[activeSlideIndex] ?? ''}
          key={filter}
          onClick={setPostFilterHandler}
        />
      ))}
    </div>
  )
}

type FilterItemProps = {
  filter: PostFilter
  imageUrl: string
  onClick: (filter: PostFilter, index: number) => void
}

const FilterItem = ({ filter, imageUrl, onClick }: FilterItemProps) => {
  const { activeSlideIndex } = useSelector(selectCreatePostAllData)
  const [preview, setPreview] = useState<Nullable<string>>(null)

  const fetchPreview = useCallback(async () => {
    try {
      const previewUrl = await applyFilter(imageUrl, filter)

      setPreview(previewUrl)
    } catch (error) {
      toaster({ text: `Failed to apply filter: ${error}`, variant: 'error' })
    }
  }, [filter, imageUrl])

  useEffect(() => {
    fetchPreview()
  }, [fetchPreview])

  if (!preview) {
    return null
  }

  return (
    <div className={s.filter} onClick={() => onClick(filter, activeSlideIndex)}>
      <Image
        alt={'preview'}
        className={s.image}
        height={108}
        src={preview ?? imageUrl}
        width={108}
      />
      <Typography>{filter}</Typography>
    </div>
  )
}
