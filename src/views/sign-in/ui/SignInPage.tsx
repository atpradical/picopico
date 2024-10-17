import { Paths } from "@/shared/enums";
import { useTranslation } from "@/shared/hooks/useTranslations";
import { getLayout } from "@/shared/ui/layout";
import { Page } from "@/shared/ui/layout/page";
import { SignInForm } from "@/views/sign-in/ui/SignInForm";
import { OAuthIcons } from "@/views/sign-in/ui/oAuthIcons/OAuthIcons";
import { Button, Card, Typography } from "@atpradical/picopico-ui-kit";
import Link from "next/link";

import s from "./SignIn.module.scss";

function SignInPage() {
  const { t } = useTranslation();
  const { accountExistsQuestion, linkToSignUp, pageTitle } = t.signInPage;

  return (
    <Page className={s.container} mt={36}>
      <Card className={s.card}>
        <Typography as={"h1"} variant={"h1"}>
          {pageTitle}
        </Typography>
        <OAuthIcons />
        <SignInForm />
        <Typography className={s.paragraph} variant={"regular_16"}>
          {accountExistsQuestion}
        </Typography>
        <Button as={Link} href={Paths.signUp} variant={"link"}>
          {linkToSignUp}
        </Button>
      </Card>
    </Page>
  );
}

SignInPage.getLayout = getLayout;
export default SignInPage;
