import { z } from "zod";

export const validationResetPasswordFormRules = z
  .object({
     password: z
       .string({
         required_error:
           "Please enter your password",
       })
  });

