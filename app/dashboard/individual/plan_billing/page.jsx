"use client";

import PaymentCard from "@/components/dashboard/PaymentCard";
import AddPayment from "@/components/modals/dashboard/AddPayment";
import CancelMembership from "@/components/modals/dashboard/CancelMembership";
import CancelMembershipForm from "@/components/modals/dashboard/CancelMembershipForm";
import { AppRoutes } from "@/constants/app_routes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Layout from "../../../../src/components/dashboard/Layout";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { membership_plan } from "@/data/membership_plan";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page = () => {
  const { data } = useSession();
  const [user, setUser] = useState();
  const [beneficiariesLength, setBeneficiariesLength] = useState(0);
  const [dependantsLength, setDependantsLength] = useState(0);
  const [savedCards, setSavedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelFormModal, setShowCancelFormModal] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ["get-savedCards"],
    queryFn: () => axios.get(`/api/notification`),
    onSuccess: (data) => {
      setSavedCards(data.data);
    },
  });

  const {
    data: beneficiaries,
    isLoading: loadingBeneficiaries,
    mutate: getBeneficiaries,
  } = useMutation({
    mutationFn: (membershipName) =>
      axios.post(`/api/beneficiaries`, membershipName),
    onSuccess: async (data) => {
      setBeneficiariesLength(data?.data?.data?.length);
    },
  });

  const {
    data: dependants,
    isLoading: loadingDependants,
    mutate: getDependants,
  } = useMutation({
    mutationFn: (membershipName) =>
      axios.post(`/api/dependants`, membershipName),
    onSuccess: async (data) => {
      setDependantsLength(data?.data);
    },
  });

  const getPlan = (name) => {
    const plan = membership_plan?.find((mem_plan) => mem_plan.name === name);
    return plan?.price;
  };

  useEffect(() => {
    const name = data?.user?.user?.user?.membership_data?.name;
    setUser(data?.user?.user?.user);

    getBeneficiaries({ name: name });
    getDependants({ name: name });
  }, [data?.user, user]);

  if (!user && loadingBeneficiaries && loadingDependants) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {!user ? (
        <LoadingSpinner />
      ) : (
        <section>
          <div className="flex flex-row justify-between px-8 py-8 border-b border-\[\#A9A6DC\]\/80">
            <p className="text-black text-2xl font-semibold">Plan & Billing</p>
          </div>

          <div className="flex flex-col px-8 py-8">
            {/* Plan Details */}
            <div className="w-full rounded-md mt-4 overview-card">
              <div className="flex flex-row items-center px-6 py-8 border-b border-\[\#A9A6DC\]\/80">
                <div className="w-1/3">
                  <p className="text-inactive/80 text-md font-semibold">Plan</p>
                  <p className="text-black text-2xl font-semibold">
                    {user?.membership_data?.plan}
                  </p>
                </div>

                <div className="w-1/3">
                  <p className="text-inactive/80 text-md font-semibold">
                    Category
                  </p>
                  <p className="text-black text-2xl font-semibold">
                    {user?.membership_data?.category}
                  </p>
                </div>

                <div className="w-1/3">
                  <p className="text-inactive/80 text-md font-semibold">
                    Payment
                  </p>
                  <div className="flex flex-row">
                    <p className="text-black text-2xl font-semibold">
                      ₦{getPlan(user?.membership_data?.plan)}
                    </p>
                    <p className="text-inactive/80 text-md font-semibold ml-2 dot">
                      per month
                    </p>
                  </div>
                </div>

                <div className="w-1/3 flex flex-row justify-end">
                  <p
                    onClick={() => setShowCancelModal(true)}
                    className="text-inactive/80 text-md font-semibold cursor-pointer hover:underline"
                  >
                    Cancel membership
                  </p>
                  <Link
                    href={AppRoutes.UpgradeMembership}
                    className="text-bluemedium text-md font-semibold ml-5 cursor-pointer hover:underline"
                  >
                    Upgrade
                  </Link>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between px-6 py-8">
                <div className="w-1/3 px-4">
                  <p className="text-black text-md font-semibold">
                    Beneficiaries
                  </p>
                  <div className="w-full h-2 bg-inactive/20 my-6 rounded-full"></div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-between">
                      <CiUser color="#000" size={22} />
                      <p className="text-inactive/80 text-md font-semibold">
                        {beneficiaries?.data?.data?.length || "..."} ben. (
                        {user?.membership_data?.total_beneficiaries} ben.)
                      </p>
                    </div>

                    <p className="text-black text-md font-semibold">
                      {beneficiaries?.data?.data?.length ===
                      user?.membership_data?.total_dependents
                        ? "Exhausted"
                        : "Unexhausted"}
                    </p>
                  </div>
                </div>

                <div className="w-1/3 px-4">
                  <p className="text-black text-md font-semibold">Dependants</p>
                  <div className="w-full h-2 bg-inactive/20 my-6 rounded-full"></div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-between">
                      <CiUser color="#000" size={22} />
                      <p className="text-inactive/80 text-md font-semibold">
                        {dependants?.data?.data?.length || "..."} deps. (
                        {user?.membership_data?.total_dependents} deps.)
                      </p>
                    </div>

                    <p className="text-black text-md font-semibold">
                      {beneficiaries?.data?.data?.length ===
                      user?.membership_data?.total_beneficiaries
                        ? "Exhausted"
                        : "Unexhausted"}
                    </p>
                  </div>
                </div>

                <div className="w-1/3 px-4">
                  <p className="text-black text-md font-semibold">Total</p>
                  <div className="w-full h-2 bg-inactive/20 my-6 rounded-full"></div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-between">
                      <CiUser color="#000" size={22} />
                      <p className="text-inactive/80 text-md font-semibold">
                        {beneficiaries?.data?.data?.length +
                          dependants?.data?.data?.length || "..."}{" "}
                        total ({user?.membership_data?.total_qty} ben. & deps.)
                      </p>
                    </div>

                    <p className="text-black text-md font-semibold">
                      {beneficiaries?.data?.data?.length +
                        dependants?.data?.data?.length ===
                      user?.membership_data?.total_dependents
                        ? "Exhausted"
                        : "Unexhausted"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="w-full rounded-md mt-10 p-8 overview-card">
              <p className="text-black text-lg font-semibold">
                Payment methods
              </p>

              <div className="border border-\[\#A9A6DC\]\/80 rounded-md mt-8">
                {savedCards?.length > 0 ? (
                  savedCards?.map((card) => (
                    <PaymentCard
                      key={""}
                      active={true}
                      cardType={"Mastercard"}
                      cardNumber={""}
                      expMonth={"3"}
                      expYear={"2024"}
                    />
                  ))
                ) : (
                  <></>
                )}

                <PaymentCard
                  active={true}
                  cardType={"Mastercard"}
                  cardNumber={""}
                  expMonth={"3"}
                  expYear={"2024"}
                />
                <PaymentCard
                  active={false}
                  cardType={""}
                  cardNumber={""}
                  expMonth={"8"}
                  expYear={"2025"}
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
          </div>
        </section>
      )}

      {showModal && <AddPayment onClose={() => setShowModal(false)} />}
      {showCancelModal && (
        <CancelMembership
          onProceed={() => {
            setShowCancelModal(false);
            setShowCancelFormModal(true);
          }}
          onClose={() => setShowCancelModal(false)}
        />
      )}
      {showCancelFormModal && (
        <CancelMembershipForm onClose={() => setShowCancelFormModal(false)} />
      )}
    </>
  );
};

const PlanBilling = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default PlanBilling;
