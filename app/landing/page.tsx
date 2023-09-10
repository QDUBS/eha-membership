"use client";

import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { AppRoutes } from "@/constants/app_routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Landing = () => {
  const { data }: any = useSession();
  const router = useRouter();

  const check = () => {
    if (data?.user?.user?.user?.membership_data) {
      return router.push(AppRoutes.Overview);
    }

    return router.push(AppRoutes.Start);
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <>
      <LoadingSpinner />
    </>
  );
};

export default Landing;
