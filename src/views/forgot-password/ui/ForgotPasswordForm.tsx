import { useState } from "react";
import { useForm } from "react-hook-form";

import { Paths } from "@/shared/enums";
import { useTranslation } from "@/shared/hooks";
import { ControlledTextField } from "@/shared/ui/form-components/controlled-text-field";
import { forgotPasswordSchemeCreator } from "@/views/forgot-password/model/forgot-password-scheme-creator";
import { Button, Typography } from "@atpradical/picopico-ui-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import s from "./ForgotPasswordForm.module.scss";

import { ForgotPasswordFields } from "../model/types";

interface ForgotPasswordFormProps {
  setIsModal: (value: boolean) => void;
}

export const ForgotPasswordForm = ({ setIsModal }: ForgotPasswordFormProps) => {
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);
  const { t } = useTranslation();
  const { formButton, formContent, pageLink, sentLinkText } =
    t.passwordRecoveryPage.forgotPasswordPage;
  // const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string;
  const {
    control,
    formState: { isValid },
    handleSubmit,
    // setValue,
    // trigger,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: "",
      tokenRecaptcha: "",
    },
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchemeCreator(t.validation)),
  });
  const formHandler = handleSubmit((data: ForgotPasswordFields) => {
    console.log(data);
    setIsModal(true);
    setIsMessageSent(true);
  });

  // const handleTokenChange = (token: null | string) => {
  //   setValue("tokenRecaptcha", token!);
  //   trigger();
  // };

  return (
    <form className={s.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={"Email"}
        name={"email"}
        placeholder={"Epam@epam.com"}
      />
      {/* todo :Если email не зарегистрирован : User with this email doesn't exist */}
      <Typography className={s.text} variant={"regular_14"}>
        {formContent}
      </Typography>
      {isMessageSent && (
        <Typography className={s.sentMessage} variant={"regular_14"}>
          {sentLinkText}
        </Typography>
      )}
      <Button disabled={!isValid} type={"submit"}>
        {formButton}
      </Button>
      <Button
        as={Link}
        className={s.button}
        href={Paths.logIn}
        variant={"link"}
      >
        {pageLink}
        {/*  todo: add recaptcha */}
      </Button>
      {/*<Recaptcha*/}
      {/*  hl={"en"}*/}
      {/*  onChange={handleTokenChange}*/}
      {/*  sitekey={sitekey}*/}
      {/*  theme={"dark"}*/}
      {/*/>*/}
    </form>
  );
};
