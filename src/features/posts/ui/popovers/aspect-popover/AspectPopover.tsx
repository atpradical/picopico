import { useState } from 'react'

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
  const [value, setValue] = useState('original')

  const toggleValueChangeHandler = (value: string) => {
    switch (value) {
      case 'original':
        onAspectChange(originalAspect)
        setValue('original')
        break
      case '1:1':
        onAspectChange(1)
        setValue('1:1')
        break
      case '4:5':
        onAspectChange(4 / 5)
        setValue('4:5')
        break
      case '16:9':
        onAspectChange(16 / 9)
        setValue('16:9')
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
          <ToggleGroupItem className={s.toggleItem} value={'1:1'}>
            1:1 <SquareIcon className={s.iconRatio} />
          </ToggleGroupItem>
          <ToggleGroupItem className={s.toggleItem} value={'4:5'}>
            4:5 <VerticalRectangleIcon className={s.iconRatio} />
          </ToggleGroupItem>
          <ToggleGroupItem className={s.toggleItem} value={'16:9'}>
            16:9 <HorizontalRectangleIcon className={s.iconRatio} />
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  )
}
