import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { card_holder, card_number, expiration, cvc } = body;

    const session: any = await getServerSession(authOptions);
    const user_id = session?.user?.user?.user?.id;

    try {
      const create_payment = await axios.post(
        "http://127.0.0.1:8000/saved-payments/",
        {
          user_id: user_id,
          card_holder: card_holder,
          card_number: card_number,
          expiration: expiration,
          cvc: cvc,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("payment:", create_payment.data);

      return new NextResponse(
        JSON.stringify({ data: create_payment.data })
      );
    } catch (error) {
      console.error("Error adding payment...", error);

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
    // Make a request to Odoo's API to fetch user's notifications
    try {
      const get_saved_payments = await axios.get(
        `http://127.0.0.1:8000/saved-payments/?user_id=${user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("saved payments:", get_saved_payments.data);

      return new NextResponse(JSON.stringify({ data: get_saved_payments.data }));
    } catch (error) {
      console.error("Error fetching saved payments...", error);

      return new NextResponse(JSON.stringify({ status: 404 }));
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

