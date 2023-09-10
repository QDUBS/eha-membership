import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
// import { redis } from "../../../lib/redis";
import { ICacheResult } from "@/interfaces/redis";
import { redis } from "lib/redis";

const result: ICacheResult = {
  data: null,
  type: null,
  latency: null,
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { name } = body;

    let start = Date.now();
    let cachedDependant: any = await redis.get(`dependants-cache-${name}`);

    if (cachedDependant) {
      result.data = cachedDependant;
      result.type = "redis";
      result.latency = Date.now() - start;

      console.log("Cached Dependants:", result.data)

      return new NextResponse(JSON.parse(result.data));
    } else {
      start = Date.now();
      const get_dependants = await axios.post(
        "http://127.0.0.1:8000/membership/get-dependants/",
        {
          membership_name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      result.data = get_dependants.data;
      result.type = "api";
      result.latency = Date.now() - start;
      redis.set(
        `dependants-cache-${name}`,
        JSON.stringify(get_dependants.data)
      );
      redis.expire(`dependants-cache-${name}`, 3600);

      return new NextResponse(JSON.stringify(result.data));
    }
  } catch (error) {
    console.error("Error fetching dependants...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
