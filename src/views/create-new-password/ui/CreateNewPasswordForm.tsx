import { useForm } from "react-hook-form";

import { Paths } from "@/shared/enums";
import { useTranslation } from "@/shared/hooks";
import { ControlledTextField } from "@/shared/ui/form-components/controlled-text-field";
import { Button, Typography } from "@atpradical/picopico-ui-kit";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

import styles from "./CreateNewPasswordForm.module.scss";

import { CreatePWDFields } from "../model/types";

export const CreateNewPasswordForm = () => {
  const { t } = useTranslation();
  const {
    formButton,
    labelConfirmPassword,
    labelPassword,
    passwordHelp,
    placeholderConfirmPassword,
    placeholderPassword,
  } = t.passwordRecoveryPage.createNewPassword;
  const router = useRouter();

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<CreatePWDFields>({
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onSubmit",
    //todo: install zodResolver
    // resolver: zodResolver(createNewPasswordSchemeCreator(t.validation)),
  });

  const formHandler = handleSubmit((data) => {
    if (isValid) {
      console.log(data);
      reset();
      router.push(Paths.logIn);
    }
  });

  return (
    <form className={styles.container} onSubmit={formHandler}>
      <div className={styles.fieldsContainer}>
        <ControlledTextField
          control={control}
          label={labelPassword}
          name={"password"}
          placeholder={placeholderPassword}
          variant={"password"}
        />
        <ControlledTextField
          control={control}
          label={labelConfirmPassword}
          name={"confirmPassword"}
          placeholder={placeholderConfirmPassword}
          variant={"password"}
        />
      </div>
      <Typography className={styles.text} variant={"regular_14"}>
        {passwordHelp}
      </Typography>
      <Button type={"submit"}>{formButton}</Button>
    </form>
  );
};
