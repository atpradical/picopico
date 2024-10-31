import { ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { selectPostPreview } from '@/features/posts/model'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { Carousel, DialogBody, Typography } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type FiltersBodyProps = {
  previewList: Nullable<string[]>
} & ComponentPropsWithoutRef<typeof DialogBody>

export const FiltersBody = ({ previewList, ...rest }: FiltersBodyProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()

  return (
    <DialogBody className={s.filteringBody} {...rest}>
      <div className={s.previewSizes}>
        <Carousel slides={previewList ?? []} />
        {/*<Image*/}
        {/*  alt={createPostDialog.altDescription}*/}
        {/*  className={s.image} // todo: определиться с cover или contain*/}
        {/*  fill*/}
        {/*  src={previewList?.[0] ?? ''}*/}
        {/*/>*/}
      </div>
      {/*todo: complete posts filters*/}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography grey style={{ marginTop: '15px', textAlign: 'center' }} variant={'small'}>
          {'Apply "Filters" to photo feature is coming soon.'}
        </Typography>
      </div>
    </DialogBody>
  )
}
