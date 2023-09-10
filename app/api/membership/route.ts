import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { parseDateString } from "../../../src/helpers/helpers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { name } = body;
    const session: any = await getServerSession(authOptions);

    // Make a request to Odoo's API to fetch user's membership details
    try {
      const get_membership = await axios.post(
        "http://127.0.0.1:8000/membership/corporate/",
        {
          membership_name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const create_profile = await axios.post(
        "http://127.0.0.1:8000/profiles/",
        {
          user_id: session?.user?.user?.user?.id,
          name: get_membership?.data?.membership?.primary_holder?.name,
          mobile_number: "",
          photo: "",
          also_beneficiary: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const create_membership = await axios.post(
        "http://127.0.0.1:8000/membership/",
        {
          user_id: session?.user?.user?.user?.id,
          primary_holder_id: create_profile.data.id,
          membership_id: get_membership?.data?.membership?.id.toString(),
          state: get_membership?.data?.membership?.state,
          name: get_membership?.data?.membership?.name,
          start_date: parseDateString(
            get_membership?.data?.membership?.start_date
          ),
          end_date: parseDateString(
            get_membership?.data?.membership?.start_date
          ),
          total_beneficiaries:
            get_membership?.data?.membership?.total_beneficiaries,
          total_dependents: get_membership?.data?.membership?.total_dependents,
          total_qty: get_membership?.data?.membership?.total_qty,
          membership_type: get_membership?.data?.membership?.membership_type,
          category: get_membership?.data?.membership?.category?.name,
          plan: get_membership?.data?.membership?.plan?.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return new NextResponse(JSON.stringify({ data: create_membership.data }));
    } catch (error) {
      console.error("Error fetching membership...", error);

      return new NextResponse(JSON.stringify({ status: 404 }));
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
