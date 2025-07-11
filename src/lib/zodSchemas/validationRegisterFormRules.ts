import { z } from "zod";

export const RegisterFormRules = z
  .object({
    email: z
      .string({ required_error: "Please Enter your Email address" })
      .email({ message: "Please enter a valid Email" })
      .trim(),

    password: z
      .string({
        required_error:
          "Please enter your password between 5 to 16 chars with one capital, number, special char",
      })
      .min(5, { message: "Password at least be 5 Characters." })
      .max(16, { message: "Password can't exceed 16 Characters." })
      .regex(/[A-Z]/, {
        message: "Password must have at least one capital Letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must have at least 1 Number.",
      })
      .regex(/\W/, {
        message: "Password must have at least one special Character.",
      })
      .refine((val) => (val.match(/[a-z]/g) || []).length >= 8, {
        message: "Password must contain at least 8 lowercase letters.",
      }),

    password_confirmation: z
      .string({ required_error: "Re-Password is required." }),

    phone: z
      .string({ required_error: "Please enter your number without country code" })
      .min(11, { message: "Phone number must be exactly 11 digits" })
      .max(11, { message: "Phone number must be exactly 11 digits" })
      .regex(/^\d{11}$/, {
        message: "Phone number must contain only digits",
      })
      .regex(/^(01)(0|1|2|5)/, {
        message: `Phone must start with 01 followed by 0, 1, 2, or 5 (Vodafone, Etisalat, Orange, We)`,
      }),

    name: z
      .string({ required_error: "Please enter a username at least 2 letters" })
      .min(2, { message: "Username must be at least 2 letters" }),
  });

