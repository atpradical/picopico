import { Paths } from "@/shared/enums";
import { useTranslation } from "@/shared/hooks";
import { getLayout } from "@/shared/ui/layout";
import { Page } from "@/shared/ui/layout/page";
import {
  Button,
  TimeManagementIllustration,
  Typography,
} from "@atpradical/picopico-ui-kit";
import Link from "next/link";

import styles from "./PasswordRecoveryPage.module.scss";

export default function PasswordRecoveryPage() {
  const { t } = useTranslation();
  const { pageButton, pageTitle, textContent } =
    t.passwordRecoveryPage.passwordRecoveryPage;

  return (
    <Page mt={"35px"}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography as={"h1"} variant={"h1"}>
            {pageTitle}
          </Typography>
          <Typography className={styles.textContent} variant={"regular_16"}>
            {textContent}
          </Typography>
          <Button as={Link} href={Paths.forgotPassword}>
            {pageButton}
          </Button>
        </div>
        <TimeManagementIllustration />
      </div>
    </Page>
  );
}

PasswordRecoveryPage.getLayout = getLayout;
