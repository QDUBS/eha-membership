"use client";

import { IPlanFormInputs } from "@/interfaces/beneficiary";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Error from "src/components/forms/Error";
import { AppRoutes } from "src/constants/app_routes";
// import type { RootState } from "src/redux/store/store";
import PlanType from "@/components/membership/PlanType";
import {
  internationalOptions,
  premiumOptions,
  standardOptions,
} from "@/db/dummyData";
import { saveMembershipPlan } from "@/redux/slices/membershipSignupSlice";
import { useEffect, useState } from "react";
import { planFormSchema } from "src/schemas/membership";

const Plan = () => {
  const [selectedPlans, setSelectedPlans] = useState<any>([]);
  const [options, setOptions] = useState<any>(standardOptions);
  const [opOneNumber, setOpOneNumber] = useState<string>("");
  const [opTwoNumber, setOpTwoNumber] = useState<string>("");
  const [opThreeNumber, setOpThreeNumber] = useState<string>("");
  const [beneficiariesCount, setBeneficiariesCount] = useState();
  const [showTotalDependencies, setShowTotalDependencies] =
    useState<boolean>(false);
  const [showNoOfBeneficiaries, setShowNoOfBeneficiaries] =
    useState<boolean>(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(planFormSchema),
  });

  const handleChangeOne = (event: any) => {
    const { value } = event.target;
    let newPlan = {
      name: options[0].name,
      price: options[0].price,
      quantity: value,
    };

    const existingPlanIndex = selectedPlans.findIndex(
      (plan: any) => plan.name === newPlan.name
    );
    if (existingPlanIndex !== -1) {
      const updatedSelectedPlans = [...selectedPlans];
      updatedSelectedPlans[existingPlanIndex].quantity = value;
      setSelectedPlans(updatedSelectedPlans);
    } else {
      // If the plan doesn't exist, add it to the selectedPlans array
      setSelectedPlans([...selectedPlans, newPlan]);
    }

    setOpOneNumber(value);
  };

  const handleChangeTwo = (event: any) => {
    const { value } = event.target;

    setOpTwoNumber(value);
    setSelectedPlans([
      ...selectedPlans,
      { name: options[1].name, price: options[1].price, quantity: value },
    ]);
    setValue(
      "planType",
      selectedPlans.map((plan: string) => plan)
    );
  };

  const handleChangeThree = (event: any) => {
    const { value } = event.target;
    setOpThreeNumber(value);
    setSelectedPlans([
      ...selectedPlans,
      { name: options[2].name, price: options[2].price, quantity: value },
    ]);
    setValue(
      "planType",
      selectedPlans.map((plan: string) => plan)
    );
  };

  const handlePlanChange = (event: any) => {
    const { value } = event.target;
    if (value == "standard") {
      setOptions(standardOptions);
    } else if (value == "premium") {
      setOptions(premiumOptions);
    } else {
      setOptions(internationalOptions);
    }
  };

  const handleCategoryChange = (event: any) => {
    const { value } = event.target;
    const ShowTotalDependencies = value === "corporate";
    const ShowNoOfBeneficiaries = value === "individual";

    if (value === "individual") {
      setValue("noOfBeneficiaries", 1);
    }

    setShowTotalDependencies(ShowTotalDependencies);
    setShowNoOfBeneficiaries(!ShowNoOfBeneficiaries);
  };

  const handleBeneficiariesChange = (event: any) => {
    const { value } = event.target;
    setBeneficiariesCount(value);
  };

  const handleDependenciesChange = (event: any) => {
    const { value } = event.target;
    const total = parseInt(value) + parseInt(beneficiariesCount!!);
    setValue("totalBeneficiariesDependants", total);
  };

  const onSubmit = (data: IPlanFormInputs) => {
    if (
      Number(opOneNumber) + Number(opTwoNumber) + Number(opThreeNumber) >
      data.noOfBeneficiaries + data.noOfDependants!!
    ) {
      alert(
        `Sorry you cannot select more than ${
          data.noOfBeneficiaries + data.noOfDependants!!
        } plan types.`
      );
    } else {
      dispatch(saveMembershipPlan(data));
      router.push(AppRoutes.Duration);
    }
  };

  useEffect(() => {
    setValue("planType", selectedPlans);
  }, [selectedPlans]);

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
          <div className="bg-white px-5 py-8 md:p-10 w-full h-screen md:max-w-[500px] lg:max-w-[550px] overflow-y-auto">
            <div className="flex flex-row items-center justify-center">
              <div className="flex justify-center items-center text-white w-10 h-10 lg:w-14 lg:h-14 bg-purplestrong rounded-full lg:text-xl">
                1
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-purplestrong w-10 h-10 border border-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                2
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-purplestrong w-10 h-10 border border-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                3
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-purplestrong w-10 h-10 border border-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                4
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-purplestrong w-10 h-10 border border-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                5
              </div>
            </div>

            {/* Form */}
            <div className="mt-5 md:mt-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                  <h2 className="text-lg md:text-xl lg:text-3xl">
                    Customize your plan
                  </h2>
                </div>

                <div className="flex flex-col gap-5 mt-8">
                  <div>
                    <p>Category</p>
                    <select
                      {...register("category")}
                      onChange={handleCategoryChange}
                      className="flex flex-row justify-between bg-[#F3F3F3] px-4 py-4 rounded-md w-full mt-3"
                    >
                      <option>Select category</option>
                      <option value="individual">Individual</option>
                      <option value="family">Family</option>
                      <option value="group">Group</option>
                      <option value="corporate">Corporate</option>
                    </select>
                    {errors.category && (
                      <Error message={errors.category.message} />
                    )}
                  </div>

                  <div>
                    <p>Plan</p>
                    <select
                      {...register("plan")}
                      onChange={handlePlanChange}
                      className="membership-select flex flex-row justify-between bg-[#F3F3F3] px-4 py-4 rounded-md w-full mt-3"
                    >
                      <option>Select plan</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="premium_international">
                        Premium International
                      </option>
                    </select>
                    {errors.plan && <Error message={errors.plan.message} />}
                  </div>

                  {showNoOfBeneficiaries && (
                    <div>
                      <p>No. of Beneficiaries</p>
                      <input
                        type="number"
                        placeholder="No. of Beneficiaries"
                        className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full placeholder:text-black"
                        {...register("noOfBeneficiaries")}
                        onChange={handleBeneficiariesChange}
                      />
                      {errors.noOfBeneficiaries && (
                        <Error message={errors.noOfBeneficiaries.message} />
                      )}
                    </div>
                  )}

                  {showTotalDependencies && (
                    <div>
                      <p>No. of Dependants</p>
                      <input
                        type="number"
                        placeholder="No. of Dependencies"
                        className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full placeholder:text-black"
                        {...register("noOfDependants")}
                        onChange={handleDependenciesChange}
                      />
                      {errors.noOfDependants && (
                        <Error message={errors.noOfDependants.message} />
                      )}
                    </div>
                  )}

                  {showTotalDependencies && (
                    <div>
                      <p>Total Beneficiaries & Dependants</p>
                      <input
                        type="text"
                        placeholder="Total Beneficiaries/Dependencies"
                        className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full placeholder:text-black"
                        {...register("totalBeneficiariesDependants")}
                        disabled
                      />
                      {errors.totalBeneficiariesDependants && (
                        <Error
                          message={
                            errors.totalBeneficiariesDependants.message
                          }
                        />
                      )}
                    </div>
                  )}

                  <div>
                    <p>Plan Type</p>
                    <div className="bg-[#F3F3F3] p-1 mt-2 rounded-md">
                      <PlanType
                        name={options[0]?.name}
                        price={options[0]?.price}
                        value={opOneNumber!!}
                        setValue={handleChangeOne}
                      />

                      <PlanType
                        name={options[1]?.name}
                        price={options[1]?.price}
                        value={opTwoNumber!!}
                        setValue={handleChangeTwo}
                      />

                      <PlanType
                        name={options[2]?.name}
                        price={options[2]?.price}
                        value={opThreeNumber!!}
                        setValue={handleChangeThree}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 mt-5">
                    <button
                      onClick={() => router.back()}
                      className="secondary-button w-1/3 text-center"
                    >
                      Back
                    </button>
                    <button className="primary-button w-2/3" type="submit">
                      Proceed
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Plan;
