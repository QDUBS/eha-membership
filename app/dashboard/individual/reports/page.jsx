"use client"

import TableauEmbed from "@/components/dashboard/Tableau";
import Layout from "../../../../src/components/dashboard/Layout";

const Page = () => {
  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-semibold text-2xl lg:text-2xl">Reports</p>
        </div>

        <div>
          {/* <TableauEmbed viewUrl="https://prod-uk-a.online.tableau.com/t/ehaclinicsltd/views/Membership/GeneralPremiumdashboard" /> */}
        </div>
      </section>
    </>
  );
};

const Reports = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Reports;
