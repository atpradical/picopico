import { ComponentPropsWithoutRef } from 'react'

import { Nullable } from '@/shared/types'
import { Carousel, DialogBody, Typography } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type FiltersBodyProps = {
  previewList: Nullable<string[]>
} & ComponentPropsWithoutRef<typeof DialogBody>

export const FiltersBody = ({ previewList, ...rest }: FiltersBodyProps) => {
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
        <FilterItem filterName={'filter Name'} imageUrl={previewList?.[0] ?? ''} />
        <FilterItem filterName={'filter Name'} imageUrl={previewList?.[0] ?? ''} />
        <FilterItem filterName={'filter Name'} imageUrl={previewList?.[0] ?? ''} />
      </div>
    </DialogBody>
  )
}

type FilterItemProps = {
  filterName: string
  imageUrl: string
}

const FilterItem = ({ filterName, imageUrl }: FilterItemProps) => {
  return (
    <div className={s.filter}>
      <Image alt={'preview'} className={s.image} height={108} src={imageUrl} width={108} />
      <Typography>{filterName}</Typography>
    </div>
  )
}
