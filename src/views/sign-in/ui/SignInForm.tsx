// import { useLoginMutation } from "@/shared/api/auth/auth.api";
import { Paths } from "@/shared/enums";
import { useTranslation } from "@/shared/hooks";
import { ControlledTextField } from "@/shared/ui/form-components/controlled-text-field";
import { Typography } from "@atpradical/picopico-ui-kit";
// import { useLoginValidation } from "@/views/sign-in/model/hooks/useLoginValidation";
import Link from "next/link";

// import { useRouter } from "next/router";
import s from "./SignIn.module.scss";

export const SignInForm = () => {
  const { t } = useTranslation();
  // todo: complete SignInForm
  // const { control, handleSubmit, isValid, setError } = useLoginValidation();
  const { forgotPassword, labels, placeholders } = t.signInPage.signInForm;

  // const [login] = useLoginMutation();
  // const router = useRouter();

  // const formHandler = handleSubmit(async (data) => {
  //   try {
  //     const resData = await login(data).unwrap();
  //
  //     if (resData) {
  //       const accessToken = resData.accessToken;
  //
  //       localStorage.setItem("accessToken", accessToken);
  //
  //       await router.push(Paths.home);
  //     }
  //   } catch (err: unknown) {
  //     const errors = fetchErrorMessageData(err);
  //
  //     if (typeof errors !== "string") {
  //       errors.forEach((el) => {
  //         setError(el.field, { message: el.message, type: "manual" });
  //       });
  //     } else {
  //       setError("password", { message: errors, type: "manual" });
  //     }
  //   }
  // });

  return (
    // <form className={s.form} onSubmit={formHandler}>
    <form className={s.form}>
      <ControlledTextField
        // control={control}
        label={labels.email}
        name={"email"}
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        // control={control}
        label={labels.password}
        name={"password"}
        placeholder={placeholders.addPassword}
        variant={"password"}
      />
      <Typography
        as={Link}
        className={s.passwordLink}
        grey
        href={Paths.forgotPassword}
      >
        {forgotPassword}
      </Typography>
      {/*<Button disabled={!isValid} fullWidth type={"submit"}>*/}
      {/*  {submitButton}*/}
      {/*</Button>*/}
    </form>
  );
};
