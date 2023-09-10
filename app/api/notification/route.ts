import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest, res: NextResponse) {
    const session: any = await getServerSession(authOptions);
    const user_id = session?.user?.user?.user?.id;

  try {
    const body = await req.json();

    // Make a request to Odoo's API to fetch user's notifications
    try {
      const get_notifications = await axios.get(
        `http://127.0.0.1:8000/notifications/?user_id=${user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("notifications:", get_notifications.data);

      return new NextResponse(JSON.stringify({ data: get_notifications.data }));
    } catch (error) {
      console.error("Error fetching notifications...", error);

      return new NextResponse(JSON.stringify({ status: 404 }));
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
