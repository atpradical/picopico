import { useSelector } from 'react-redux'

import { selectCreatePostAllData } from '@/features/posts/model'
import { CreatePostDescription } from '@/features/posts/ui'
import { Carousel, DialogBody } from '@atpradical/picopico-ui-kit'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

export const PublishBody = () => {
  const { previewList } = useSelector(selectCreatePostAllData)

  return (
    <DialogBody className={s.filteringBody}>
      <div className={s.previewSizes}>
        <Carousel slides={previewList ?? []} />
      </div>
      <CreatePostDescription />
    </DialogBody>
  )
}
