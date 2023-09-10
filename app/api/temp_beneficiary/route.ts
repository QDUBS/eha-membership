import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const {
      category,
      plan,
      noOfBeneficiaries,
      noOfDependants,
      totalBeneficiariesDependants,
      planType,
      recurrence,
      startDate,
      endDate,
      primaryHolderName,
      primaryHolderEmail,
      primaryHolderFirstname,
      primaryHolderLastname,
      primaryHolderMobile,
      primaryHolderBeneficiaryStatus,
      beneficiaries,
      dependants,
    } = body;
    const session: any = await getServerSession(authOptions);
    const user_id = session?.user?.user?.user?.id;

    try {
      const add_temp_membership = await axios.post(
        "http://127.0.0.1:8000/temp_membership/",
        {
          user_id: user_id,
          category: category,
          plan: plan,
          noOfBeneficiaries: noOfBeneficiaries,
          noOfDependants: noOfDependants,
          totalBeneficiariesDependants: totalBeneficiariesDependants,
          planType: { planType: planType },
          recurrence: recurrence,
          startDate: startDate,
          endDate: endDate,
          primaryHolderName: primaryHolderName,
          primaryHolderEmail: primaryHolderEmail,
          primaryHolderFirstname: primaryHolderFirstname,
          primaryHolderLastname: primaryHolderLastname,
          primaryHolderMobile: primaryHolderMobile,
          primaryHolderBeneficiaryStatus: primaryHolderBeneficiaryStatus,
          beneficiaries: { beneficiaries: beneficiaries },
          dependants: { dependants: dependants },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return new NextResponse(
        JSON.stringify({ data: add_temp_membership.data })
      );
    } catch (error) {
      console.error("Error adding temporary membership...", error);

      return new NextResponse(JSON.stringify({ status: 404 }));
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session: any = await getServerSession(authOptions);
  const user_id = session?.user?.user?.user?.id;

  try {
    const get_temp_membership = await axios.get(
      `http://127.0.0.1:8000/temp_membership/?user_id=${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return new NextResponse(JSON.stringify({ data: get_temp_membership.data }));
  } catch (error) {
    console.error("Error fetching temporary membership...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
