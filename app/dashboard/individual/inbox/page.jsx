"use client";

import Notification from "@/components/dashboard/Notification";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Layout from "../../../../src/components/dashboard/Layout";

const Page = () => {
  const [notifications, setNotifications] = useState([]);

  const { isLoading, error } = useQuery({
    queryKey: ["get-notifications"],
    queryFn: () => axios.get(`/api/notification`),
    onSuccess: (data) => {
      setNotifications(data.data);
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
          <p className="pt-0 font-semibold text-2xl lg:text-2xl">Inbox</p>
        </div>

        <div className="flex flex-col items-center px-10 pt-20 pb-20">
          {notifications?.length > 0 ? (
            notifications.map((notification) => (
              <Notification
                key={""}
                title={""}
                description={""}
                date={""}
                recent={""}
                setRecent={""}
              />
            ))
          ) : (
            <>
              <div className="w-8/12 flex flex-col items-center px-10 pt-10 pb-20 rounded-md overview-card">
                <Image
                  src="/images/bell.png"
                  alt=""
                  width={120}
                  height={120}
                  className="mb-5"
                />
                <p className="text-black font-semibold text-xl mb-5">
                  You have no notifications yet
                </p>
                <p className="text-black font-normal text-md">
                  New notifications will appear here.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

const Inbox = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Inbox;
