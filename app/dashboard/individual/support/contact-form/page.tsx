"use client";

import Layout from "@/components/dashboard/Layout";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { ISupportTicketFormInputs } from "@/interfaces/support-ticket";
import { supportTicketSchema } from "@/schemas/support-ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillPhone } from "react-icons/ai";
import { CgNametag } from "react-icons/cg";
import { IoMail } from "react-icons/io5";

const Page = () => {
  const { data }: any = useSession();
  const [user, setUser] = useState<any>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(supportTicketSchema),
  });

  const { isLoading, isError, mutate } = useMutation({
    mutationFn: (formData: ISupportTicketFormInputs) =>
      axios.post(`/api/support-ticket`, formData),
    onSuccess: async (data) => {
      setShowSuccessModal(true);
      setSuccessMessage(
        "You complaint has been received. We will get back to you shortly."
      );
      router.back();
    },
  });

  const onSubmit = async (data: ISupportTicketFormInputs) => {
    console.log("Data:", data);
    mutate(data);
  };

  useEffect(() => {
    setUser(data?.user?.user?.user);
  }, [data?.user, user]);

  if (!user) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
          <p className="pt-0 font-semibold text-2xl lg:text-2xl">
            Contact Form
          </p>
        </div>

        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-4/5 px-8 pt-20">
            <div className="flex flex-row card-overview">
              {/* Form */}
              <form
                className="w-1/2 bg-purplestrong-lighter p-8 pt-10 left-side"
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className="text-white text-2xl font-semibold mb-10">
                  Write Us
                </p>

                <div className="mb-10">
                  <select
                    className="rounded-md border-dark-gray flex flex-row justify-between text-grey rounded-md py-3 w-full mt-3"
                    id="input-border-bottom-transparent"
                    {...register("issue")}
                  >
                    <option value="regular">Regular Issue</option>
                    <option value="payment">Payment Issue</option>
                    <option value="renewal">Renewal Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-10">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-md border-dark-gray text-grey px-3 py-3 mt-3"
                    id="input-border-bottom-transparent"
                    {...register("subject")}
                  />
                </div>

                <div className="mb-20">
                  <textarea
                    placeholder="Message"
                    rows={5}
                    className="w-full rounded-md border-dark-gray text-grey pt-2 mt-3 textarea-resize"
                    id="input-border-bottom-transparent"
                    {...register("message")}
                  ></textarea>
                </div>

                <div className="w-full flex flex-row items-center justify-between mt-10 mb-4">
                  <div className="flex flex-row">
                    <p className="text-grey text-md font-semibold">*</p>
                    <p className="text-grey text-md font-semibold">
                      This field is mandatory
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <button className="send-message-button ml-2 rounded-md">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

              {/* Contact Info */}
              <div className="w-1/2 bg-purplestrong p-8 pt-10 right-side">
                <div className="mb-10">
                  <p className="font-semibold text-2xl text-white mb-3">
                    Contact Information
                  </p>
                  <p className="font-semibold text-md text-grey">
                    We are open to handle your issues, welcome suggestions or
                    just to have a chat
                  </p>
                </div>

                <div className="mt-16">
                  <div className="flex flex-row items-center mb-7">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <CgNametag color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Name:
                    </p>
                    <p className="font-semibold text-md text-grey ml-2">
                      {user?.profile_data?.name}
                    </p>
                  </div>

                  <div className="flex flex-row items-center mb-7">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <AiFillPhone color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Phone:
                    </p>
                    <p className="font-semibold text-md text-grey ml-2">
                      {user?.profile_data?.mobile_number || "..."}
                    </p>
                  </div>

                  <div className="flex flex-row items-center">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <IoMail color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Email:
                    </p>
                    <p className="font-semibold text-md text-grey ml-2">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const SupportTicket = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default SupportTicket;
