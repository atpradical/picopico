import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  ExpandOutlineIcon,
  HorizontalRectangleIcon,
  ImageOutlineIcon,
  SquareIcon,
  Typography,
  VerticalRectangleIcon,
} from '@atpradical/picopico-ui-kit'

import s from './AspectRatioDropdown.module.scss'

export const AspectRatioDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={s.trigger} variant={'icon'}>
          <ExpandOutlineIcon className={s.icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align={'start'} className={s.dropdownContent} side={'top'}>
          <DropdownMenuGroup>
            <DropdownMenuItem className={s.item}>
              <Typography>Original</Typography>
              <ImageOutlineIcon className={s.icon} />
            </DropdownMenuItem>
            <DropdownMenuItem className={s.item}>
              <Typography>1:1</Typography>
              <SquareIcon className={s.rectangleIcon} />
            </DropdownMenuItem>
            <DropdownMenuItem className={s.item}>
              <Typography>4:5</Typography>
              <VerticalRectangleIcon className={s.rectangleIcon} />
            </DropdownMenuItem>
            <DropdownMenuItem className={s.item}>
              <Typography>16:9</Typography>
              <HorizontalRectangleIcon className={s.rectangleIcon} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
