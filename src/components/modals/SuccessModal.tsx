import { MdClose } from "react-icons/md";

interface Props {
  successMessage: string;
  onClose: () => void;
}

const SuccessModal = ({ successMessage, onClose }: Props) => {
  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-2/5 bg-white flex flex-col justify-center items-center px-8 py-8 rounded-md">
          <div
            onClick={onClose}
            className="bg-gray-200 w-16 h-16 px-4 py-4 rounded-full flex flex-col justify-center items-center cursor-pointer"
          >
            <MdClose color="#3372e8" size={25} />
          </div>

          <div className="mt-10">
            <p className="text-black text-2xl font-medium text-center mb-3">
              Success
            </p>
            <p className="text-gray-500 text-md font-normal text-center">
              {successMessage}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full text-white mt-10 success-modal-button"
          >
            OK
          </button>
        </div>
      </section>
    </>
  );
};

export default SuccessModal;
