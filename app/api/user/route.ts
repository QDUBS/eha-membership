import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password } = body;

    try {
      const response = await axios.post("http://127.0.0.1:8000/users/", body);
      console.log("Data:", response.data, "Status:", 200);
      return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
      console.log("Error:", error);
      return NextResponse.json(
        { error: "Error registering user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
