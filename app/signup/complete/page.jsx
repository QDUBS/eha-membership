"use client";

import Image from "next/image";
import Link from "next/link";
import { AppRoutes } from "../../../src/constants/app_routes";

const SignupComplete = () => {
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
                width={300}
                height={300}
                src="/images/successful-registration.webp"
                alt=""
                className="w-48 h-auto md:w-40 -ml-5 mb-7"
              />

              <h2 className="text-xl mt-4 text-center md:text-2xl lg:text-3xl">
                Registration Successful!
              </h2>

              <p className="max-w-md text-center mt-5">
                You can now log in to access your account.
              </p>

              <div className="flex flex-row items-center gap-2 mt-7 md:mt-12">
                <button className="px-8 py-2 rounded-full bg-[#FFE9E9] text-[#BF0B0B] hover:bg-[#FFE9E9]/50">
                  <Link
                    href={AppRoutes.Login}
                    className="max-w-md text-center mt-16"
                  >
                    Login
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupComplete;
