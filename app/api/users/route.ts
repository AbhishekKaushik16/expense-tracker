import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {db} from '../../../db';
import { insertUserSchema, user } from "../../../db/schema";
import { getUserById } from "queries/user/query";

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
    const newUser = insertUserSchema.parse(body);
    
    const data = await db.insert(user).values(newUser).returning({ id: user.id });
    
    if(data[0] !== undefined) {
      return NextResponse.json(await getUserById(data[0].id), {status: 200});
    }else {
      throw("User created, but failed getting its id.")
    }
  }catch(err) {
    console.log(err);
    return NextResponse.json({error: "failed to load data"}, {status: 500});
  }
}
