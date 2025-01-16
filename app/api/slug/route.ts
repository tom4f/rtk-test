export const dynamic = "force-static";
import { NextResponse } from "next/server";

const mockData: Record<string, any> = {
  PLYPjPMiw3_YsVockWfuuhoP86YPDUXp4f: "java",
  "UU8butISFwT-Wl7EV0hUK0BQ": "free-code-camp",
  PLpcSpRrAaOaoIqHQddZOdbRrzr5dJtgSs: "ten-days-of-javascript",
  PLnXfazh66kVfUsfw9Oh5rBttZHaJe6HKB: "fk-2024-e",
  PLnXfazh66kVd0jXpYliCLAreHc4TDwnTf: "fk-2024-p",
  PLnXfazh66kVc8TRx1qmK3wshWs330_xsK: "fk-2024-f",
};


export async function POST(request: Request) {
  const { id } = await request.json();
  console.log(request.body);
  if (typeof id !== "string") {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  if (mockData[id]) {
    return NextResponse.json(mockData[id], { status: 200 });
  }
  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}

export async function GET() {
  // 405
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
