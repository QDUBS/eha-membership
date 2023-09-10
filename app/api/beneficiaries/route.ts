import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { name } = body;
  const session: any = await getServerSession(authOptions);

  // Make a request to Odoo's API to fetch user's membership beneficiaries
  try {
    const get_beneficiaries = await axios.post(
      "http://127.0.0.1:8000/membership/get-beneficiaries/",
      {
        membership_name: name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify({ data: get_beneficiaries.data }));
  } catch (error) {
    console.error("Error fetching beneficiaries...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
