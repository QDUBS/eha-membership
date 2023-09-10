"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Error from "src/components/forms/Error";
import { ISignupFormInputs } from "src/interfaces/auth";
import { signupFormSchema } from "src/schemas/auth";
// import { UserType } from "@prisma/client";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AppRoutes } from "src/constants/app_routes";

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormInputs>({
    resolver: yupResolver(signupFormSchema),
  });

  const {isLoading, mutate} = useMutation({
    mutationFn: (registrationDetails: ISignupFormInputs) =>
      axios.post(`/api/user`, registrationDetails),
    onSuccess: async (data: any) => {
      router.push(AppRoutes.SignUpComplete);
    },
  });

  const onSubmit = async (data: ISignupFormInputs) => {
    mutate(data);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0 backdrop-blur-md bg-black/10">
          {/* Signup Form */}
          <div className="login-form-container">
            <h1 className="text-black font-bold text-2xl lg:text-3xl">
              Create an account
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
                  Create account
                </button>
                <p className="text-center">
                  By creating an account, you accept our privacy policy
                  <span className="inline-block text-bluestrong underline underline-offset-4 hover:text-bluemedium ml-2">
                    <Link href={AppRoutes.TermsConditions}>
                      terms and conditions
                    </Link>
                  </span>{" "}
                  and our{""}
                  <span className="inline-block text-bluestrong underline underline-offset-4 hover:text-bluemedium ml-2">
                    <Link href={AppRoutes.PrivacyPolicy}>privacy policy</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>

          {/* Register */}
          <div className="signup-container flex flex-col justify-center">
            <h1 className="text-white font-bold text-2xl lg:text-3xl">
              Sign In
            </h1>
            <p className="text-gray-300 font-normal text-md mt-6 lg:text-md">
              Join the Journey to Optimal Health! Already have an account?
            </p>
            <Link href={AppRoutes.Login}>
              <button
                className="auth-secondary-button w-3/6  mt-10"
                type="submit"
              >
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
