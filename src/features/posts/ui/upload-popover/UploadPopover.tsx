import { Nullable } from '@/shared/types'
import {
  Button,
  CloseOutlineIcon,
  ImageOutlineIcon,
  PlusCircleOutlineIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@atpradical/picopico-ui-kit'
import Image from 'next/image'

import s from './UploadPopover.module.scss'

export const UploadPopover = ({ previewList }: { previewList: Nullable<string[]> }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={s.buttonTrigger} variant={'icon'}>
          <ImageOutlineIcon className={s.iconImage} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'end'} className={s.popoverContainer} side={'top'}>
        <div className={s.contentContainer}>
          <div className={s.previewItem}>
            <Image
              alt={'description'}
              className={s.image}
              height={80}
              src={previewList?.[0] ?? ''}
              width={80}
            />
            <Button className={s.closeButton} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </div>
          <Button className={s.addButton} variant={'icon'}>
            <PlusCircleOutlineIcon className={s.plusIcon} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
