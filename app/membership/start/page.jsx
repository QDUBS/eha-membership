"use client";

import { AppRoutes } from "@/constants/app_routes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Start = () => {
  const { data } = useSession();

  console.log('Session:', data)

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
          <div className="md:p-10 w-7/12 h-fit flex flex-col items-center">
            <div className="w-full px-20 py-20">
              <div className="flex flex-row justify-between">
                <div className="payment-start-container bg-gray py-10 px-10 flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/existing-user.png"
                      alt=""
                      width={200}
                      height={200}
                      className="w-28 mb-10"
                    />
                    <p className="text-xl text-purplestrong font-medium mb-3">
                      Existing Member
                    </p>
                    <p className="text-md text-inactive/80 text-center">
                      Do you already have a membership?
                    </p>
                  </div>

                  <Link href={AppRoutes.ExistingMember}>
                    <button className="payment-start-button text-md mt-16">
                      Proceed
                    </button>
                  </Link>
                </div>

                <div className="payment-start-container bg-medium-gray py-10 px-10 flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/new-user.jpeg"
                      alt=""
                      width={200}
                      height={200}
                      className="w-28 mb-10"
                    />
                    <p className="text-xl text-purplestrong font-medium mb-3">
                      New Member
                    </p>
                    <p className="text-md text-inactive/80 text-center">
                      Don&apos;t have a membership? Get one now.
                    </p>
                  </div>

                  <Link href={AppRoutes.Plan}>
                    <button className="payment-start-button text-md mt-16">
                      Proceed
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Start;
