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

import s from './ExpandPopover.module.scss'

export const ExpandPopover = () => {
  return (
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
  )
}
