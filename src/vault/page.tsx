import Layout from "src/components/dashboard/Layout";
import { ReactElement } from "react";
import { BiChevronDown } from "react-icons/bi";
import type { NextPageWithLayout } from "../../app/_app";

const BillingPayment: NextPageWithLayout = () => {
  return (
    <>
      <section>
        <h1 className="text-center text-black"> Billing and Payment</h1>
      </section>
    </>
  );
};

BillingPayment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BillingPayment;
