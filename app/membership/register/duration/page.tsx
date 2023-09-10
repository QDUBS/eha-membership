"use client";

import { IDurationFormInputs, IPlanFormInputs } from "@/interfaces/beneficiary";
import { saveMembershipDuration } from "@/redux/slices/membershipSignupSlice";
import { RootState } from "@/redux/store/store";
import { durationFormSchema } from "@/schemas/membership";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Error from "src/components/forms/Error";
import { AppRoutes } from "src/constants/app_routes";

const Duration = () => {
  const [recurrentPlan, setRecurrentPlan] = useState("monthly");
  const [newStartDate, setNewStartDate] = useState();
  const router = useRouter();
  const membershipPlan: any = useSelector(
    (state: RootState) => state.membership
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(durationFormSchema),
  });

  const handleRecurrenceChange = (event: any) => {
    const { value } = event.target;
    setRecurrentPlan(value);

    if (newStartDate) {
      let endDate: Date;
      const startDateObj = new Date(newStartDate);

      if (value === "monthly") {
        // Set the end date to be one month after the start date
        endDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 1, startDateObj.getDate());
      } else if (value === "biannual") {
        // Set the end date to be six months after the start date
        endDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 6, startDateObj.getDate());
      } else if (value === "yearly") {
        // Set the end date to be one year after the start date
        endDate = new Date(startDateObj.getFullYear() + 1, startDateObj.getMonth(), startDateObj.getDate());
      } else {
        // Handle invalid recurrence value
        console.error("Invalid recurrence value:", value);
        return;
      }

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
      endDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 1, startDateObj.getDate());
    } else if (recurrentPlan === "biannual") {
      // Set the end date to be six months after the start date
      endDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 6, startDateObj.getDate());
    } else if (recurrentPlan === "yearly") {
      // Set the end date to be one year after the start date
      endDate = new Date(startDateObj.getFullYear() + 1, startDateObj.getMonth(), startDateObj.getDate());
    } else {
      // Handle invalid recurrence value
      console.error("Invalid recurrence value:", recurrentPlan);
      return;
    }

    setValue("endDate", endDate.toISOString().split("T")[0]);
  };

  const onSubmit = (data: IDurationFormInputs) => {
    dispatch(saveMembershipDuration(data));
    router.push(AppRoutes.Personal);
  };

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
          <div className="bg-white px-5 py-8 md:p-10 w-full h-screen md:max-w-[500px] lg:max-w-[550px]">
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
              <div className="flex justify-center items-center text-white w-10 h-10 lg:w-14 lg:h-14 bg-purplestrong rounded-full lg:text-xl">
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
                    Set your plan duration
                  </h2>
                </div>

                <div className="flex flex-col gap-5 mt-8">
                  <div>
                    <p>Recurrence</p>
                    <select
                      {...register("recurrence")}
                      onChange={handleRecurrenceChange}
                      className="membership-select flex flex-row justify-between bg-[#F3F3F3] px-4 py-4 rounded-md w-full mt-3"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="bi-annual">Bi-annual</option>
                      <option value="annual">Yearly</option>
                    </select>
                    {errors.recurrence && (
                      <Error message={errors.recurrence.message} />
                    )}
                  </div>

                  <div>
                    <p>Start Date</p>
                    <input
                      type="date"
                      placeholder="Start date"
                      className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                      {...register("startDate")}
                      onChange={handleStartDateChange}
                    />
                    {errors.startDate && (
                      <Error message={errors.startDate.message} />
                    )}
                  </div>

                  <div>
                    <p>End Date</p>
                    <input
                      type="date"
                      placeholder="End date"
                      className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                      {...register("endDate")}
                      disabled
                    />
                    {errors.endDate && (
                      <Error message={errors.endDate.message} />
                    )}
                  </div>

                  <div className="flex flex-row gap-4 mt-5">
                    <button
                      onClick={() => router.back()}
                      className="secondary-button w-1/3 text-center"
                    >
                      Back
                    </button>
                    <button
                      className="primary-button w-2/3"
                      onClick={() => handleSubmit(onSubmit)}
                    >
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

export default Duration;
