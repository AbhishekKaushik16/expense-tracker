import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {db} from 'db';
import { getUserById } from "queries/user/query";
import { insertUserSchema, user } from "db/schema";

export async function GET(req: NextRequest, { params } : {params: { id: number}}) {
  const { id } = params;
  try {
    const result = await getUserById(id);
    return NextResponse.json(result);
  }catch (err) {
    console.log(err);
     return NextResponse.json({ error: 'failed to load data' }, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newUser = insertUserSchema.parse(body);
    
    const result = await db.insert(user).values(newUser).returning();
    return NextResponse.json(result, {status: 200});
  }catch(err) {
    console.log(err);
    return NextResponse.json({error: "failed to load data"}, {status: 500});
  }
}
