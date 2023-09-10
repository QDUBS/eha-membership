import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface Props {
  onProceed: () => void;
  onClose: () => void;
}

const CancelMembership = ({ onProceed, onClose }: Props) => {
  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-3/5 bg-white px-8 py-8 rounded-md">
          <div className="flex flex-col justify-between">
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer dot"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <div className="flex flex-row w-full px-20 py-8">
            <Image
              src="/images/about-image.avif"
              width={200}
              height={200}
              unoptimized={true}
              alt=""
              className="about-image"
            />

            <div className="ml-10">
              <p className="text-black text-2xl font-bold mb-3">Hey, Wait!!</p>
              <p className="text-black text-lg font-semibold mb-10">
                Are you sure you want to cancel your subscription?
              </p>
              <div>
                <button onClick={onClose} className="cancel-button2">
                  No, I want to stay
                </button>
                <button onClick={onProceed} className="finish-button2 ml-2">
                  Yes, I want to cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CancelMembership;
