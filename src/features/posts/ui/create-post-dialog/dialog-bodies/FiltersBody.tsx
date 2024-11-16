import { ComponentPropsWithoutRef, useCallback, useEffect, useState } from 'react'

import { PostFilter } from '@/features/posts/config'
import { applyFilter } from '@/features/posts/model/apply-filter'
import { Nullable } from '@/shared/types'
import { Carousel, DialogBody, Typography, toaster } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type FiltersBodyProps = {
  onFilterChange: (filter: PostFilter, index: number) => void
  previewList: Nullable<string[]>
} & ComponentPropsWithoutRef<typeof DialogBody>

export const FiltersBody = ({ onFilterChange, previewList, ...rest }: FiltersBodyProps) => {
  // const {
  //   t: { createPostDialog },
  // } = useTranslation()

  return (
    <DialogBody className={s.filteringBody} {...rest}>
      <div className={s.previewSizes}>
        <Carousel slides={previewList ?? []} />
      </div>
      {/*todo: complete posts filters*/}
      <div className={s.filtersContainer}>
        <FilterItem
          filter={PostFilter.original}
          imageUrl={previewList?.[0] ?? ''}
          onClick={onFilterChange}
        />
        <FilterItem
          filter={PostFilter.clarendon}
          imageUrl={previewList?.[0] ?? ''}
          onClick={onFilterChange}
        />
        <FilterItem
          filter={PostFilter.lark}
          imageUrl={previewList?.[0] ?? ''}
          onClick={onFilterChange}
        />
        <FilterItem
          filter={PostFilter.gingham}
          imageUrl={previewList?.[0] ?? ''}
          onClick={onFilterChange}
        />
        <FilterItem
          filter={PostFilter.sepia}
          imageUrl={previewList?.[0] ?? ''}
          onClick={onFilterChange}
        />
        <FilterItem
          filter={PostFilter.moon}
          imageUrl={previewList?.[0] ?? ''}
          onClick={onFilterChange}
        />
      </div>
    </DialogBody>
  )
}

type FilterItemProps = {
  filter: PostFilter
  imageUrl: string
  onClick: (filter: PostFilter, index: number) => void
}

const FilterItem = ({ filter, imageUrl, onClick }: FilterItemProps) => {
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
    <div className={s.filter} onClick={() => onClick(filter, 0)}>
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
