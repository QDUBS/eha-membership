"use client";

import DependantCard from "@/components/dashboard/Dependant";
import Layout from "@/components/dashboard/Layout";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import AddDependant from "@/components/modals/dashboard/AddDependant";
import EditDependant from "@/components/modals/dashboard/EditDependant";
import { dummyPeople } from "@/data/people";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { CgNametag } from "react-icons/cg";
import { FaCalendarDays } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { LuFilter } from "react-icons/lu";

const itemsPerPage = 9;

const Page = () => {
  const { data }: any = useSession();
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState<any>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filtering
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  const {
    data: dependants,
    isLoading,
    isError,
    mutate,
  } = useMutation({
    mutationFn: (membershipName: any) =>
      axios.post(`/api/dependants`, membershipName),
    onSuccess: async (data: any) => {},
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dependants?.data?.data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = dependants?.data?.data?.slice(startIndex, endIndex);

  const handleChangeFirstname = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchFirstName(value);

    const filteredData: any = dependants?.data?.data?.filter((beneficiary: any) => {
      const firstname = beneficiary?.firstName.toLowerCase();

      return firstname.includes(value.toLowerCase());
    });

    setFilteredBeneficiaries(filteredData);
  };

  const handleChangeLastname = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchLastName(event.target.value);

    const filteredData: any = dependants?.data?.data?.filter((beneficiary: any) => {
      const lastname = beneficiary?.lastName.toLowerCase();

      return lastname.includes(value.toLowerCase());
    });

    setFilteredBeneficiaries(filteredData);
  };

  const handleChangeCategory = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchCategory(event.target.value);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const filteredData: any = dependants?.data?.data?.filter((dependant: any) => {
      const birthYear = dependant?.dateOfBirth.getFullYear();
      const birthMonth = dependant?.dateOfBirth.getMonth();
      const birthDay = dependant?.dateOfBirth.getDate();

      const age = currentYear - birthYear;

      if (
        (value == "youth" && currentMonth < birthMonth) ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        return age >= 0 && age <= 18;
      } else if (
        (value == "adult" && currentMonth < birthMonth) ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        return age >= 18 && age <= 64;
      } else if (
        (value == "senior" && currentMonth > birthMonth) ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        return age >= 65;
      }
    });

    setFilteredBeneficiaries(filteredData);
  };

  const goToPage = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const name = data?.user?.user?.user?.membership_data?.name;
    mutate({ name: name });
  }, [data?.user?.user?.user?.membership_data?.name]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="h-full flex flex-col justify-between">
        <section>
          <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
            <p className="pt-0 font-semibold text-2xl lg:text-2xl">
              Dependants
            </p>
          </div>

          {/* Filter */}
          <div className="px-10 py-6 border-b border-\[\#A9A6DC\]\/80">
            <div className="flex flex-row justify-between items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-fit bg-transparent py-2 rounded-md flex flex-row items-center justify-center ml-2"
              >
                <LuFilter color="#3683e0" size={22} />
                <p className="text-blue-normal font-semibold text-md ml-2">
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </p>
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className="w-fit bg-blue-700 px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2"
              >
                <IoMdAddCircle color="#ffffff" size={20} />
                <p className="text-white font-semibold text-md ml-2">
                  Add Dependant
                </p>
              </button>
            </div>

            {/* Filter form */}
            {showFilters && (
              <div className="mt-5">
                <form>
                  {/* Date of birth filter */}
                  <div className="w-2/3 flex flex-row">
                    <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2">
                      <p className="h-full font-semibold text-md text-black flex flex-row items-center pr-2 border-r-gray">
                        From
                      </p>
                      <input
                        type="text"
                        placeholder=""
                        value={searchStartDate}
                        onChange={(e) => setSearchStartDate(e.target.value)}
                        className="w-full px-2"
                        id="plan-type-input"
                      />
                      <FaCalendarDays color="#cccccc" size={20} />
                    </div>

                    <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                      <p className="h-full font-semibold text-md text-black flex flex-row items-center pr-2 border-r-gray">
                        To
                      </p>
                      <input
                        type="text"
                        placeholder=""
                        value={searchEndDate}
                        onChange={(e) => setSearchEndDate(e.target.value)}
                        className="w-full px-2"
                        id="plan-type-input"
                      />
                      <FaCalendarDays color="#cccccc" size={20} />
                    </div>
                  </div>

                  {/* Firstname, Lastname, Age filters */}
                  <div className="w-full flex flex-row mt-5">
                    <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2">
                      <p className="h-full font-semibold text-md text-black flex flex-row items-center pr-2 border-r-gray">
                        Firstname
                      </p>
                      <input
                        type="text"
                        placeholder=""
                        value={searchFirstName}
                        onChange={handleChangeFirstname}
                        className="w-full px-2"
                        id="plan-type-input"
                      />
                      <CgNametag color="#cccccc" size={35} />
                    </div>

                    <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                      <p className="h-full font-semibold text-md text-black flex flex-row items-center pr-2 border-r-gray">
                        Lastname
                      </p>
                      <input
                        type="text"
                        placeholder=""
                        value={searchLastName}
                        onChange={handleChangeLastname}
                        className="w-full px-2"
                        id="plan-type-input"
                      />
                      <CgNametag color="#cccccc" size={35} />
                    </div>

                    <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                      <p className="h-full font-semibold text-md text-black flex flex-row items-center pr-2 border-r-gray">
                        Category
                      </p>
                      <select
                        className="w-full px-2"
                        id="category-select"
                        onChange={handleChangeCategory}
                      >
                        <option value="none"></option>
                        <option value="youth">Youth</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Dependants List */}
          <div className="flex flex-row flex-wrap pl-10 pt-8">
            {filteredBeneficiaries.length > 0
              ? filteredBeneficiaries.map((person: any, index: any) => (
                  <DependantCard
                    key={index}
                    firstname={person?.firstName}
                    lastname={person?.lastName}
                    gender={person?.gender}
                    beneficiary_name={person?.beneficiary_name}
                    dateOfBirth={person?.dob}
                    onClick={() => setShowModal(true)}
                  />
                ))
              : currentItems?.map((person: any, index: any) => (
                  <DependantCard
                    key={index}
                    firstname={person?.firstname}
                    lastname={person?.lastname}
                    gender={person.gender}
                    beneficiary_name={person?.beneficiary_name}
                    dateOfBirth={person?.dob}
                    onClick={() => setShowModal(true)}
                  />
                ))}
          </div>
        </section>

        {/* Pagination */}
        {/* <div className="flex flex-row justify-end items-center px-10 py-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-fit bg-white px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2 border-dark-gray next-prev-btn cursor-pointer"
          >
            <BiSolidChevronLeft color="#666666" size={20} />
            <p className="text-dark-grey font-semibold text-md ml-2">
              Previous
            </p>
          </button>

          <button className="w-fit bg-green px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2 border-dark-gray">
            <p className="text-white font-semibold text-md">{currentPage}</p>
          </button>
          <div className="text-dark-grey font-semibold text-md flex flex-row items-start justify-center mx-2">
            of
          </div>
          <button className="w-fit bg-white px-4 py-2 rounded-md flex flex-row items-center justify-center border-dark-gray">
            <p className="text-purplestrong font-semibold text-md">
              {totalPages}
            </p>
          </button>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-fit bg-white px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2 border-dark-gray next-prev-btn"
          >
            <p className="text-dark-grey font-semibold text-md">Next</p>
            <BiSolidChevronRight color="#666666" size={20} className="ml-2" />
          </button>
        </div> */}
      </section>

      {showModal && (
        <EditDependant depandant={""} onClose={() => setShowModal(false)} />
      )}
      {showCreateModal && (
        <AddDependant onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
};

const Dependants = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Dependants;
