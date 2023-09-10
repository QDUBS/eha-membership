export interface IExistingMembershipFormInputs {
  category: string;
  name: string;
  hpNumber?: string;
  dateOfBirth?: Date;
}

export interface IPlanFormInputs {
  category: string;
  plan: string;
  noOfBeneficiaries: number;
  noOfDependants?: number;
  totalBeneficiariesDependants?: number;
  planType: any;
}

export interface IDurationFormInputs {
  recurrence: string;
  startDate: string;
  endDate: string;
}

export interface IPersonalFormInputs {
  primaryHolderName: string;
  primaryHolderEmail: string;
  primaryHolderFirstname: string;
  primaryHolderLastname: string;
  primaryHolderMobile: string
  primaryHolderBeneficiaryStatus: string;
}

export interface IBeneficiaryFormInputs {
  beneficiaries: any;
}

export interface IDependenciesFormInputs {
  dependants: any;
}