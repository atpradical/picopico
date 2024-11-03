import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  EditOutlineIcon,
  MoreHorizontalIcon,
  TrashOutlineIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './EditPostDropdown.module.scss'

export const EditPostDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'icon'}>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align={'end'} className={s.dropdownContent}>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <EditOutlineIcon className={s.icon} />
              <Typography>Edit Post</Typography>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TrashOutlineIcon className={s.icon} />
              <Typography>Delete Post</Typography>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
