import { z } from "zod";

export const validationForgetPasswordFormRules = z
  .object({
    email: z
      .string({ required_error: "Please Enter your Email address" })
      .email({ message: "Please enter a valid Email" })
      .trim(),
  });

