import { useForm } from "react-hook-form";

import { LocaleValidation } from "@/locales/en";
import { useTranslation } from "@/shared/hooks";
import { emailScheme, passwordScheme } from "@/shared/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//todo: complete useLoginValidation
export const useLoginValidation = () => {
  const { t } = useTranslation();
  const signInSchemeCreator = (t: LocaleValidation) => {
    return z.object({
      email: emailScheme(t.email),
      password: passwordScheme(t.password),
    });
  };

  type SignInFields = z.infer<ReturnType<typeof signInSchemeCreator>>;
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<SignInFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(signInSchemeCreator(t.validation)),
  });

  return {
    control,
    handleSubmit,
    isValid,
    setError,
  };
};
