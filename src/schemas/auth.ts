import * as yup from "yup";

export const signupFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

export const loginFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
