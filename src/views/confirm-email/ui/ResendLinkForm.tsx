import { useForm } from "react-hook-form";

import { useResendRegistrationEmailMutation } from "@/shared/api/auth/auth.api";
import { useTranslation } from "@/shared/hooks";
import { ControlledTextField } from "@/shared/ui/form-components/controlled-text-field";
import { getErrorMessageData } from "@/shared/utils/get-error-message-data";
import { ResendLinkFields } from "@/views/confirm-email/model/types";
import { Button } from "@atpradical/picopico-ui-kit";

import s from "./ResendLinkForm.module.scss";

// import { zodResolver } from "@hookform/resolvers/zod";

export const ResendLinkForm = () => {
  const { t } = useTranslation();

  const { button, label, placeholder } = t.confirmEmailPage.resendLinkForm;

  const { control, handleSubmit, setError } = useForm<ResendLinkFields>({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
    //todo: install zodResolver
    // resolver: zodResolver(resendRegistrationEmailSchemeCreator(t.validation)),
  });

  const [resendRegistrationEmail] = useResendRegistrationEmailMutation();

  const formHandler = handleSubmit(async (data) => {
    try {
      await resendRegistrationEmail(data).unwrap();
      //todo: add toaster from ui-kit
      // showToast({
      //   message: `${successMessage} ${data.email}`,
      // });
    } catch (e) {
      const errors = getErrorMessageData(e);

      if (typeof errors !== "string") {
        errors.forEach((el) => {
          setError(el.field as keyof ResendLinkFields, { message: el.message });
        });
      }
    }
  });

  return (
    <>
      <form className={s.form} onSubmit={formHandler}>
        <ControlledTextField
          control={control}
          label={label}
          name={"email"}
          placeholder={placeholder}
        />
        <Button type={"submit"}>{button}</Button>
      </form>
    </>
  );
};
