import { useState } from 'react'

import { useDeletePostMutation } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { AlertDialog } from '@/shared/ui/components'
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
  onEdit: () => void
  postId: number
}

export const PostActionsDropdown = ({ onConfirm, onEdit, postId }: EditPostDropdownProps) => {
  const { t } = useTranslation()
  const [isDeleteAlertDialog, setIsDeleteAlertDialog] = useState(false)
  const [deletePost] = useDeletePostMutation()

  const onDeleteOptionHandler = () => {
    setIsDeleteAlertDialog(true)
  }

  const deletePostHandler = async () => {
    try {
      await deletePost({ postId }).unwrap()
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
              <DropdownMenuItem onClick={onEdit}>
                <EditOutlineIcon className={s.icon} />
                <Typography>{t.postDialog.actionsDropdown.editPostButton}</Typography>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDeleteOptionHandler}>
                <TrashOutlineIcon className={s.icon} />
                <Typography>{t.postDialog.actionsDropdown.deletePostButton}</Typography>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <AlertDialog
        isOpen={isDeleteAlertDialog}
        onConfirm={deletePostHandler}
        onOpenChange={setIsDeleteAlertDialog}
        t={t.postDialog.alertDeleteDialog}
      />
    </>
  )
}
