import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { ALLOWED_POST_UPLOAD_TYPES } from '@/features/posts/config'
import { selectPostPreview, selectPostsUploadingError } from '@/features/posts/model'
import { UploadFileError } from '@/shared/ui/components'
import { PlaceholderImage } from '@/shared/ui/components/placeholder-image'
import { ControlledTextArea } from '@/shared/ui/form-components'
import { Avatar, Button, DialogBody, Typography, clsx } from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/CreatePostDialog.module.scss'

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
          accept={ALLOWED_POST_UPLOAD_TYPES.join(', ')}
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
  onPublish: () => void
} & ComponentPropsWithoutRef<typeof DialogBody>

export const PublishingBody = ({ onPublish, ...rest }: PublishingBodyProps) => {
  const postPreview = useSelector(selectPostPreview)

  const {
    control,
    // formState: { dirtyFields, isValid },
    handleSubmit,
    // setError,
  } = useForm<any>({
    defaultValues: {
      postDescription: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    // resolver: zodResolver(profileDataSchemeCreator(validation)),
  })

  const formHandler = handleSubmit(async data => {
    console.log(data)
  })

  return (
    <DialogBody className={s.filteringBody} {...rest}>
      <div className={s.previewSizes}>
        <Image
          alt={'Изображение нового поста'} // todo: добавить переводы
          className={s.image} // todo: определиться с cover или contain
          fill
          src={postPreview ?? ''}
        />
      </div>
      <div className={s.formContainer}>
        <Avatar showUserName size={'s'} userName={'User-Name'} />
        <form onSubmit={formHandler}>
          <ControlledTextArea
            className={s.textArea}
            control={control}
            label={'Add publication descriptions'} // todo: добавить переводы
            name={'description'}
            placeholder={'Add post description'} // todo: добавить переводы
            showCounter
          />
        </form>
        <Separator.Root className={s.separator} />
        <Typography grey style={{ marginTop: '15px', textAlign: 'center' }} variant={'small'}>
          {'Define "Location" feature is coming soon.'}
        </Typography>
      </div>
    </DialogBody>
  )
}
