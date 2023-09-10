import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { AppRoutes } from "@/constants/app_routes";
import { IPaymentFormInputs } from "@/interfaces/payment";
import { paymentFormSchema } from "@/schemas/payment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

const AddPayment = ({ onClose }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPaymentFormInputs>({
    resolver: yupResolver(paymentFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (paymentDetails: IPaymentFormInputs) =>
      axios.post(`/api/payment`, paymentDetails),
    onSuccess: async (data: any) => {
      router.push(AppRoutes.BillingPayment);
      onClose();
    },
  });

  const onSubmit = async (data: IPaymentFormInputs) => {
    mutate(data);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0">
        <div className="w-3/5 bg-white px-8 py-8 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <p className="text-black text-xl font-semibold">
              Add payment method
            </p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10">
              <div className="flex flex-row">
                <p className="text-dark-grey text-md font-semibold">
                  Card holder
                </p>
                <p className="text-dark-grey text-md font-semibold">*</p>
              </div>
              <input
                type="text"
                placeholder="John Doe Mac"
                {...register("card_holder")}
                className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
              />
            </div>

            <div className="mb-10">
              <div className="flex flex-row">
                <p className="text-dark-grey text-md font-semibold">
                  Card number
                </p>
                <p className="text-dark-grey text-md font-semibold">*</p>
              </div>

              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
                {...register("card_number")}
                min={16}
                max={16}
              />
            </div>

            <div className="w-full flex flex-row mb-14">
              <div className="w-full">
                <div className="flex flex-row">
                  <p className="text-dark-grey text-md font-semibold">
                    Expiration month and year
                  </p>
                  <p className="text-dark-grey text-md font-semibold">*</p>
                </div>
                <input
                  type="text"
                  placeholder="03/2024"
                  className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
                  {...register("expiration")}
                />
              </div>

              <div className="w-full ml-4">
                <div className="flex flex-row">
                  <p className="text-dark-grey text-md font-semibold">CVC</p>
                  <p className="text-dark-grey text-md font-semibold">*</p>
                </div>
                <input
                  type="text"
                  placeholder="637"
                  className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
                  {...register("cvc")}
                  min={3}
                  max={3}
                />
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-between mt-5 mb-4">
              <div className="flex flex-row">
                <p className="text-dark-grey text-md font-semibold">*</p>
                <p className="text-dark-grey text-md font-semibold">
                  This field is mandatory
                </p>
              </div>

              <div className="flex flex-row">
                <button onClick={onClose} className="cancel-button">
                  Cancel
                </button>
                <button className="finish-button ml-2">Finish</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddPayment;
