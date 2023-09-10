export interface IMembershipPlanState {
  category: string;
  plan: string;
  noOfBeneficiaries: number;
  noOfDependencies?: number;
  totalBeneficiariesDependencies?: number;
  planType: any;
}

export interface IMembershipDurationState {
  recurrence: string;
  startDate: string;
  endDate: string;
}

export interface IMembershipPersonalState {
  primaryHolderName?: string;
  primaryHolderEmail?: string;
  primaryHolderFirstname?: string;
  primaryHolderLastname?: string;
  primaryHolderMobile?: string;
  primaryHolderDOB?: Date;
  primaryHolderBeneficiaryStatus?: string;
}

export interface IMembershipBeneficiaryState {
  beneficiaries: any;
}

export interface IMembershipDependenciesState {
  dependencies: any;
}
