import { useEffect, useState } from "react";

import { useConfirmEmailMutation } from "@/shared/api/auth/auth.api";
import { useTranslation } from "@/shared/hooks";
import { getLayout } from "@/shared/ui/layout";
import { Page } from "@/shared/ui/layout/page";
import { getErrorMessageData } from "@/shared/utils/get-error-message-data";
import { ConfirmedEmail } from "@/views/registration-confirmation/ui/ConfirmedEmail";
import { LinkExpired } from "@/views/registration-confirmation/ui/LinkExpired";
import { toaster } from "@atpradical/picopico-ui-kit";
import { useRouter } from "next/router";

import s from "./RegistrationConfirmationPage.module.scss";

function RegistrationConfirmationPage() {
  const { t } = useTranslation();
  const { emailConfirmed, linkExpired } = t.confirmEmailPage;

  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [confirmEmail, { isSuccess }] = useConfirmEmailMutation();

  const router = useRouter();
  const code = Array.isArray(router.query.code)
    ? router.query.code[0]
    : router.query.code;

  useEffect(() => {
    if (code) {
      confirmEmail({ confirmationCode: code })
        .unwrap()
        .catch((e) => {
          const errors = getErrorMessageData(e);

          if (typeof errors !== "string") {
            // todo: вынести в отдельную функцию и переиспользовать в других местах обработки ошибок.
            errors.forEach((el) => {
              toaster({
                text: el.message,
                variant: "error",
              });
            });
          }
        })
        .finally(() => setIsRequestCompleted(true));
    }
  }, [confirmEmail, code]);

  if (!isRequestCompleted) {
    return null;
  }

  return (
    <Page mt={"36px"}>
      <div className={s.container}>
        {isSuccess ? (
          <ConfirmedEmail t={emailConfirmed} />
        ) : (
          <LinkExpired t={linkExpired} />
        )}
      </div>
    </Page>
  );
}

RegistrationConfirmationPage.getLayout = getLayout;
export default RegistrationConfirmationPage;
