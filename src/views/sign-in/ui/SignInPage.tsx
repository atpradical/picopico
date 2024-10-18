import { Paths } from "@/shared/enums";
import { useTranslation } from "@/shared/hooks/useTranslations";
import { getLayout } from "@/shared/ui/layout";
import { Page } from "@/shared/ui/layout/page";
import { OAuthIcons } from "@/views/sign-in/ui/oAuthIcons/OAuthIcons";
import { Button, Card, Typography } from "@atpradical/picopico-ui-kit";
import { SignInForm } from "./SignInForm";
import Link from "next/link";

import s from "./SignIn.module.scss";

function SignInPage() {
  const { t } = useTranslation();
  const { signUpLink, isAccount, pageTitle } = t.signInPage;

  return (
    <Page className={s.container} mt={"36px"}>
      <Card className={s.card}>
        <Typography as={"h1"} variant={"h1"}>
          {pageTitle}
        </Typography>
        <OAuthIcons />
        <SignInForm />
        <Typography variant={"regular_16"}>{isAccount}</Typography>
        <Button as={Link} href={Paths.signUp} variant={"nb-outlined"}>
          {signUpLink}
        </Button>
      </Card>
    </Page>
  );
}

SignInPage.getLayout = getLayout;
export default SignInPage;
