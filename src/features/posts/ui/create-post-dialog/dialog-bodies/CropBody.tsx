import { ChangeEvent, ComponentPropsWithoutRef } from 'react'

import { Nullable } from '@/shared/types'
import {
  Button,
  Carousel,
  CloseOutlineIcon,
  DialogBody,
  ExpandOutlineIcon,
  HorizontalRectangleIcon,
  ImageOutlineIcon,
  MaximizeOutlineIcon,
  PlusCircleOutlineIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  SquareIcon,
  ToggleGroup,
  ToggleGroupItem,
  VerticalRectangleIcon,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'

import s from '@/features/posts/ui/create-post-dialog/dialog-bodies/dialog.bodies.module.scss'

type CropBodyProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewList: Nullable<string[]>
} & ComponentPropsWithoutRef<typeof DialogBody>

export const CropBody = ({ onUpload, previewList, ...props }: CropBodyProps) => {
  return (
    <DialogBody className={clsx(s.body, s.withPreview)} {...props}>
      <div className={s.previewSizes}>
        <Carousel slides={previewList ?? []} />
        <div className={s.toolsContainer}>
          <div className={s.leftToolsContainer}>
            <Popover>
              <PopoverTrigger asChild>
                <Button className={s.buttonTrigger} variant={'icon'}>
                  <ExpandOutlineIcon className={s.iconImage} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align={'start'} className={s.popoverContent} side={'top'}>
                <ToggleGroup className={s.toggleGroup} defaultValue={'original'} type={'single'}>
                  <ToggleGroupItem className={s.toggleItem} value={'original'}>
                    Original <ImageOutlineIcon className={s.iconImage} />
                  </ToggleGroupItem>
                  <ToggleGroupItem className={s.toggleItem} value={'1:1'}>
                    1:1 <SquareIcon className={s.iconRatio} />
                  </ToggleGroupItem>
                  <ToggleGroupItem className={s.toggleItem} value={'4:5'}>
                    4:5 <VerticalRectangleIcon className={s.iconRatio} />
                  </ToggleGroupItem>
                  <ToggleGroupItem className={s.toggleItem} value={'9:16'}>
                    9:16 <HorizontalRectangleIcon className={s.iconRatio} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button className={s.buttonTrigger} variant={'icon'}>
                  <MaximizeOutlineIcon className={s.iconImage} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align={'start'} className={s.popoverSliderContent} side={'top'}>
                <Slider className={s.slider} />
              </PopoverContent>
            </Popover>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button className={s.buttonTrigger} variant={'icon'}>
                <ImageOutlineIcon className={s.iconImage} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align={'end'} className={s.popoverImagesContainer} side={'top'}>
              <div className={s.uploadImagesContainer}>
                <div className={s.addContainer}>
                  <div className={s.prviewContainer}>
                    <Image
                      alt={'description'}
                      className={s.image} // todo: определиться с cover или contain
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
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </DialogBody>
  )
}
