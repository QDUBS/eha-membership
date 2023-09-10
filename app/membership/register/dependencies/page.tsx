"use client";

import LoadingSpinner from "@/components/loading/LoadingSpinner";
import Beneficiary from "@/components/membership/Beneficiary";
import {
  IDependenciesFormInputs
} from "@/interfaces/beneficiary";
import { saveMembershipDependencies } from "@/redux/slices/membershipSignupSlice";
import {
  beneficiaryFormSchema,
  dependentFormSchema,
  durationFormSchema,
  personalFormSchema,
  planFormSchema,
} from "@/schemas/membership";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppRoutes } from "src/constants/app_routes";

const Dependencies = () => {
  const router = useRouter();
  const [signUpError, setSignUpError] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const [allDependencies, setAllDependencies] = useState<any>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const dispatch = useDispatch();
  const {
    membershipPlan,
    membershipDuration,
    membershipPersonal,
    membershipBeneficiaries,
  } = useSelector((state: any) => state.membership);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(dependentFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => axios.post(`/api/temp_beneficiary`, data),
    onSuccess: async (data: any) => {
      router.push(AppRoutes.Summary);
    },
  });

  const save = (e: any) => {
    e.preventDefault();

    setAllDependencies([
      ...allDependencies,
      { firstName, lastName, email, mobile: mobileNumber, dateOfBirth },
    ]);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNumber("");
    setDateOfBirth("");
  };

  const remove = (name: string) => {
    setAllDependencies(
      allDependencies.filter(
        (dependencies: any) =>
          dependencies.firstName + " " + dependencies.lastName !== name
      )
    );
  };

  const calculateAge = (dateOfBirth: any) => {
    const currentDate = new Date();
    const dobDate = new Date(dateOfBirth);
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const dobMonth = dobDate.getMonth();

    if (
      currentMonth < dobMonth ||
      (currentMonth === dobMonth && currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const calculateAgeGrade = (dateOfBirth: any) => {
    const currentDate = new Date();
    const dobDate = new Date(dateOfBirth);
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const dobMonth = dobDate.getMonth();

    if (
      currentMonth < dobMonth ||
      (currentMonth === dobMonth && currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      return "Youth";
    } else if (age >= 18 && age < 65) {
      return "Adult";
    } else if (age > 65) {
      return "Senior";
    }
  };

  const onSubmit = async (data: IDependenciesFormInputs) => {
    setValue("dependants", allDependencies);
    dispatch(saveMembershipDependencies(data));

    const membershipPlanValid = await planFormSchema.isValid(membershipPlan);
    const membershipDurationValid = await durationFormSchema.isValid(
      membershipDuration
    );
    const membershipPersonalValid = await personalFormSchema.isValid(
      membershipPersonal
    );
    const membershipBeneficiariesValid = await beneficiaryFormSchema.isValid(
      membershipBeneficiaries
    );

    if (!membershipPlanValid) {
      setSignUpError(true);
      setSignUpErrorMessage("Please fill in the plan section appropriately");
      return;
    }

    if (!membershipDurationValid) {
      setSignUpError(true);
      setSignUpErrorMessage(
        "Please fill in the duration section appropriately"
      );
      return;
    }

    if (!membershipPersonalValid) {
      setSignUpError(true);
      setSignUpErrorMessage("Please provide your personal information");
      return;
    }

    const membershipRegistrationDetails = {
      category: membershipPlan.category,
      plan: membershipPlan.plan,
      noOfBeneficiaries: membershipPlan.noOfBeneficiaries,
      noOfDependants: membershipPlan.noOfDependants || 0,
      totalBeneficiariesDependants:
        membershipPlan.totalBeneficiariesDependants || 0,
      planType: membershipPlan.planType,
      recurrence: membershipDuration.recurrence,
      startDate: membershipDuration.startDate,
      endDate: membershipDuration.endDate,
      primaryHolderName: membershipPersonal.primaryHolderName,
      primaryHolderEmail: membershipPersonal.primaryHolderEmail,
      primaryHolderFirstname: membershipPersonal.primaryHolderFirstname,
      primaryHolderLastname: membershipPersonal.primaryHolderLastname,
      primaryHolderMobile: membershipPersonal.primaryHolderMobile,
      primaryHolderBeneficiaryStatus:
        membershipPersonal.primaryHolderBeneficiaryStatus,
      beneficiaries: membershipBeneficiaries.beneficiaries,
      dependants: data.dependants,
    };
    mutate(membershipRegistrationDetails);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
                <Image
                  unoptimized={true}
                  width={20}
                  height={20}
                  src="/images/Tick.svg"
                  alt=""
                />
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-white w-10 h-10 bg-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                <Image
                  unoptimized={true}
                  width={20}
                  height={20}
                  src="/images/Tick.svg"
                  alt=""
                />
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-white w-10 h-10 bg-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                <Image
                  unoptimized={true}
                  width={20}
                  height={20}
                  src="/images/Tick.svg"
                  alt=""
                />
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-white w-10 h-10 bg-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                <Image
                  unoptimized={true}
                  width={20}
                  height={20}
                  src="/images/Tick.svg"
                  alt=""
                />
              </div>
              <div className="h-[1px] w-8 bg-purplestrong"></div>
              <div className="flex justify-center items-center text-white w-10 h-10 bg-purplestrong rounded-full lg:text-xl lg:w-14 lg:h-14">
                5
              </div>
            </div>

            {/* Form */}
            <div className="mt-5 md:mt-7">
              <div className="flex justify-center">
                <h2 className="text-lg md:text-xl lg:text-3xl">Dependants</h2>
              </div>

              {/* Dependencies */}
              <div className="bg-[#F3F3F3] p-1 mt-5 rounded-md">
                {allDependencies.length > 0 ? (
                  allDependencies.map((dependant: any) => (
                    <div key={dependant.firstName}>
                      <Beneficiary
                        name={`${dependant.firstName} ${dependant.lastName}`}
                        age={calculateAge(dependant.dateOfBirth)}
                        type={calculateAgeGrade(dependant.dateOfBirth)!!}
                        removeBeneficiary={() =>
                          remove(`${dependant.firstName} ${dependant.lastName}`)
                        }
                      />
                      <div className="border-b-gray"></div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-row items-center justify-center px-0 py-4">
                    <p
                      className="text-lg italic text-black underline cursor-pointer"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Skip This Section
                    </p>
                  </div>
                )}
              </div>

              {signUpError && (
                <div className="flex justify-center">
                  <div className="text-lg md:text-xl lg:text-base text-red-600  mt-2">
                    {signUpErrorMessage}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row item-center justify-between mt-16">
                  <h2 className="text-lg md:text-xl lg:text-2xl">
                    New Dependant
                  </h2>
                  <button className="save-button w-1/6" onClick={save}>
                    Save
                  </button>
                </div>

                <div className="flex flex-col gap-5 mt-5">
                  <div>
                    <p>First name</p>
                    <input
                      type="text"
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    />
                  </div>

                  <div>
                    <p>Last name</p>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-3 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    />
                  </div>

                  <div>
                    <p>Email</p>
                    <input
                      type="text"
                      placeholder="Jandedoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-3 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    />
                  </div>

                  <div>
                    <p>Mobile number</p>
                    <input
                      type="text"
                      placeholder="09074352816"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="mt-3 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    />
                  </div>

                  <div>
                    <p>Date of Birth</p>
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="mt-3 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    />
                  </div>

                  <div className="flex flex-row gap-4 mt-5">
                    <button
                      onClick={() => router.back()}
                      className="secondary-button w-1/3"
                    >
                      Back
                    </button>
                    <button className="primary-button w-2/3">Proceed</button>
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

export default Dependencies;
