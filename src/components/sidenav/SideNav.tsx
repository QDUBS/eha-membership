"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsChatFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { FiHelpCircle, FiSettings } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoMail } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { RiFileListFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { AppRoutes } from "../../constants/app_routes";
import NavItem from "./NavItem";

const SideNav = () => {
  const { data }: any = useSession();
  const [user, setUser] = useState<any>();
  const [active, setActive] = useState("Overview");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logout = () => {
    signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/login`,
    });
  }

  useEffect(() => {
    setUser(data?.user?.user?.user);
  }, [data?.user, user]);

  return (
    <>
      <section className="bg-purplestrong fixed bottom-0 w-full py-7 left-0 md:fixed md:bottom-0 lg:sticky lg:left-0 lg:top-0 lg:w-1/5 lg:h-screen font-thin">
        <div className="relative px-5">
          <div className="w-full flex flex-col items-center">
            {user?.profile_data?.photo ? (
              <Image
                unoptimized={true}
                width={80}
                height={80}
                src={user?.profile_data.photo}
                alt="profile-picture"
                className="profile-image relative"
              />
            ) : (
              <div className="w-16 h-16 bg-white rounded-full mb-3">
                <FaCircleUser color="#03dffc" size={64} />
              </div>
            )}

            <p className="text-white text-sm text-center">{user?.email}</p>
          </div>
          <div className="mt-12">
            <NavItem
              icon={
                <RiFileListFill
                  color={active === "Overview" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Overview"
              onclick={() => setActive("Overview")}
              active={active}
              route={AppRoutes.Overview}
            />
            <NavItem
              icon={
                <TbReport
                  color={active === "Reports" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Reports"
              onclick={() => setActive("Reports")}
              active={active}
              route={AppRoutes.Reports}
            />
            <NavItem
              icon={
                <MdPayment
                  color={active === "Plan and Billing" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Plan and Billing"
              onclick={() => setActive("Plan and Billing")}
              active={active}
              route={AppRoutes.BillingPayment}
            />
            <NavItem
              icon={
                <IoMail
                  color={active === "Inbox" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Inbox"
              onclick={() => setActive("Inbox")}
              active={active}
              route={AppRoutes.Inbox}
            />
            <NavItem
              icon={
                <BsChatFill
                  color={active === "Support" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Support"
              onclick={() => setActive("Support")}
              active={active}
              route={AppRoutes.Support}
            />
          </div>
        </div>

        <div className="w-full p-2 absolute bottom-0">
          {showLogoutModal && (
            <div className="bg-black w-full rounded-md mb-2">
              <div className="flex flex-row items-center px-2 py-5 hover-logout-modal">
                <FiSettings color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Settings</p>
              </div>

              <div className="flex flex-row items-center px-2 py-5 hover-logout-modal">
                <FiHelpCircle color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Help</p>
              </div>

              <div className="flex flex-row items-center px-2 py-5 hover-logout-modal border-t-dark-gray" onClick={logout}>
                <LuLogOut color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Log out</p>
              </div>
            </div>
          )}

          <div
            className={
              showLogoutModal
                ? "bg-very-dark-gray w-full h-24 px-2 flex flex-row items-center justify-between py-4 rounded-md relative cursor-pointer"
                : "w-full h-24 px-2 flex flex-row items-center justify-between py-4 relative cursor-pointer"
            }
            onClick={() => setShowLogoutModal(!showLogoutModal)}
          >
            <h2 className="flex flex-row app-name">
              <p className="text-white text-2xl font-bold">Membership</p>
              <GoDotFill color="#ffffff" size={22} className="dot" />
            </h2>
            <BiDotsHorizontalRounded color="#fff" size={22} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SideNav;
