import { useState } from "react";

import { useTranslation } from "@/shared/hooks";
import { getLayout } from "@/shared/ui/layout";
import { Page } from "@/shared/ui/layout/page";
import { ForgotPasswordForm } from "@/views/forgot-password/ui/ForgotPasswordForm";
import { Card, Typography } from "@atpradical/picopico-ui-kit";

import styles from "./ForgotPasswordPage.module.scss";

import { ForgotPasswordModal } from "./ForgotPasswordModal";

export default function ForgotPasswordPage() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const { pageTitle } = t.passwordRecoveryPage.forgotPasswordPage;

  return (
    <Page mt={"72px"}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <ForgotPasswordModal isOpen={isModal} setIsModal={setIsModal} />
          <Typography as={"h1"} variant={"h1"}>
            {pageTitle}
          </Typography>
          <ForgotPasswordForm setIsModal={setIsModal} />
        </Card>
      </div>
    </Page>
  );
}

ForgotPasswordPage.getLayout = getLayout;
