import { z } from "zod";

export const forgetPasswordSchema = z
  .object({
    code: z
      .string()
      .min(1, { message: "Required" })
      .length(6, "Code must be 6 characters long"),
    password1: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password should have minimum length of 6" }),
    password2: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password should have minimum length of 6" }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password should have minimum length of 6" }),
    password1: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password should have minimum length of 6" }),
    password2: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password should have minimum length of 6" }),
  })
  .refine((data) => data.password !== data.password1, {
    message: "New Password can't be the same as Old Password",
    path: ["password1"],
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });