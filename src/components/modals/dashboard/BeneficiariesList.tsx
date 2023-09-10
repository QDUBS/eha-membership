import { IoClose } from "react-icons/io5";

interface Props {
  beneficiaries: [];
  onClose: () => void;
}

const BeneficiariesList = ({ beneficiaries, onClose }: Props) => {
  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-3/5 bg-white px-8 py-8 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <p className="text-black text-xl font-semibold">Beneficiaries</p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          {beneficiaries.map((beneficiary: any) => (
            <div key={beneficiary.firstname} className="flex flex-row items-center px-2 py-3">
              <p
                className="text-md font-medium w-1/3 text-inactive/80"
                id="subtitle-name"
              >
                {beneficiary.firstname} {beneficiary.lastname}
              </p>
              <p className="text-md text-center font-medium w-1/3 text-inactive/80">
                {beneficiary.age}
              </p>
              <p className="text-md text-center font-medium w-1/3 text-inactive/80">
                {beneficiary.type}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BeneficiariesList;
