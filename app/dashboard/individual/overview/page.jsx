"use client";

import Faq from "@/components/dashboard/Faq";
import TableauEmbedSmall from "@/components/dashboard/TableauSmall";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import EditProfile from "@/components/modals/dashboard/EditProfile";
import { AppRoutes } from "@/constants/app_routes";
import { faqs } from "@/data/faq";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdCardMembership } from "react-icons/md";
import Layout from "../../../../src/components/dashboard/Layout";

const Page = () => {
  const { data } = useSession();
  const [user, setUser] = useState();
  const [beneficiariesLength, setBeneficiariesLength] = useState(0);
  const [dependantsLength, setDependantsLength] = useState(0);
  const [activeTab, setActiveTab] = useState("INFO");
  const [clicked, setClicked] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        // <ProfileSkeleton />
        <LoadingSpinner />
      ) : (
        <section>
          <div className="h-40 bg-blue-700 px-30 pt-20 pb-30">
            <p className="text-white text-3xl font-semibold">
              Hello {user?.profile_data?.name}!
            </p>
            <p className="text-white text-md font-semibold mt-8">
              Welcome to EHA Membership Platform! We&apos;re delighted to have you on
              board. You can now fully access all the benefits of our clinic
              membership. Don&apos;t fret – we&apos;re here to assist you every step of
              the way. Let&apos;s get started on your journey to better health.
            </p>
          </div>

          <div className="overview-lower-section px-30">
            <div className="bg-white flex flex-row w-full p-8 rounded-md overview-card">
              {/* Left */}
              <div className="left-side">
                <div className="w-fit relative">
                  {user?.profile_data?.photo ? (
                    <Image
                      unoptimized={true}
                      width={140}
                      height={140}
                      src={user?.profile_data.photo}
                      alt=""
                      className="profile-image relative"
                    />
                  ) : (
                    <Image
                      alt="profile-picture"
                      src="/images/empty-profile-image.png"
                      width={200}
                      height={200}
                      unoptimized={true}
                      className="profile-image relative"
                    />
                  )}
                  <div className="bg-purplestrong w-14 h-14 rounded-full flex flex-col justify-center items-center absolute bottom-0 right-0 cursor-pointer">
                    <FiEdit color="#ffffff" size={25} />
                  </div>
                </div>

                <div className="profile-divider flex flex-row my-4">
                  <div className="w-1/3 h-2 bg-purplestrong rounded-tl-md rounded-bl-md"></div>
                  <div className="w-1/3 h-2 bg-dark-gray"></div>
                  <div className="w-1/3 h-2 bg-gray rounded-tr-md rounded-br-md"></div>
                </div>

                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-grey text-xs text-center">
                      BENEFICIARIES
                    </p>
                    <p className="text-purplestrong text-md text-center font-semibold">
                      {user?.membership_data?.total_beneficiaries}
                    </p>
                  </div>

                  <div>
                    <p className="text-grey text-xs text-center">DEPENDENTS</p>
                    <p className="text-purplestrong text-md text-center font-semibold">
                      {user?.membership_data?.total_dependents}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="right-side ml-10">
                <div className="flex flex-row justify-between pb-5 mb-10 border-b-gray">
                  <p className="text-purplestrong text-lg">
                    {user?.profile_data?.name}
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="edit-profile-button px-4 rounded-md flex flex-row items-center"
                  >
                    <FiEdit color="#ffffff" size={18} />
                    <p className="text-white text-md ml-2">Edit</p>
                  </button>
                </div>

                <div className="w-full flex flex-row">
                  <div>
                    <div className="flex flex-row mb-5">
                      <p className="text-grey text-md">Email:</p>
                      <p className="text-dark-grey text-md ml-2">
                        {user?.email}
                      </p>
                    </div>

                    <div className="flex flex-row mb-5">
                      <p className="text-grey text-md">Phone:</p>
                      <p className="text-dark-grey text-md ml-2">
                        {user?.profile_data?.mobile_number || "- - - -"}
                      </p>
                    </div>

                    <div className="flex flex-row mb-5">
                      <p className="text-grey text-md">Beneficiary:</p>
                      <p className="text-dark-grey text-md ml-2">
                        {user?.profile_data?.also_beneficiary ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  <div className="ml-24">
                    <div className="flex flex-row mb-5">
                      <p className="text-grey text-md">Membership ID:</p>
                      <p className="text-dark-grey text-md ml-2">
                        {user?.membership_data?.name}
                      </p>
                    </div>

                    <div className="flex flex-row mb-5">
                      <p className="text-grey text-md">Plan:</p>
                      <p className="text-dark-grey text-md ml-2">
                        {user?.membership_data?.plan || "- - - -"}
                      </p>
                    </div>

                    <div className="flex flex-row mb-5">
                      <p className="text-grey text-md">Category:</p>
                      <p className="text-dark-grey text-md ml-2">
                        {user?.membership_data?.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row px-30 h-40">
            {/* Overview */}
            <div className="w-2/3 rounded-md bg-white p-8 overview-card">
              <p className="text-black text-lg font-semibold">Activity</p>

              <div className="">
                {/* <TableauEmbedSmall viewUrl="https://prod-uk-a.online.tableau.com/t/ehaclinicsltd/views/Membership/summaryDashboard" /> */}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="w-1/3 ml-6">
              <div className="w-full flex flex-row p-8 rounded-md bg-purplestrong overview-card">
                <MdCardMembership color="#ffffff" size={40} />
                <div className="w-full ml-2">
                  <p className="text-white text-md font-semibold">
                    Manage Beneficiaries
                  </p>
                  <p className="text-grey text-sm font-small mt-4">
                    {beneficiaries?.data?.data?.length || "..."} Active
                    Beneficiaries
                  </p>
                  <p className="text-grey text-sm font-small italic underline">
                    {beneficiaries?.data?.data?.length ===
                    user?.membership_data?.total_beneficiaries
                      ? "Exhausted"
                      : "Unexhausted"}
                  </p>
                </div>
                <Link href={AppRoutes.BeneficiariesList}>
                  <BiChevronRight
                    color="#ffffff"
                    size={30}
                    className="cursor-pointer"
                  />
                </Link>
              </div>

              <div className="w-full flex flex-row p-8 rounded-md bg-gray mt-6 overview-card">
                <MdCardMembership color="#301934" size={40} />
                <div className="w-full ml-2">
                  <p className="text-purplestrong text-md font-semibold">
                    Manage Dependants
                  </p>
                  <p className="text-purplestrong text-sm font-small mt-4">
                    {dependants?.data?.data?.length || "..."} Active Dependants
                  </p>
                  <p className="text-purplestrong text-sm font-small italic underline">
                    {dependants?.data?.data?.length ===
                    user?.membership_data?.total_dependents
                      ? "Exhausted"
                      : "Unexhausted"}
                  </p>
                </div>
                <Link href={AppRoutes.DependentsList}>
                  <BiChevronRight
                    color="#301934"
                    size={30}
                    className="cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Lower section */}
          <div className="w-full px-30 pt-10 pb-30">
            <div className="flex flex-row w-full mb-10">
              <p
                className={
                  activeTab == "INFO"
                    ? `text-purplestrong text-md font-semibold cursor-pointer border-b-purplestrong`
                    : `text-grey text-md font-semibold cursor-pointer`
                }
                onClick={() => setActiveTab("INFO")}
              >
                INFO
              </p>
              <p
                className={
                  activeTab == "FAQs"
                    ? `text-purplestrong text-md font-semibold cursor-pointer ml-12 border-b-purplestrong`
                    : `text-grey text-md font-semibold cursor-pointer ml-12`
                }
                onClick={() => setActiveTab("FAQs")}
              >
                FAQs
              </p>
            </div>

            <div>
              {/* INFO */}
              {activeTab == "INFO" && (
                <div className="flex flex-row w-full p-8 rounded-md overview-card">
                  <div className="pr-8">
                    <p className="text-purplestrong text-lg font-bold mb-5">
                      About EHA Membership
                    </p>
                    <p className="text-purplestrong text-md mt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Optio dolores, voluptates commodi iusto inventore possimus
                      esse odio alias accusamus quis nobis incidunt. Optio
                      distinctio provident nam sapiente maiores, nesciunt ipsa.
                    </p>
                    <p className="text-purplestrong text-md mt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Optio dolores, voluptates commodi iusto inventore possimus
                      esse odio alias accusamus quis nobis incidunt. Optio
                      distinctio provident nam sapiente maiores, nesciunt ipsa.
                    </p>
                  </div>

                  <Image
                    src="/images/about-image.avif"
                    width={200}
                    height={200}
                    unoptimized={true}
                    className="about-image"
                  />
                </div>
              )}

              {/* FAQs */}
              {activeTab == "FAQs" && (
                <div className="flex flex-col w-full p-8 rounded-md overview-card">
                  <p className="text-purplestrong text-lg font-bold mb-5">
                    Frequently Asked Questions
                  </p>

                  {faqs.map((faq) => (
                    <Faq
                      key={faq.description}
                      description={faq.description}
                      title={faq.title}
                      clicked={clicked}
                      onClick={() => setClicked(faq.description)}
                      index={faqs.indexOf(faq)}
                      lastIndex={faqs.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {showModal && (
        <EditProfile profile={""} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

const Overview = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Overview;
