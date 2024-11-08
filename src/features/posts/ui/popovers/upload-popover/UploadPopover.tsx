import { ChangeEvent } from 'react'

import { POSTS_ALLOWED_UPLOAD_TYPES } from '@/features/posts/config'
import { Nullable } from '@/shared/types'
import {
  Button,
  CloseOutlineIcon,
  FileUploader,
  ImageOutlineIcon,
  PlusCircleOutlineIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  ScrollBar,
} from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './UploadPopover.module.scss'

type UploadPopoverProps = {
  onRemove: (index: number) => void
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
}

export const UploadPopover = ({ onRemove, onUpload, previewList }: UploadPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={s.buttonTrigger} variant={'icon'}>
          <ImageOutlineIcon className={s.iconImage} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'end'} className={s.popoverContainer} side={'top'}>
        <ScrollArea>
          <div className={s.contentContainer}>
            {previewList?.map((el, index) => {
              return (
                <div className={s.previewItem} key={el + index}>
                  <Image
                    alt={'description'}
                    className={s.image}
                    height={80}
                    src={previewList?.[index] ?? ''}
                    width={80}
                  />
                  <Button
                    className={s.closeButton}
                    onClick={() => onRemove(index)}
                    variant={'icon'}
                  >
                    <CloseOutlineIcon />
                  </Button>
                </div>
              )
            })}
            <FileUploader
              accept={POSTS_ALLOWED_UPLOAD_TYPES}
              className={s.addButton}
              onChange={onUpload}
              variant={'icon'}
            >
              <PlusCircleOutlineIcon className={s.plusIcon} />
            </FileUploader>
            <ScrollBar orientation={'horizontal'} />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
