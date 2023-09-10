import * as yup from "yup";

export const existingMembershipSchema = yup.object({
  category: yup.string(),
  name: yup.string().required("Please enter your existing membership name"),
  hpNumber: yup.string(),
  dateOfBirth: yup.date(),
});

export const planFormSchema = yup.object({
  category: yup.string().required("Category cannot be blank").label("category"),
  plan: yup.string().required("Plan cannot be blank").label("plan"),
  noOfBeneficiaries: yup
    .number()
    .required("Total beneficiaries cannot be blank")
    .label("total beneficiaries"),
  noOfDependants: yup.number().label("total dependencies"),
  totalBeneficiariesDependants: yup
    .number()
    .label("total beneficiaries dependencies"),
  planType: yup
    .array()
    .of(
      yup.object({
        name: yup.string(),
        price: yup.number(),
        quantity: yup.number(),
      })
    )
    .min(1, "Please select at least one plan type")
    .required("Please select at least one plan type"),
});

export const durationFormSchema = yup.object({
  recurrence: yup
    .string()
    .required("Recurrence cannot be blank")
    .label("recurrence"),
  startDate: yup
    .string()
    .required("Start Date cannot be blank")
    .label("startDate"),
  endDate: yup.string().required("End Date cannot be blank").label("endDate"),
});

export const personalFormSchema = yup.object({
  primaryHolderName: yup.string().required("Name is required"),
  primaryHolderEmail: yup.string().required("Email is required"),
  primaryHolderFirstname: yup.string().required("Firstname is required"),
  primaryHolderLastname: yup.string().required("Lastname is required"),
  primaryHolderMobile: yup.string().required("Mobile number is required"),
  primaryHolderBeneficiaryStatus: yup
    .string()
    .required("Beneficiary Status is required"),
});

export const beneficiaryFormSchema = yup.object({
  beneficiaries: yup.array().of(
    yup.object({
      firstName: yup
        .string()
        .required("Firstname name cannot be blank")
        .label("firstname"),
      lastName: yup
        .string()
        .required("Lastname cannot be blank")
        .label("lastname"),
      email: yup.string().email().required("Email cannot be blank"),
      mobile: yup
        .string()
        .required("Mobile number cannot be blank")
        .label("mobile number"),
      dateOfBirth: yup.date().required("Please provide your date of birth"),
    })
  ),
});

export const dependentFormSchema = yup.object({
  dependants: yup.array().of(
    yup.object({
      firstName: yup
        .string()
        .required("Firstname name cannot be blank")
        .label("firstname"),
      lastName: yup
        .string()
        .required("Lastname cannot be blank")
        .label("lastname"),
      email: yup.string().email().required("Email cannot be blank"),
      mobile: yup
        .string()
        .required("Mobile number cannot be blank")
        .label("mobile number"),
      dateOfBirth: yup.date().required("Please provide your date of birth"),
    })
  ),
});

export const updateMembershipSchema = yup.object({
  category: yup.string().required("Category cannot be blank").label("category"),
  plan: yup.string().required("Plan cannot be blank").label("plan"),
  noOfBeneficiaries: yup
    .number()
    .required("Total beneficiaries cannot be blank")
    .label("total beneficiaries"),
  noOfDependants: yup.number().label("total dependencies"),
  totalBeneficiariesDependants: yup
    .number()
    .label("total beneficiaries and dependants"),
  planType: yup
    .array()
    .of(
      yup.object({
        name: yup.string(),
        price: yup.number(),
        quantity: yup.number(),
      })
    )
    .min(1, "Please select at least one plan type")
    .required("Please select at least one plan type"),
  recurrence: yup
    .string()
    .required("Recurrence cannot be blank")
    .label("recurrence"),
  startDate: yup
    .string()
    .required("Start Date cannot be blank")
    .label("startDate"),
  endDate: yup.string().required("End Date cannot be blank").label("endDate"),
});
