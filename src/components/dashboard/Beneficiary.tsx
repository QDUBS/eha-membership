import { AiFillPhone } from "react-icons/ai";
import { PiGenderIntersexFill, PiListNumbersFill } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from "react";

interface BeneficiaryProps {
  firstname: string;
  lastname: string;
  gender: string;
  beneficiary_number: string;
  dateOfBirth: Date;
  onClick: () => void;
}

const BeneficiaryCard = ({
  firstname,
  lastname,
  gender,
  beneficiary_number,
  dateOfBirth,
  onClick,
}: BeneficiaryProps) => {
  const [showSmallModal, setShowSmallModal] = useState(false);

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
      return (
        <div className="youth-ribbon">
          <span>Youth</span>
        </div>
      );
    } else if (age >= 18 && age < 65) {
      return (
        <div className="adult-ribbon">
          <span>Adult</span>
        </div>
      );
    } else if (age > 65) {
      return (
        <div className="senior-ribbon">
          <span>Senior</span>
        </div>
      );
    }
  };

  return (
    <>
      <div className="bg-white p-4 mr-10 rounded-md beneficiary-card relative">
        <div className="relative">
          <div className="flex flex-row items-center">
            <div className="beneficiary-image bg-blue-700 rounded-full flex flex-col justify-center items-center text-white font-bold text-2xl">
              {firstname?.charAt(0)}
            </div>
            <p className="text-purplestrong font-bold text-xl ml-4">
              {firstname} {lastname}
            </p>
          </div>

          <div className="flex flex-row items-center pl-6 mt-6">
            <PiGenderIntersexFill color="#000000" size={18} />
            <p className="text-black font-semibold text-md ml-2">{gender}</p>
          </div>

          <div className="flex flex-row items-center justify-between pl-6 mt-3">
            <div className="flex flex-row items-center">
              <PiListNumbersFill color="#000000" size={18} />
              <p className="text-black font-semibold text-md ml-2">
                {beneficiary_number}
              </p>
            </div>

            <div className="w-1/2 flex flex-col relative">
              {showSmallModal && (
                <div className="w-full bg-gray rounded-md absolute bottom-7 overview-card">
                  <div
                    onClick={onClick}
                    className="w-full text-dark-grey font-semibold text-sm text-center cursor-pointer p-3 border-b-gray"
                  >
                    Delete
                  </div>
                  <div
                    onClick={onClick}
                    className="w-full text-dark-grey font-semibold text-sm text-center cursor-pointer p-3"
                  >
                    Edit
                  </div>
                </div>
              )}
              <p
                onClick={() => setShowSmallModal(!showSmallModal)}
                className="relative self-end cursor-pointer"
              >
                <BiDotsVerticalRounded color="#000000" size={22} />
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0">
          {calculateAgeGrade(dateOfBirth)}
        </div>
      </div>
    </>
  );
};

export default BeneficiaryCard;
