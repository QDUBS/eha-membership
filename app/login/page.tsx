"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "src/components/forms/Error";
import { ILoginFormInputs } from "src/interfaces/auth";
import { loginFormSchema } from "src/schemas/auth";
import { AppRoutes } from "src/constants/app_routes";

const Login = () => {
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: ILoginFormInputs) => {
    const { email, password } = data;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response?.ok) {
      console.log("Logged in...")
      return router.push(AppRoutes.Landing);
    }
    if (response?.status === 403) {
      setLoginError(true);
      setLoginErrorMessage("Please verify your account");
    } else {
      setLoginError(true);
      setLoginErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0 backdrop-blur-md bg-black/10">
          {/* Login Form */}
          <div className="login-form-container">
            <h1 className="text-black font-bold text-2xl lg:text-3xl">
              Welcome back
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mt-20">
                <input
                  type="email"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2 placeholder:font-thin"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && <Error message={errors.email.message} />}
              </div>

              <div className="flex flex-col mt-5">
                <input
                  type="password"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && <Error message={errors.password.message} />}
              </div>

              <div className="flex flex-col mt-14 items-center space-y-4">
                <button className="primary-button w-full" type="submit">
                  Login to account
                </button>
                <p>
                  Forgot your password?
                  <span className="inline-block text-bluestrong underline underline-offset-4 hover:text-bluemedium ml-2">
                    <Link href={AppRoutes.PasswordReset}>Reset</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>

          {/* Register */}
          <div className="signup-container flex flex-col justify-center">
            <h1 className="text-white font-bold text-2xl lg:text-3xl">
              Sign Up
            </h1>
            <p className="text-gray-300 font-normal text-md mt-6 lg:text-md">
              Join the Journey to Optimal Health! Sign up for our Exclusive
              Clinic Membership Today and Unlock a World of Wellness, Care, and
              Support.
            </p>
            <Link href={AppRoutes.Signup}>
              <button
                className="auth-secondary-button w-3/6  mt-10"
                type="submit"
              >
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
