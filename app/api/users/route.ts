import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {db} from '../../../db';
import { user } from "../../../db/schema";

export async function GET(req: NextRequest) {

  try {
    const result = await db.select().from(user); 
    return NextResponse.json(result);
  }catch (err) {
    console.log(err);
     return NextResponse.json({ error: 'failed to load data' }, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await db.insert(user).values({name: body.name, email: body.email, role: body.role, password: body.password}).returning();
    return NextResponse.json(result, {status: 200});
  }catch(err) {
    console.log(err);
    return NextResponse.json({error: "failed to load data"}, {status: 500});
  }
}
