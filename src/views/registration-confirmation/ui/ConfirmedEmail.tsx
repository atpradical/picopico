import { LocaleEmailConfirmed } from "@/locales/en";
import { Paths } from "@/shared/enums";
import {
  Button,
  SignUpConfirmedIllustration,
  Typography,
} from "@atpradical/picopico-ui-kit";
import link from "next/link";

import s from "@/views/registration-confirmation/ui/RegistrationConfirmationPage.module.scss";

type ConfirmEmailProps = {
  t: LocaleEmailConfirmed;
};
export const ConfirmedEmail = ({ t }: ConfirmEmailProps) => {
  const { caption, signInButton, title } = t;

  return (
    <>
      <Typography as={"h1"} className={s.title} variant={"h1"}>
        {title}
      </Typography>
      <Typography className={s.caption} variant={"regular_16"}>
        {caption}
      </Typography>
      <Button as={link} className={s.button} href={Paths.logIn}>
        {signInButton}
      </Button>
      <SignUpConfirmedIllustration className={s.image} />
    </>
  );
};
