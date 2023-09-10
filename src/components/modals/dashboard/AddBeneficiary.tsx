import { IoClose } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

const AddBeneficiary = ({ onClose }: Props) => {
  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-3/5 bg-white px-8 py-8 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <p className="text-black text-xl font-semibold">Add Beneficiary</p>
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
                  Firstname
                </p>
                <p className="text-dark-grey text-md font-semibold">*</p>
              </div>
              <input
                type="text"
                placeholder="John"
                className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
              />
            </div>

            <div className="mb-10">
              <div className="flex flex-row">
                <p className="text-dark-grey text-md font-semibold">Lastname</p>
                <p className="text-dark-grey text-md font-semibold">*</p>
              </div>

              <input
                type="text"
                placeholder="Doe"
                className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
              />
            </div>

            <div className="mb-10">
              <div className="flex flex-row">
                <p className="text-dark-grey text-md font-semibold">Email</p>
                <p className="text-dark-grey text-md font-semibold">*</p>
              </div>
              <input
                type="text"
                placeholder="John Doe Mac"
                className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
              />
            </div>

            <div className="w-full flex flex-row mb-14">
              <div className="w-full">
                <div className="flex flex-row">
                  <p className="text-dark-grey text-md font-semibold">
                    Mobile number
                  </p>
                  <p className="text-dark-grey text-md font-semibold">*</p>
                </div>
                <input
                  type="text"
                  placeholder="+1940493920"
                  className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
                />
              </div>

              <div className="w-full ml-4">
                <div className="flex flex-row">
                  <p className="text-dark-grey text-md font-semibold">
                    Date of Birth
                  </p>
                  <p className="text-dark-grey text-md font-semibold">*</p>
                </div>
                <input
                  type="date"
                  placeholder="Date of birth"
                  className="w-full border-dark-gray rounded-md px-2 py-3 mt-3"
                />
              </div>
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
                <button className="finish-button ml-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddBeneficiary;
