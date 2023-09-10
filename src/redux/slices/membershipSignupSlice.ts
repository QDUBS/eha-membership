import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMembershipBeneficiaryState, IMembershipDependenciesState, IMembershipDurationState, IMembershipPersonalState, IMembershipPlanState } from "@/interfaces/beneficiaryState";

export interface MembershipSignupState {
  membershipPlan: IMembershipPlanState;
  membershipDuration: IMembershipDurationState;
  membershipPersonal: IMembershipPersonalState;
  membershipBeneficiaries: IMembershipBeneficiaryState;
  membershipDependencies: IMembershipDependenciesState;
}

const initialState: MembershipSignupState = {
  membershipPlan: { category: "", plan: "", noOfBeneficiaries: 0, noOfDependencies: 0, totalBeneficiariesDependencies: 0, planType: [] },
  membershipDuration: { recurrence: "", startDate: "", endDate: "" },
  membershipPersonal: { primaryHolderName: "", primaryHolderEmail: "", primaryHolderFirstname: "", primaryHolderLastname: "", primaryHolderMobile: "", primaryHolderBeneficiaryStatus: "" },
  membershipBeneficiaries: { beneficiaries: [] },
  membershipDependencies: { dependencies: [] }
};

export const membershipSignupSlice: any = createSlice({
  name: "membership-information",
  initialState,
  reducers: {
    saveMembershipPlan: (state, action: PayloadAction<IMembershipPlanState>) => {
      state.membershipPlan.category = action.payload.category
      state.membershipPlan.plan = action.payload.plan
      state.membershipPlan.noOfBeneficiaries = action.payload.noOfBeneficiaries
      state.membershipPlan.noOfDependencies = action.payload.noOfDependencies
      state.membershipPlan.totalBeneficiariesDependencies = action.payload.totalBeneficiariesDependencies
      state.membershipPlan.planType = action.payload.planType
    },
    saveMembershipDuration: (state, action: PayloadAction<IMembershipDurationState>) => {
      state.membershipDuration.recurrence = action.payload.recurrence
      state.membershipDuration.startDate = action.payload.startDate
      state.membershipDuration.endDate = action.payload.endDate
    },
    saveMembershipPersonal: (state, action: PayloadAction<IMembershipPersonalState>) => {
      state.membershipPersonal.primaryHolderName = action.payload.primaryHolderName
      state.membershipPersonal.primaryHolderEmail = action.payload.primaryHolderEmail
      state.membershipPersonal.primaryHolderFirstname = action.payload.primaryHolderFirstname
      state.membershipPersonal.primaryHolderLastname = action.payload.primaryHolderLastname
      state.membershipPersonal.primaryHolderMobile = action.payload.primaryHolderMobile
      state.membershipPersonal.primaryHolderBeneficiaryStatus = action.payload.primaryHolderBeneficiaryStatus
    },
    saveMembershipBeneficiaries: (state, action: PayloadAction<IMembershipBeneficiaryState>) => {
      state.membershipBeneficiaries.beneficiaries = action.payload.beneficiaries
    },
    saveMembershipDependencies: (state, action: PayloadAction<IMembershipDependenciesState>) => {
      state.membershipDependencies.dependencies = action.payload.dependencies
    },
  },
});

export const {
  saveMembershipPlan,
  saveMembershipDuration,
  saveMembershipPersonal,
  saveMembershipBeneficiaries,
  saveMembershipDependencies,
} = membershipSignupSlice.actions;

export default membershipSignupSlice.reducer;
