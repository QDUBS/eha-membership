type Props = {
  name: string;
  price: number;
  value: string;
  setValue: (e: any) => void;
};

const PlanType = ({ name, price, value, setValue }: Props) => {
  return (
    <div className="flex flex-row items-center px-2 py-2">
      <p className="text-md font-medium w-1/3 text-black">{name}</p>
      <p className="text-md text-center font-medium w-1/3 text-black">
        ₦‎{price}
      </p>
      <input
        type="number"
        placeholder="Add Quantity"
        value={value}
        onChange={setValue}
        className="px-2 py-2 w-1/3 text-black text-center placeholder-black"
        id="plan-type-input"
      />
    </div>
  );
};

export default PlanType;
