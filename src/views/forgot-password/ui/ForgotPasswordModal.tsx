import { useTranslation } from "@/shared/hooks";
import {
  Button,
  CloseOutlineIcon,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Typography,
} from "@atpradical/picopico-ui-kit";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import styles from "./ForgotPasswordModal.module.scss";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  setIsModal: (value: boolean) => void;
};

export const ForgotPasswordModal = ({
  isOpen,
  setIsModal,
}: ForgotPasswordModalProps) => {
  const { t } = useTranslation();
  const { modalText, modalTitle } =
    t.passwordRecoveryPage.forgotPasswordModalPage;

  const handleModalPage = () => {
    setIsModal(false);
  };

  return (
    <DialogRoot onOpenChange={setIsModal} open={isOpen}>
      <DialogContent
        className={styles.container}
        overlayClassName={styles.overlay}
      >
        <VisuallyHidden asChild>
          <DialogTitle>{modalTitle}</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>{modalText}</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={styles.header}>
          <Typography as={"h1"} variant={"h1"}>
            {modalTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={"close"} variant={"icon"}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Typography variant={"regular_16"}>{modalText}</Typography>
        </DialogBody>
        <DialogFooter className={styles.buttonContainer}>
          <Button onClick={handleModalPage}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
