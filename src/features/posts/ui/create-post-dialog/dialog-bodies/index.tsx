import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { postsActions } from '@/features/posts/api'
import { POST_ALLOWED_UPLOAD_TYPES, POST_DESCRIPTION_MAX_LENGTH } from '@/features/posts/config'
import { selectPostPreview, selectPostsUploadingError } from '@/features/posts/model'
import { useAppDispatch } from '@/shared/hooks'
import { UploadFileError } from '@/shared/ui/components'
import { PlaceholderImage } from '@/shared/ui/components/placeholder-image'
import { Avatar, Button, DialogBody, TextArea, Typography, clsx } from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'
import Image from 'next/image'

import s from './dialog.bodies.module.scss'

type StartBodyProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const StartBody = ({ onUpload, ...rest }: StartBodyProps) => {
  const uploadingError = useSelector(selectPostsUploadingError)

  return (
    <DialogBody className={s.body} {...rest}>
      {uploadingError && <UploadFileError errorText={uploadingError} />}
      <PlaceholderImage />
      <Button as={'label'} className={s.button} variant={'primary'}>
        <input
          accept={POST_ALLOWED_UPLOAD_TYPES.join(', ')}
          hidden
          onChange={onUpload}
          type={'file'}
        />
        {/*// todo: добавить переводы*/}
        {'Select from Computer'}
      </Button>
      <Button
        className={s.button}
        onClick={() => {}} // todo: добавить handlers для кнопок
        variant={'outlined'}
      >
        {/*// todo: добавить переводы*/}
        {'Open Draft'}
      </Button>
    </DialogBody>
  )
}

type CroppingBodyProps = ComponentPropsWithoutRef<typeof DialogBody>
export const CroppingBody = (props: CroppingBodyProps) => {
  const postPreview = useSelector(selectPostPreview)

  return (
    <DialogBody className={clsx(s.body, s.withPreview)} {...props}>
      <div className={s.previewSizes}>
        <Image
          alt={'Изображение нового поста'} // todo: добавить переводы
          className={s.image} // todo: определиться с cover или contain
          fill
          src={postPreview ?? ''}
        />
      </div>
    </DialogBody>
  )
}

type FilteringBodyProps = ComponentPropsWithoutRef<typeof DialogBody>

export const FilteringBody = (props: FilteringBodyProps) => {
  const postPreview = useSelector(selectPostPreview)

  return (
    <DialogBody className={s.filteringBody} {...props}>
      <div className={s.previewSizes}>
        <Image
          alt={'Изображение нового поста'} // todo: добавить переводы
          className={s.image} // todo: определиться с cover или contain
          fill
          src={postPreview ?? ''}
        />
      </div>
      {/*  todo: добавить возможность выбора стилей.*/}
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

type PublishingBodyProps = {
  // onPublish: (data: PostDescriptionFormFields) => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const PublishingBody = (props: PublishingBodyProps) => {
  const dispatch = useAppDispatch()
  const postPreview = useSelector(selectPostPreview)

  const onDescriptionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.currentTarget.value

    dispatch(postsActions.addPostDescription({ description }))
  }

  return (
    <DialogBody className={s.filteringBody} {...props}>
      <div className={s.previewSizes}>
        <Image
          alt={'Изображение нового поста'} // todo: добавить переводы
          className={s.image} // todo: определиться с cover или contain
          fill
          src={postPreview ?? ''}
        />
      </div>
      <div className={s.formContainer} {...props}>
        <Avatar showUserName size={'s'} userName={'User-Name'} />
        <TextArea
          className={s.textArea}
          counterLimit={POST_DESCRIPTION_MAX_LENGTH}
          label={'Add publication descriptions'} // todo: добавить переводы
          onChange={onDescriptionChangeHandler}
          placeholder={'Add post description'} // todo: добавить переводы
          rows={6}
        />
        <Separator.Root className={s.separator} />
        <Typography grey style={{ marginTop: '15px', textAlign: 'center' }} variant={'small'}>
          {'Define "Location" feature is coming soon.'}
        </Typography>
      </div>
    </DialogBody>
  )
}
