import { useState } from 'react'

import { useDeletePostMutation } from '@/services/posts'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
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

import s from './PostActionsDropdown.module.scss'

type EditPostDropdownProps = {
  onConfirm: () => void
  postId: number
}

export const PostActionsDropdown = ({ onConfirm, postId }: EditPostDropdownProps) => {
  const [isDeleteAlertDialog, setIsDeleteAlertDialog] = useState(false)
  const [deletePost] = useDeletePostMutation()

  const onDeleteOptionHandler = () => {
    setIsDeleteAlertDialog(true)
  }

  const deletePostHandler = async () => {
    try {
      deletePost({ postId }).unwrap()
      onConfirm()
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    } finally {
      setIsDeleteAlertDialog(false)
    }
  }

  return (
    <>
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
              <DropdownMenuItem onClick={onDeleteOptionHandler}>
                <TrashOutlineIcon className={s.icon} />
                <Typography>Delete Post</Typography>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <ActionConfirmDialog
        accessibilityDescription={'accessibilityDescription'}
        accessibilityTitle={'accessibilityTitle'}
        confirmButtonText={'saveButtonText'}
        isOpen={isDeleteAlertDialog}
        message={'visibleBodyText'}
        onConfirm={deletePostHandler}
        onOpenChange={setIsDeleteAlertDialog}
        rejectButtonText={'discardButtonText'}
        title={'title'}
      />
    </>
  )
}
