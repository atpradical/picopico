import { ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { selectCreatePostAllData } from '@/features/posts/model'
import { CreatePostFilters } from '@/features/posts/ui'
import { Carousel, DialogBody } from '@atpradical/picopico-ui-kit'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type FiltersBodyProps = ComponentPropsWithoutRef<typeof DialogBody>

export const FiltersBody = ({ ...rest }: FiltersBodyProps) => {
  const { previewListWithFilter } = useSelector(selectCreatePostAllData)

  return (
    <DialogBody className={s.filteringBody} {...rest}>
      <div className={s.previewSizes}>
        <Carousel slides={previewListWithFilter ?? []} />
      </div>
      <CreatePostFilters />
    </DialogBody>
  )
}
