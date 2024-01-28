import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {db} from 'db';
import { user } from "db/schema";
// TODO: implement authentication and getting current user from auth
export async function GET() {

  try {
    const result = await db.select().from(user); 
    return NextResponse.json(result);
  }catch (err) {
    console.log(err);
     return NextResponse.json({ error: 'failed to load current user data' }, {status: 500})
  }
}
