"use client";

import SummaryCard from "@/components/dashboard/SummaryCard";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import BeneficiariesList from "@/components/modals/dashboard/BeneficiariesList";
import DependantsList from "@/components/modals/dashboard/DependantsList";
import { AppRoutes } from "@/constants/app_routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCalendar2WeekFill, BsFilePersonFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { SiPlangrid } from "react-icons/si";

const Summary = () => {
  const router = useRouter();
  const [showBeneficiariesList, setShowBeneficiariesList] = useState(false);
  const [showDependantsList, setShowDependantsList] = useState(false);

  const [tempMembership, setTempMembership] = useState();

  const { isLoading, error } = useQuery({
    queryKey: ["get-temp-membership"],
    queryFn: () => axios.get(`/api/temp_beneficiary`),
    onSuccess: (data) => {
      setTempMembership(data.data?.data);
    },
  });

  const getPlan = (plan) => {
    if (plan == "standard") {
      return "Standard";
    } else if (plan == "premium") {
      return "Premium";
    } else if (plan == "premium_international") {
      return "Premium International";
    }
  };

  const getRecurrence = (recurrence) => {
    if (recurrence == "monthly") {
      return "Every month";
    } else if (recurrence == "bi-annual") {
      return "Every six months";
    } else if (recurrence == "annual") {
      return "Every year";
    }
  };

  useEffect(() => {
    console.log("Temp Membership:", tempMembership?.data);
  }, [tempMembership]);

  if (isLoading || !tempMembership) {
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
          <div className="md:p-10 w-6/12 h-screen flex flex-row bg-white overflow-y-auto">
            <div className="w-full h-screen px-5 py-10">
              <p className="text-2xl text-purplestrong font-semibold">
                Membership Summary
              </p>
              <p className="text-md text-inactive/80">
                Please carefully review your membership details before
                proceeding.
              </p>

              <div className="mt-16">
                <SummaryCard
                  title="Plan"
                  icon={<SiPlangrid color="#fff" size={50} />}
                  iconSize=""
                  description={
                    <>
                      <p className="text-gray text-md font-medium mb-2">
                        Category:{" "}
                        {tempMembership?.category?.charAt(0).toUpperCase() +
                          tempMembership?.category?.slice(1)}
                      </p>
                      <p className="text-gray text-md font-medium mb-2">
                        Plan: {getPlan(tempMembership?.plan)}
                      </p>
                      <p className="text-gray text-md font-medium mb-2">
                        No. of Beneficiaries:{" "}
                        {tempMembership?.noOfBeneficiaries}
                      </p>
                      {tempMembership?.category == "corporate" && (
                        <div>
                          <p className="text-gray text-md font-medium mb-2">
                            No. of Dependants: {tempMembership?.noOfDependants}
                          </p>
                          <p className="text-gray text-md font-medium mb-2">
                            Total Beneficiaries & Dependants:{" "}
                            {tempMembership?.totalBeneficiariesDependants}
                          </p>
                        </div>
                      )}
                    </>
                  }
                />
                <SummaryCard
                  title="Duration"
                  icon={<BsCalendar2WeekFill color="#fff" size={50} />}
                  iconSize=""
                  description={
                    <>
                      <p className="text-gray text-md font-medium mb-2">
                        Recurrence: {getRecurrence(tempMembership?.recurrence)}
                      </p>
                      <p className="text-gray text-md font-medium mb-2">
                        Start Date:{" "}
                        {moment(
                          new Date(tempMembership?.startDate),
                          "MMM DD, YYYY, h:mm:ss A"
                        ).format("MMM DD, YYYY")}
                      </p>
                      <p className="text-gray text-md font-medium mb-2">
                        End Date:{" "}
                        {moment(
                          new Date(tempMembership?.endDate),
                          "MMM DD, YYYY, h:mm:ss A"
                        ).format("MMM DD, YYYY")}
                      </p>
                    </>
                  }
                />
                <SummaryCard
                  title="Primary Holder"
                  icon={<BsFilePersonFill color="#fff" size={50} />}
                  iconSize=""
                  description={
                    <>
                      {tempMembership?.category == "corporate" && (
                        <div>
                          <p className="text-gray text-md font-medium mb-2">
                            Name: {tempMembership?.noOfBeneficiaries}
                          </p>
                          <p className="text-gray text-md font-medium mb-2">
                            Email: {tempMembership?.noOfBeneficiaries}
                          </p>
                        </div>
                      )}

                      {tempMembership?.category != "corporate" && (
                        <div>
                          <p className="text-gray text-md font-medium mb-2">
                            Name:{" "}
                            {tempMembership?.primaryHolderFirstname
                              ?.charAt(0)
                              .toUpperCase() +
                              tempMembership?.primaryHolderFirstname?.slice(
                                1
                              )}{" "}
                            {tempMembership?.primaryHolderLastname
                              ?.charAt(0)
                              .toUpperCase() +
                              tempMembership?.primaryHolderLastname?.slice(1)}
                          </p>
                          <p className="text-gray text-md font-medium mb-2">
                            Mobile Number: {tempMembership?.primaryHolderMobile}
                          </p>
                          <p className="text-gray text-md font-medium mb-2">
                            Beneficiary Status:{" "}
                            {tempMembership?.primaryHolderBeneficiaryStatus}
                          </p>
                        </div>
                      )}
                    </>
                  }
                />
                <SummaryCard
                  title="Beneficiaries"
                  icon={<IoIosPeople color="#fff" size={50} />}
                  iconSize=""
                  description={
                    <>
                      <p className="text-gray text-md font-medium mb-2">
                        No. of Beneficiaries:{" "}
                        {tempMembership?.beneficiaries?.beneficiaries?.length}
                      </p>
                      {tempMembership?.beneficiaries?.beneficiaries?.length <
                      1 ? (
                        <p
                          className="text-gray text-md font-medium italic underline cursor-pointer mb-2"
                          onClick={() => {}}
                        >
                          Add beneficiaries
                        </p>
                      ) : (
                        <p
                          className="text-gray text-md font-medium italic underline cursor-pointer mb-2"
                          onClick={() => setShowBeneficiariesList(true)}
                        >
                          View
                        </p>
                      )}
                    </>
                  }
                />
                {tempMembership?.category == "corporate" && (
                  <SummaryCard
                    title="Dependants"
                    icon={<IoIosPeople color="#fff" size={50} />}
                    iconSize=""
                    description={
                      <>
                        <p className="text-gray text-md font-medium mb-2">
                          No. of Dependants:{" "}
                          {tempMembership?.dependants?.dependants?.length}
                        </p>
                        {tempMembership?.dependants?.dependants?.length < 1 ? (
                          <p
                            className="text-gray text-md font-medium italic underline cursor-pointer mb-2"
                            onClick={() => {}}
                          >
                            Add dependants
                          </p>
                        ) : (
                          <p
                            className="text-gray text-md font-medium italic underline cursor-pointer mb-2"
                            onClick={() => setShowDependantsList(true)}
                          >
                            View
                          </p>
                        )}
                      </>
                    }
                  />
                )}
              </div>

              <div className="flex flex-row gap-4 mt-5 pt-5 pb-20">
                <button
                  onClick={() => router.push(AppRoutes.Plan)}
                  className="secondary-button w-1/3"
                >
                  Modify
                </button>
                <button
                  className="primary-button w-2/3"
                  onClick={() => router.push(AppRoutes.Payment)}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showBeneficiariesList && (
        <BeneficiariesList
          beneficiaries={tempMembership?.beneficiaries?.beneficiaries}
          onClose={() => setShowBeneficiariesList(false)}
        />
      )}

      {showDependantsList && (
        <DependantsList
          dependants={tempMembership?.dependants?.dependants}
          onClose={() => setShowDependantsList(false)}
        />
      )}
    </>
  );
};

export default Summary;
