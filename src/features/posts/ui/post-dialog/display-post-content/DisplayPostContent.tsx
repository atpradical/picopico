import { PostActionsDropdown, PostDescription } from '@/features/posts/ui'
import { publicationsActions } from '@/features/publication/api'
import { PublicPostsItem } from '@/services/posts'
import { useAppDispatch, useIsAuthUserOnProfilePage, useTranslation } from '@/shared/hooks'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'
import { HiddenDialogComponents } from '@/shared/ui/components'
import {
  Avatar,
  Button,
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  Typography,
} from '@atpradical/picopico-ui-kit'
import * as Separator from '@radix-ui/react-separator'
import Image from 'next/image'

import s from './DisplayPostContent.module.scss'

type DisplayPostContentProps = {
  postData: PublicPostsItem
  setEditMode: () => void
}
export const DisplayPostContent = ({ postData, setEditMode }: DisplayPostContentProps) => {
  const { t } = useTranslation()
  const { removeRouterQueryParam } = usePagesRouterQueryUpdate()
  const dispatch = useAppDispatch()
  const postsImages = postData.images.map(el => el.url)

  const isAuthUserOnProfilePage = useIsAuthUserOnProfilePage()

  const closePostDialogHandler = () => {
    dispatch(publicationsActions.togglePostDisplayDialog({ isOpen: false, postId: 0 }))
    removeRouterQueryParam('postId')
  }

  return (
    <DialogContent
      className={s.dialogContent}
      onClose={closePostDialogHandler}
      overlayClassName={s.dialogOverlay}
    >
      <HiddenDialogComponents
        description={t.postDialog.accessibilityDescription}
        title={t.postDialog.accessibilityTitle}
      />
      <div className={s.gridContainer}>
        <Carousel className={s.carousel}>
          <CarouselContent>
            {postsImages.map((el, index) => {
              return (
                <CarouselItem className={s.carouselItem} key={el + index}>
                  <div style={{ height: '530px', position: 'relative', width: '100%' }}>
                    <Image alt={'post image'} fill sizes={'300px'} src={el} />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDotButtons />
        </Carousel>
        <DialogHeader className={s.dialogHeader}>
          <Avatar
            showUserName
            size={'xs'}
            src={postData.avatarOwner}
            userName={postData.userName}
          />
          <div className={s.actionButtonsContainer}>
            {isAuthUserOnProfilePage && (
              <PostActionsDropdown
                onDeleteConfirm={closePostDialogHandler}
                onEdit={setEditMode}
                postId={postData.id}
              />
            )}
            <DialogClose asChild>
              <Button
                className={s.closeButton}
                onClick={closePostDialogHandler}
                title={'close'}
                variant={'icon'}
              >
                <CloseOutlineIcon />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <DialogBody className={s.dialogBody}>
          <PostDescription postData={postData} />
          <Separator.Root className={s.dialogSeparator} />
          <Typography grey>Comments, likes, and other features coming soon...</Typography>
        </DialogBody>
      </div>
    </DialogContent>
  )
}
