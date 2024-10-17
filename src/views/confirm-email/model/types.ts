import { resendRegistrationEmailSchemeCreator } from "@/views/confirm-email/model/resend-registration-email-scheme-creator";
import { z } from "zod";

export type ResendLinkFields = z.infer<
  ReturnType<typeof resendRegistrationEmailSchemeCreator>
>;
