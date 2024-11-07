import {
  Button,
  MaximizeOutlineIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from '@atpradical/picopico-ui-kit'

import s from './ScalePopover.module.scss'

export const ScalePopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={s.buttonTrigger} variant={'icon'}>
          <MaximizeOutlineIcon className={s.iconImage} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'start'} className={s.popoverContent} side={'top'}>
        <Slider className={s.slider} />
      </PopoverContent>
    </Popover>
  )
}
