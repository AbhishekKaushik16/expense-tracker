import {type NextRequest, NextResponse } from "next/server";
import {db} from '../../../../../../db';
import { group, groupMembers, insertGroupMembersSchema } from "../../../../../../db/schema";
import { and, eq, inArray } from "drizzle-orm";
// TODO: check if group and users exists
//
//
export async function PUT (req: NextRequest, {params}: {params: {group_id: number, user_ids: string}}) {
  const groupId = params.group_id;
  const userIds = params.user_ids?.split(",") || [];
  try {
    const data = userIds.map(userId => insertGroupMembersSchema.parse({userId: parseInt(userId), groupId}));
    console.log(data);
    const result = await db.insert(groupMembers).values([...data]);
    return NextResponse.json(result);
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: `Error adding users: ${userIds} to group : ${groupId}`}, {status: 500});
  }

}

export async function DELETE (req: NextRequest, {params} : {params: {group_id: number, user_ids: string}}) {
  const groupId = params.group_id;
  const userIds = params.user_ids?.split(",").map(id => parseInt(id)) || [];
  try {
    const data = await db.delete(groupMembers).where(and(eq(groupMembers.groupId, groupId), inArray(groupMembers.userId, userIds))).returning();
    return NextResponse.json(data);
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: `Error Deleting users: ${userIds} from group: ${groupId}`}, {status: 500});
  }
}
