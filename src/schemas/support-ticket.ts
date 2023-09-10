import * as yup from "yup";

export const supportTicketSchema = yup.object({
  issue: yup
    .string()
    .required(),
  subject: yup.string().required("Please enter subject"),
  message: yup.string().required("Please enter message"),
});
