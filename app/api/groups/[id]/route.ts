import { type NextRequest, NextResponse } from "next/server";
import { getGroupById } from "queries/group/queries";


export async function GET(req: NextRequest, {params}: {params: {id: number}}) {
  const id = params.id;
  try {
    const result = await getGroupById(id);
    return NextResponse.json(result);
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: `Error Fetching group by id: ${id}`});
  }
}
