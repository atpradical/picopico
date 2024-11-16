import { useState } from 'react'

import {
  Button,
  MaximizeIcon,
  MaximizeOutlineIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from '@atpradical/picopico-ui-kit'

import s from './ZoomPopover.module.scss'

type ScalePopoverProps = {
  onValueChange: (value: number) => void
  value: number[]
}

export const ZoomPopover = ({ onValueChange, value }: ScalePopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  return (
    <Popover onOpenChange={onOpenChange} open={isOpen}>
      <PopoverTrigger asChild>
        <Button className={s.buttonTrigger} variant={'icon'}>
          {isOpen ? (
            <MaximizeIcon className={s.iconImage} />
          ) : (
            <MaximizeOutlineIcon className={s.iconImage} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'start'} className={s.popoverContent} side={'top'}>
        <Slider
          className={s.slider}
          max={10}
          min={1}
          onValueChange={newValue => onValueChange(newValue[0])}
          value={value}
        />
      </PopoverContent>
    </Popover>
  )
}
