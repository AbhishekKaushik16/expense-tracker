import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function GET(req: NextRequest) {
  return NextResponse.json({message: "Api Working! :)"})
}
