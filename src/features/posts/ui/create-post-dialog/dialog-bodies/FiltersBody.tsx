import { ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { selectPostPreview } from '@/features/posts/model'
import { useTranslation } from '@/shared/hooks'
import { DialogBody, Typography } from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type FiltersBodyProps = ComponentPropsWithoutRef<typeof DialogBody>

export const FiltersBody = (props: FiltersBodyProps) => {
  const {
    t: { createPostDialog },
  } = useTranslation()
  const postPreview = useSelector(selectPostPreview)

  return (
    <DialogBody className={s.filteringBody} {...props}>
      <div className={s.previewSizes}>
        <Image
          alt={createPostDialog.altDescription}
          className={s.image} // todo: определиться с cover или contain
          fill
          src={postPreview ?? ''}
        />
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
