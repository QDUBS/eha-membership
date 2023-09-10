import { useState } from "react";

interface Props {
  title: string;
  icon: any;
  iconSize: any;
  description: any;
}

const SummaryCard = ({ title, icon, iconSize, description }: Props) => {
  const [showSmallModal, setShowSmallModal] = useState(false);

  return (
    <>
      <div className="w-full h-summary-card flex flex-row mb-10">
        <div className="w-4/12 h-summary-card bg-very-dark-gray flex flex-col items-center justify-center py-4">
          <p className="text-white text-lg font-medium mb-5">{title}</p>
          {icon}
        </div>

        <div className="w-8/12 h-summary-card bg-dark-gray py-4 px-4 ml-2">
          {description}
          
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
