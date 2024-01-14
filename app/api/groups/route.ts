import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {db} from '../../../db';
import { group, insertGroupSchema } from "../../../db/schema";

export async function GET(req: NextRequest) {
  try {
    const result = await db.select().from(group);
    return NextResponse.json(result);
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: "Error Fetching Groups"}, {status: 500});
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newGroup = insertGroupSchema.parse(body);

    const result = await db.insert(group).values(newGroup).returning();
    return NextResponse.json(result, {status: 200});
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: "Error Creating Group"}, {status: 500});
  }
}
