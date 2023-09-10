import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { issue, subject, message } = body;

    const session: any = await getServerSession(authOptions);
    const user_id = session?.user?.user?.user?.id;

    try {
      const create_support_ticket = await axios.post(
        "http://127.0.0.1:8000/support-tickets/",
        {
          user_id: user_id,
          issue: issue,
          subject: subject,
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("support ticket:", create_support_ticket.data);

      return new NextResponse(
        JSON.stringify({ data: create_support_ticket.data })
      );
    } catch (error) {
      console.error("Error adding support-ticket...", error);

      return new NextResponse(JSON.stringify({ status: 404 }));
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
