import { type NextRequest, NextResponse } from "next/server";
import {db} from 'db';
import { friend } from "db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, {params} : {params: {user_id: number}}) {
  const {user_id} = params;
  try {
    const result = await db.select().from(friend).where(eq(friend.friend1, user_id));
    return NextResponse.json(result);
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: `Error Fetching user : ${user_id} friends`});
  }
}

export async function POST(req: NextRequest, {params}: {params: {user_id: number}}) {
  const {user_id} = params;

  try {
    const data = await req.json();
    const friend_ids = data["friend_ids"].split(",").map((id: string )=> parseInt(id));
    const result = friend_ids.map(async (id: number ) => {
      return [
        await db.insert(friend).values({friend1: user_id, friend2: id}),
        await db.insert(friend).values({friend1: id, friend2: user_id})
      ];
    });
    return NextResponse.json(result);
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: `Error adding user : ${user_id} friends.`});
  }
}
