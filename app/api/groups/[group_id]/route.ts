import { type NextRequest, NextResponse } from "next/server";
import {db} from '../../../../db';
import { group } from "../../../../db/schema";
import { eq } from "drizzle-orm";


export async function GET(req: NextRequest, {params}: {params: {id: number}}) {
  const id = params.id;
  try {
    const result = await db.select().from(group).where(eq(group.id, id));
    return NextResponse.json(result);
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: `Error Fetching group by id: ${id}`});
  }
}
