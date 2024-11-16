import { useState } from 'react'

import { PostAspect } from '@/features/posts/config'
import {
  Button,
  ExpandOutlineIcon,
  HorizontalRectangleIcon,
  ImageOutlineIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SquareIcon,
  ToggleGroup,
  ToggleGroupItem,
  VerticalRectangleIcon,
} from '@atpradical/picopico-ui-kit'

import s from './AspectPopover.module.scss'

type ExpandPopoverProps = {
  onAspectChange: (value: number) => void
  originalAspect: number
}

export const AspectPopover = ({ onAspectChange, originalAspect }: ExpandPopoverProps) => {
  const [value, setValue] = useState(PostAspect.original)

  const toggleValueChangeHandler = (value: string) => {
    switch (value) {
      case PostAspect.original:
        onAspectChange(originalAspect)
        setValue(PostAspect.original)
        break
      case PostAspect.square:
        onAspectChange(1)
        setValue(PostAspect.square)
        break
      case PostAspect.portrait:
        onAspectChange(4 / 5)
        setValue(PostAspect.portrait)
        break
      case PostAspect.landscape:
        onAspectChange(16 / 9)
        setValue(PostAspect.landscape)
        break
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={s.buttonTrigger} variant={'icon'}>
          <ExpandOutlineIcon className={s.iconImage} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'start'} className={s.popoverContent} side={'top'}>
        <ToggleGroup
          className={s.toggleGroup}
          defaultValue={'original'}
          onValueChange={toggleValueChangeHandler}
          type={'single'}
          value={value}
        >
          <ToggleGroupItem className={s.toggleItem} value={'original'}>
            Original <ImageOutlineIcon className={s.iconImage} />
          </ToggleGroupItem>
          <ToggleGroupItem className={s.toggleItem} value={PostAspect.square}>
            {PostAspect.square} <SquareIcon className={s.iconRatio} />
          </ToggleGroupItem>
          <ToggleGroupItem className={s.toggleItem} value={PostAspect.portrait}>
            {PostAspect.portrait} <VerticalRectangleIcon className={s.iconRatio} />
          </ToggleGroupItem>
          <ToggleGroupItem className={s.toggleItem} value={PostAspect.landscape}>
            {PostAspect.landscape} <HorizontalRectangleIcon className={s.iconRatio} />
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  )
}
