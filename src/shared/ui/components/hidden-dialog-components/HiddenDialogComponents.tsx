import { DialogDescription, DialogTitle } from '@atpradical/picopico-ui-kit'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type Props = {
  description: string
  title: string
}
export const HiddenDialogComponents = ({ description, title }: Props) => {
  return (
    <>
      <VisuallyHidden asChild>
        <DialogTitle>{title}</DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <DialogDescription>{description}</DialogDescription>
      </VisuallyHidden>
    </>
  )
}
