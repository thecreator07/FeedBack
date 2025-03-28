import { z } from 'zod';
import { usernameValidation } from './signUpSchema';

export const changeUsernameSchema = z.object({
  username: usernameValidation,
  email: z.string().min(1, { message: "Required" }).email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Required" }).min(6, { message: "Password should have a minimum length of 6" }),
});