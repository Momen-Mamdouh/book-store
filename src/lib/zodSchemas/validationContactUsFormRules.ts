import { z } from "zod";

export const ContactUsRules = z
  .object({
    full_name: z
      .string({ required_error: "Please enter your full name" }),

    subject: z
      .string({ required_error: "Please Select one of the subjects" }),

    message: z
      .string({ required_error: "Please enter your comment" }),
  });

