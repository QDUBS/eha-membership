"use client";

import Error from "@/components/forms/Error";
import LoadingSpinnerMembershipCreation from "@/components/loading/LoadingSpinnerMembershipCreation";
import ErrorModal from "@/components/modals/ErrorModal";
import { IMembershipRegistrationFormInputs } from "@/interfaces/membership";
import { existingMembershipSchema } from "@/schemas/membership";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ExistingMember = () => {
  const [showDateOfBirth, setShowDateOfBirth] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(existingMembershipSchema),
  });

  const handleCategoryChange = (event: any) => {
    const { value } = event.target;
    const ShowDateOfBirth = value === "corporate";
    // setShowDateOfBirth(ShowDateOfBirth);
  };

  const { isLoading, isError, mutate } = useMutation({
    mutationFn: (registrationDetails: any) =>
      axios.post(`/api/membership`, registrationDetails),
    onSuccess: async (data: any) => {
      signOut({
        callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/login`,
      });
    },
    onError() {
      setErrorMessage("Please provide valid credentials.");
      setShowErrorModal(true);
    },
  });

  const onSubmit = async (data: IMembershipRegistrationFormInputs) => {
    mutate(data);
  };

  if (isLoading) {
    return <LoadingSpinnerMembershipCreation />;
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white px-5 py-8 md:p-10 w-full h-screen md:max-w-[500px] lg:max-w-[550px] overflow-y-auto"
          >
            <div className="w-full bg-white py-20 mt-10 md:mt-7">
              <div className="flex justify-center">
                <h2 className="text-lg md:text-xl lg:text-3xl">
                  Enter your details
                </h2>
              </div>

              <div className="w-full flex flex-col gap-5 mt-20">
                <div className="hidden">
                  <p>Category</p>
                  <select
                    {...register("category")}
                    onChange={handleCategoryChange}
                    className="flex flex-row justify-between bg-[#F3F3F3] px-4 py-4 rounded-md w-full mt-3"
                  >
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
                  <p>Name</p>
                  <input
                    type="text"
                    placeholder="MEM/1965/0279"
                    className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full placeholder:text-black"
                    {...register("name")}
                  />
                  {errors.name && <Error message={errors.name.message} />}
                </div>

                <div className="hidden">
                  <p>HP Number</p>
                  <input
                    type="text"
                    placeholder="HP02302"
                    className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full placeholder:text-black"
                    {...register("hpNumber")}
                    disabled
                  />
                  {errors.hpNumber && (
                    <Error message={errors.hpNumber.message} />
                  )}
                </div>

                {!showDateOfBirth && (
                  <div className="hidden">
                    <p>Date of Birth</p>
                    <input
                      type="date"
                      placeholder="20/9/2003"
                      className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full placeholder:text-black"
                      {...register("dateOfBirth")}
                      disabled
                    />
                    {errors.dateOfBirth && (
                      <Error message={errors.dateOfBirth.message} />
                    )}
                  </div>
                )}

                <div className="flex flex-row gap-4 mt-7">
                  <button
                    onClick={() => router.back()}
                    className="secondary-button w-1/3 text-center"
                  >
                    Back
                  </button>
                  <button className="primary-button w-2/3">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {showErrorModal && (
        <ErrorModal
          errorMessage={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
};

export default ExistingMember;
