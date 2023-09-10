import { MdCancel } from "react-icons/md";

type Props = {
  name: string;
  age: number;
  type: string;
  removeBeneficiary: any;
};

const Beneficiary = ({ name, age, type, removeBeneficiary }: Props) => {
  return (
    <div className="flex flex-row items-center bg-[#F3F3F3] px-2 py-3">
      <p
        className="text-md font-medium w-1/3 text-inactive/80"
        id="subtitle-name"
      >
        {name}
      </p>
      <p className="text-md text-center font-medium w-1/3 text-inactive/80">
        {age}
      </p>
      <p className="text-md text-center font-medium w-1/3 text-inactive/80">
        {type}
      </p>
      <p onClick={removeBeneficiary}>
        <MdCancel color="#666" size={20} className="cursor-pointer" />
      </p>
    </div>
  );
};

export default Beneficiary;
