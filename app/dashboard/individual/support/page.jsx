"use client";

import Faq from "@/components/dashboard/Faq";
import Layout from "@/components/dashboard/Layout";
import { AppRoutes } from "@/constants/app_routes";
import { faqs } from "@/data/faq";
import Link from "next/link";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const Page = () => {
  const [clicked, setClicked] = useState("");

  return (
    <>
      <section>
        <div className="h-40 bg-blue-700 px-40 pt-20 pb-20 flex flex-col items-center">
          <p className="text-white text-4xl text-center font-semibold mb-10">
            Welcome! How can we help?
          </p>
          <div className="w-2/3 bg-white flex flex-row items-center px-2 mb-3 mt-3 border-dark-gray rounded-md">
            <BiSearchAlt2 color="#666666" size={25} />
            <input
              type="text"
              placeholder="Search"
              className="w-full px-2 py-3 text-dark-grey"
              id="plan-type-input"
            />
          </div>
          <p className="text-grey text-md text-center font-semibold">
            Find quick answers by looking through popular articles
          </p>
          <p className="text-grey text-md text-center font-semibold">
            Or contact us directly{" "}
            <Link href={AppRoutes.ContactForm} className="underline">
              here
            </Link>
          </p>
        </div>

        {/* Lower part */}
        <div className="px-40 mt-10 mb-20">
          <div>
            <p className="text-purplestrong text-2xl font-semibold mb-5">
              Popular Articles
            </p>

            <div className="flex flex-col w-full p-8 rounded-md overview-card">
              {faqs.map((faq, index) => (
                <Faq
                  key={index}
                  description={faq.description}
                  title={faq.title}
                  clicked={clicked}
                  onClick={() => setClicked(faq.description)}
                  index={faqs.indexOf(faq)}
                  lastIndex={faqs.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="bg-gray mt-20 pt-10 pb-10 flex flex-col items-center rounded-md">
            <p className="text-purplestrong text-2xl font-semibold text-center mb-10">
              Can&apos;t find what you need? Send us a help request.
            </p>
            <Link href={AppRoutes.ContactForm}>
              <button className="contact-button mb-10">Contact Us</button>
            </Link>
            <p className="text-dark-grey text-md font-semibold">
              Or tweet us{" "}
              <Link
                href={""}
                className="text-blue-normal text-md font-semibold"
              >
                @ehanigeria
              </Link>{" "}
              for quick questions
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

const Support = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Support;
