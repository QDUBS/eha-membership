import { GoDotFill } from "react-icons/go";
import moment from "moment";

interface NotificationProps {
  title: string;
  description: string;
  date: Date;
  recent: boolean;
  setRecent: () => void;
}

const Notification = ({
  title,
  description,
  date,
  recent,
  setRecent,
}: NotificationProps) => {
  return (
    <>
      {recent ? (
        <div className="w-full px-8 py-5 rounded-md border border-\[\#A9A6DC\]\/80">
          <div className="flex flex-row items-center">
            <p className="text-inactive/80 text-sm font-semibold">
              {moment(date).endOf("day").fromNow()}
            </p>
            <GoDotFill color="#FFA500" size={15} />
          </div>
          <div>
            <p className="text-black text-lg font-semibold">{title}s</p>
            <p className="text-black text-md font-semibold">{description}</p>
          </div>
        </div>
      ) : (
        <div className="w-full px-8 py-5 rounded-md border border-\[\#A9A6DC\]\/80 mt-8">
          <div className="flex flex-row items-center">
            <p className="text-inactive/80 text-sm font-semibold">May 5 2023</p>
          </div>
          <div>
            <p className="text-black text-lg font-semibold">Payment declined</p>
            <p className="text-black text-md font-semibold">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Adipissci rerum dignissimos eligendi iure, quo eos culpa voluptas
              eveniet nihil perferendis mollitia quia expedita magni at quis
              dolores! Temporibus, necessitatibus mollitia.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
