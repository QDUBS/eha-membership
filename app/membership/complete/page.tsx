"use client";

import Image from "next/image";
import Link from "next/link";
import { AppRoutes } from "../../../src/constants/app_routes";

const MembershipSignupComplete = () => {
  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
          <div className="bg-white px-5 py-8 md:p-10 w-full h-screen md:max-w-[500px] lg:max-w-[550px] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                unoptimized={true}
                width={160}
                height={160}
                src="/images/emailimage.png"
                alt=""
                className="w-36 h-auto md:w-40 -ml-5"
              />

              <h2 className="text-xl mt-4 text-center md:text-2xl lg:text-3xl">
                Thank you for signing up for the EHA Membership
              </h2>

              <p className="max-w-md text-center mt-5">
                A confirmation mail will be sent to you shortly
              </p>

              <Link
                href={AppRoutes.Login}
                className="max-w-md text-center text-bold mt-16 hover:underline"
              >
                <p className="text-black font-bold">Back to Login</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MembershipSignupComplete;
