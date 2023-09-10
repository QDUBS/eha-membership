"use client";

import { IPersonalFormInputs } from "@/interfaces/beneficiary";
import { saveMembershipPersonal } from "@/redux/slices/membershipSignupSlice";
import { RootState } from "@/redux/store/store";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { personalFormSchema } from "src/schemas/membership";
import Error from "../../../../src/components/forms/Error";
import { AppRoutes } from "../../../../src/constants/app_routes";

const Personal = () => {
  const router = useRouter();
  const membership: any = useSelector((state: RootState) => state.membership);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalFormSchema),
  });

  const onSubmit = (data: IPersonalFormInputs) => {
    dispatch(saveMembershipPersonal(data));
    router.push(AppRoutes.Beneficiaries);
  };

  useEffect(() => {
    if (membership.membershipPlan.category == "corporate") {
      setValue("primaryHolderFirstname", "- -");
      setValue("primaryHolderLastname", "- -");
      setValue("primaryHolderMobile", "- -");
      setValue("primaryHolderBeneficiaryStatus", "- -");
    } else {
      setValue("primaryHolderName", "- -");
      setValue("primaryHolderEmail", "- -");
    }
  }, [membership]);

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
              <div className="flex justify-center items-center text-white w-10 h-10 lg:w-14 lg:h-14 bg-purplestrong rounded-full lg:text-xl">
                <Image
                  unoptimized={true}
                  width={20}
                  height={20}
                  src="/images/Tick.svg"
                  alt=""
                />
              </div>
              <div className="h-[1px] w-8 bg-bluemedium"></div>
              <div className="flex justify-center items-center text-white w-10 h-10 lg:w-14 lg:h-14 bg-purplestrong rounded-full lg:text-xl">
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
                    Primary Holder
                  </h2>
                </div>

                <div className="flex flex-col gap-5 mt-8">
                  {membership.membershipPlan.category == "corporate" ? (
                    <div className="flex flex-col gap-5 mt-8">
                      <div>
                        <p>Name</p>
                        <input
                          type="text"
                          placeholder="J.B Ventures LLC"
                          className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                          {...register("primaryHolderName")}
                        />
                        {errors.primaryHolderName && (
                          <Error message={errors.primaryHolderName.message} />
                        )}
                      </div>

                      <div>
                        <p>Email</p>
                        <input
                          type="text"
                          placeholder="Janedoe@gmail.com"
                          className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                          {...register("primaryHolderEmail")}
                        />
                        {errors.primaryHolderEmail && (
                          <Error message={errors.primaryHolderEmail.message} />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 mt-8">
                      <div>
                        <p>First name</p>
                        <input
                          type="text"
                          placeholder="Jane"
                          className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                          {...register("primaryHolderFirstname")}
                        />
                        {errors.primaryHolderFirstname && (
                          <Error
                            message={errors.primaryHolderFirstname.message}
                          />
                        )}
                      </div>

                      <div>
                        <p>Last name</p>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                          {...register("primaryHolderLastname")}
                        />
                        {errors.primaryHolderLastname && (
                          <Error
                            message={errors.primaryHolderLastname.message}
                          />
                        )}
                      </div>

                      <div>
                        <p>Mobile number</p>
                        <input
                          type="text"
                          placeholder="09074352816"
                          className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                          {...register("primaryHolderMobile")}
                        />
                        {errors.primaryHolderMobile && (
                          <Error message={errors.primaryHolderMobile.message} />
                        )}
                      </div>

                      <div>
                        <p>Are you also a beneficiary?</p>
                        <select
                          {...register("primaryHolderBeneficiaryStatus")}
                          className="membership-select flex flex-row justify-between bg-[#F3F3F3] px-4 py-4 rounded-md w-full mt-3"
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors.primaryHolderBeneficiaryStatus && (
                          <Error
                            message={
                              errors.primaryHolderBeneficiaryStatus.message
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}

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

export default Personal;
