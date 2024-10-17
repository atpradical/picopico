import { useLogoutMutation } from "@/shared/api/auth/auth.api";
import { Paths } from "@/shared/enums";
import { useTranslation } from "@/shared/hooks";
import { getErrorMessageData } from "@/shared/utils/get-error-message-data";
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Typography,
  toaster,
} from "@atpradical/picopico-ui-kit";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/router";

import s from "./LogoutConfirmation.module.scss";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

//todo: change to correct component
export function LogoutConfirmation({ isOpen, onOpenChange }: Props) {
  const [logout, { isLoading }] = useLogoutMutation();
  const {
    t: {
      confirmLogoutPage: {
        accessibilityDescription,
        accessibilityTitle,
        confirmButton,
        confirmationMessage,
        rejectButton,
      },
    },
  } = useTranslation();
  const router = useRouter();

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        // todo: Также будет зачищаться localstorage

        router.push(Paths.logIn);
      })
      .catch((e) => {
        const error = getErrorMessageData(e);

        if (typeof error !== "string") {
          error.forEach((el) => {
            toaster({ text: el.message, variant: "error" });
          });
        } else {
          toaster({ text: error, variant: "error" });
        }
      })
      .finally(() => {
        closeHandler();
      });
  };

  const closeHandler = () => {
    onOpenChange(false);
  };

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content}>
        <VisuallyHidden asChild>
          <DialogTitle>{accessibilityTitle}</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>{accessibilityDescription}</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={s.header}>
          <Typography as={"h3"} variant={"h3"}>
            {confirmationMessage}
          </Typography>
          <Typography>___email name___?</Typography>
        </DialogHeader>
        <DialogFooter className={s.footer}>
          <Button
            className={s.button}
            disabled={isLoading}
            onClick={logoutHandler}
            variant={"primary"}
          >
            {confirmButton}
          </Button>
          <Button
            className={s.button}
            onClick={closeHandler}
            variant={"outlined"}
          >
            {rejectButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
