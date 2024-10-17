import { z } from "zod";

import { forgotPasswordSchemeCreator } from "./forgot-password-scheme-creator";

export type ForgotPasswordFields = z.infer<
  ReturnType<typeof forgotPasswordSchemeCreator>
>;
