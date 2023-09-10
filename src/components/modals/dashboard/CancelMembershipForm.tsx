import { IoClose } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

const CancelMembershipForm = ({ onClose }: Props) => {
  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-3/5 bg-white px-8 py-8 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <p className="text-black text-xl font-semibold">
              Cancel Membership
            </p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <form className="mt-8">
            <div className="mb-10">
              <div className="flex flex-row">
                <p className="text-dark-grey text-md font-semibold">
                  What&apos;s your reason for cancelling?
                </p>
                <p className="text-dark-grey text-md font-semibold">*</p>
              </div>

              <input
                type="text"
                placeholder=""
                className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
              />
            </div>

            <div className="mb-10">
              <div className="flex flex-row">
                <p className="text-dark-grey text-md font-semibold">Message</p>
              </div>

              <textarea
                placeholder=""
                rows={5}
                className="w-full rounded-md border-dark-gray text-grey pt-2 mt-3 textarea-resize"
              ></textarea>
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

export default CancelMembershipForm;
