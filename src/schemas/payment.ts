import * as yup from "yup";

export const paymentFormSchema = yup.object({
  card_holder: yup.string().required(),
  card_number: yup.string().required(),
  expiration: yup.string().required(),
  cvc: yup.number().required(),
});
