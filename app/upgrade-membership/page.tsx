"use client";

import Layout from "@/components/dashboard/Layout";
import PaymentCard from "@/components/dashboard/PaymentCard";
import PlanType from "@/components/membership/PlanType";
import { AppRoutes } from "@/constants/app_routes";
import {
  internationalOptions,
  premiumOptions,
  standardOptions,
} from "@/db/dummyData";
import { IPlanFormInputs } from "@/interfaces/beneficiary";
import { saveMembershipPlan } from "@/redux/slices/membershipSignupSlice";
import { updateMembershipSchema } from "@/schemas/membership";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import moment from "moment";
import AddPayment from "@/components/modals/dashboard/AddPayment";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState<any>([]);
  const [options, setOptions] = useState<any>(standardOptions);
  const [opOneNumber, setOpOneNumber] = useState<string>("");
  const [opTwoNumber, setOpTwoNumber] = useState<string>("");
  const [opThreeNumber, setOpThreeNumber] = useState<string>("");
  const [beneficiariesCount, setBeneficiariesCount] = useState();
  const [showTotalDependencies, setShowTotalDependencies] =
    useState<boolean>(false);
  const [recurrentPlan, setRecurrentPlan] = useState("monthly");
  const [newStartDate, setNewStartDate] = useState();
  const [total, setTotal] = useState();
  const [planEndDate, setPlanEndDate] = useState<Date>();
  const [planRecurrence, setPlanRecurrence] = useState("month");
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateMembershipSchema),
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
    setShowTotalDependencies(ShowTotalDependencies);
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

  const handleRecurrenceChange = (event: any) => {
    const { value } = event.target;
    setRecurrentPlan(value);

    if (value === "monthly") {
      setPlanRecurrence("month");
    } else if (value === "biannual") {
      setPlanRecurrence("six months");
    } else if (value === "yearly") {
      setPlanRecurrence("year");
    }

    if (newStartDate) {
      let endDate: Date;
      const startDateObj = new Date(newStartDate);

      if (value === "monthly") {
        // Set the end date to be one month after the start date
        endDate = new Date(
          startDateObj.getFullYear(),
          startDateObj.getMonth() + 1,
          startDateObj.getDate()
        );
      } else if (value === "biannual") {
        // Set the end date to be six months after the start date
        endDate = new Date(
          startDateObj.getFullYear(),
          startDateObj.getMonth() + 6,
          startDateObj.getDate()
        );
      } else if (value === "yearly") {
        // Set the end date to be one year after the start date
        endDate = new Date(
          startDateObj.getFullYear() + 1,
          startDateObj.getMonth(),
          startDateObj.getDate()
        );
      } else {
        // Handle invalid recurrence value
        console.error("Invalid recurrence value:", value);
        return;
      }

      setPlanEndDate(endDate);
      setValue("endDate", endDate.toISOString().split("T")[0]);
    }
  };

  const handleStartDateChange = (event: any) => {
    const { value } = event.target;
    let endDate: Date;
    const startDateObj = new Date(value);
    setNewStartDate(value);

    if (recurrentPlan === "monthly") {
      // Set the end date to be one month after the start date
      endDate = new Date(
        startDateObj.getFullYear(),
        startDateObj.getMonth() + 1,
        startDateObj.getDate()
      );
    } else if (recurrentPlan === "biannual") {
      // Set the end date to be six months after the start date
      endDate = new Date(
        startDateObj.getFullYear(),
        startDateObj.getMonth() + 6,
        startDateObj.getDate()
      );
    } else if (recurrentPlan === "yearly") {
      // Set the end date to be one year after the start date
      endDate = new Date(
        startDateObj.getFullYear() + 1,
        startDateObj.getMonth(),
        startDateObj.getDate()
      );
    } else {
      // Handle invalid recurrence value
      console.error("Invalid recurrence value:", recurrentPlan);
      return;
    }

    setPlanEndDate(endDate);
    setValue("endDate", endDate.toISOString().split("T")[0]);
  };

  const onSubmit = (data: IPlanFormInputs) => {
    if (
      parseInt(opOneNumber + opTwoNumber + opThreeNumber) >
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
    console.log("Selected Plans:", selectedPlans);
    setValue("planType", selectedPlans);
  }, [selectedPlans]);

  return (
    <>
      <section className="h-full flex flex-col justify-between">
        <section>
          <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
            <p className="pt-0 font-semibold text-2xl lg:text-2xl">
              Upgrade Membership Plan
            </p>
          </div>

          <div className="w-full flex flex-row p-8">
            {/* Form */}
            <div className="w-1/2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-lg md:text-xl lg:text-xl font-semibold">
                  Customize plan
                </p>

                <div className="flex flex-col gap-5 rounded-md mt-5 px-4 py-8 border-gray">
                  <div className="flex flex-row">
                    <div className="w-full">
                      <p>Category</p>
                      <select
                        {...register("category")}
                        onChange={handleCategoryChange}
                        className="membership-upgrade flex flex-row justify-between px-4 py-3 rounded-md w-full mt-3"
                        id="plan-type-input"
                      >
                        <option></option>
                        <option value="individual">Individual</option>
                        <option value="family">Family</option>
                        <option value="group">Group</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </div>

                    <div className="w-full ml-4">
                      <p>Plan</p>
                      <select
                        {...register("plan")}
                        onChange={handlePlanChange}
                        className="membership-upgrade flex flex-row justify-between px-4 py-3 rounded-md w-full mt-3"
                        id="plan-type-input"
                      >
                        <option></option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="premium_international">
                          Premium International
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <p>No. of Beneficiaries</p>
                    <input
                      type="number"
                      placeholder=""
                      className="membership-upgrade mt-2 px-4 py-3 rounded-md w-full placeholder-black"
                      id="plan-type-input"
                      {...register("noOfBeneficiaries")}
                      onChange={handleBeneficiariesChange}
                    />
                  </div>

                  <div className="flex flex-row">
                    {showTotalDependencies && (
                      <div className="w-full">
                        <p>No. of Dependencies</p>
                        <input
                          type="number"
                          placeholder=""
                          className="membership-upgrade mt-2 px-4 py-3 rounded-md w-full placeholder-black"
                          id="plan-type-input"
                          {...register("noOfDependants")}
                          onChange={handleDependenciesChange}
                        />
                      </div>
                    )}

                    {showTotalDependencies && (
                      <div className="w-full ml-4">
                        <p>Total Beneficiaries/Dependencies</p>
                        <input
                          type="text"
                          placeholder=""
                          className="membership-upgrade mt-2 px-4 py-3 rounded-md w-full placeholder-black"
                          id="plan-type-input"
                          {...register("totalBeneficiariesDependants")}
                          disabled
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <p>Plan Type</p>
                    <div className="membership-upgrade p-1 mt-2 rounded-md">
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

                  <div>
                    <p>Recurrence</p>
                    <select
                      {...register("recurrence")}
                      onChange={handleRecurrenceChange}
                      className="membership-upgrade flex flex-row justify-between px-4 py-3 rounded-md w-full mt-3"
                      id="plan-type-input"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="biannual">Bi-annual</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div className="flex flex-row">
                    <div className="w-full">
                      <p>Start Date</p>
                      <input
                        type="date"
                        placeholder="Start date"
                        className="membership-upgrade mt-2 px-4 py-3 rounded-md w-full"
                        {...register("startDate")}
                        onChange={handleStartDateChange}
                      />
                    </div>

                    <div className="w-full ml-4">
                      <p>End Date</p>
                      <input
                        type="date"
                        placeholder="End date"
                        className="membership-upgrade mt-2 px-4 py-3 rounded-md w-full"
                        {...register("endDate")}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Payment */}
            <div className="w-1/2 ml-10">
              <p className="text-lg md:text-xl lg:text-xl font-semibold">
                Payment
              </p>

              <div className="rounded-md mt-5 px-4 py-8 border-gray">
                <div className="border border-\[\#A9A6DC\]\/80 rounded-md">
                  <PaymentCard
                    active={true}
                    cardType={"Mastercard"}
                    cardNumber={""}
                    expMonth={"3"}
                    expYear={"2024"}
                  />
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-fit flex flex-row items-center justify-between px-6 py-3 border border-\[\#A9A6DC\]\/80 rounded-md mt-8 cursor-pointer"
                >
                  <AiOutlinePlus color="#000000" size={19} />
                  <p className="text-black text-md font-semibold ml-2">
                    New payment method
                  </p>
                </button>
              </div>

              <div className="flex flex-row justify-between my-16">
                <div>
                  <p className="text-lg font-bold mb-3">Total</p>
                  <p className="text-md font-normal text-dark-grey">
                    {planEndDate && (
                      <>
                        Due on {""}
                        {moment(planEndDate, "MMM DD YYYY, h:mm:ss A").format(
                          "MMMM D YYYY"
                        )}
                        ,
                        <p className="text-md font-normal text-dark-grey">
                          then every {planRecurrence}
                        </p>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-md font-semibold">₦‎</p>
                  <p className="text-3xl font-semibold">200,000</p>
                </div>
              </div>

              <button className="w-full primary-button">Proceed Payment</button>
            </div>
          </div>
        </section>
      </section>

      {showModal && <AddPayment onClose={() => setShowModal(false)} />}
    </>
  );
};

const Beneficiaries = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Beneficiaries;
