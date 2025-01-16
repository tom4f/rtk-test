export const dynamic = "force-static";
import { NextResponse } from "next/server";
import java from "./java.json";
import freeCodeCamp from "./free-code-camp.json";
import tenDaysOfJavascript from "./ten-days-of-javascript.json";
import fk2024e from "./fk-2024-e.json";
import fk2024p from "./fk-2024-p.json";
import fk2024f from "./fk-2024-f.json";


const mockData: Record<string, any> = {
  PLYPjPMiw3_YsVockWfuuhoP86YPDUXp4f: java,
  "UU8butISFwT-Wl7EV0hUK0BQ": freeCodeCamp,
  PLpcSpRrAaOaoIqHQddZOdbRrzr5dJtgSs: tenDaysOfJavascript,
  PLnXfazh66kVfUsfw9Oh5rBttZHaJe6HKB: fk2024e,
  PLnXfazh66kVd0jXpYliCLAreHc4TDwnTf: fk2024p,
  PLnXfazh66kVc8TRx1qmK3wshWs330_xsK: fk2024f,
};


export async function POST(request: Request) {
  const { id } = await request.json();
  console.log(request.body);
  if (typeof id !== "string") {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  if (mockData[id]) {
    // sleep
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return NextResponse.json(mockData[id], { status: 200 });
  }
  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}

export async function GET() {
  // 405
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
