import { FaCircleDot } from "react-icons/fa6";
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxBorderDotted } from "react-icons/rx";
import { useState } from "react";

interface Props {
  active: any;
  cardType: any;
  cardNumber: any;
  expMonth: any;
  expYear: any;
}

const PaymentCard = ({
  active,
  cardType,
  cardNumber,
  expMonth,
  expYear,
}: Props) => {
  const [showSmallModal, setShowSmallModal] = useState(false);

  return (
    <>
      {active ? (
        <div className="flex flex-row items-center justify-between w-full p-8 border-b border-\[\#A9A6DC\]\/80">
          <div className="flex flex-row items-center">
            <FaCircleDot color="#284bcc" size={16} />
            <div className="flex flex-col justify-center items-center py-1 px-4 ml-6 rounded-md border border-\[\#A9A6DC\]\/80">
              {cardType == "Mastercard" ? (
                <SiMastercard color="#284bcc" size={30} />
              ) : (
                <SiVisa color="#284bcc" size={30} />
              )}
            </div>
            <div className="ml-4">
              <div className="flex flex-row items-center">
                <RxBorderDotted color="#000000" size={30} className="ml-0" />
                <RxBorderDotted color="#000000" size={30} className="ml-2" />
                <RxBorderDotted color="#000000" size={30} className="ml-2" />
                <p className="text-black text-md font-semibold ml-2">9373</p>
              </div>
              <p>
                Expiry {expMonth}/{expYear}
              </p>
            </div>
          </div>

          <div className="payment-option-modal flex flex-col relative z-30">
            {showSmallModal && (
              <div className="w-full bg-gray rounded-md absolute top-6 overview-card">
                <div
                  onClick={() => console.log("Deleted...")}
                  className="w-full text-dark-grey font-semibold text-sm text-center cursor-pointer p-4 border-b-gray"
                >
                  Delete
                </div>
              </div>
            )}
            <p
              onClick={() => setShowSmallModal(!showSmallModal)}
              className="relative self-end cursor-pointer"
            >
              <BiDotsHorizontalRounded color="#000000" size={22} />
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between w-full p-8 border-b border-\[\#A9A6DC\]\/80">
          <div className="flex flex-row items-center">
            <FaCircleDot color="#94a3b8" size={16} />
            <div className="flex flex-col justify-center items-center py-1 px-4 ml-6 rounded-md border border-\[\#A9A6DC\]\/80">
              {cardType == "Mastercard" ? (
                <SiMastercard color="#94a3b8" size={30} />
              ) : (
                <SiVisa color="#94a3b8" size={30} />
              )}
            </div>
            <div className="ml-4">
              <div className="flex flex-row items-center">
                <RxBorderDotted color="#94a3b8" size={30} className="ml-0" />
                <RxBorderDotted color="#94a3b8" size={30} className="ml-2" />
                <RxBorderDotted color="#94a3b8" size={30} className="ml-2" />
                <p className="text-inactive/80 text-md font-semibold ml-2">
                  9373
                </p>
              </div>
              <p className="text-inactive/80 text-md font-semibold">
                Expiry {expMonth}/{expYear}
              </p>
            </div>
          </div>

          <div className="payment-option-modal flex flex-col relative z-30">
            {showSmallModal && (
              <div className="w-full bg-gray rounded-md absolute top-6 overview-card">
                <div
                  onClick={() => console.log("Deleted...")}
                  className="w-full text-dark-grey font-semibold text-sm text-center cursor-pointer p-4 border-b-gray"
                >
                  Delete
                </div>
              </div>
            )}
            <p
              onClick={() => setShowSmallModal(!showSmallModal)}
              className="relative self-end cursor-pointer"
            >
              <BiDotsHorizontalRounded color="#94a3b8" size={22} />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentCard;
