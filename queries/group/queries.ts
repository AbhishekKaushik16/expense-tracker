import { db } from "db"

export const getGroupById = async (id: number) => {
  const groupData = await db.query.group.findFirst({
    with: {
      groupMembers: {
        with: {
          user: true,
        }
      }
    },
    where: (group, {eq, and}) => and(eq(group.isDeleted, false), eq(group.id, id)),
  });
  return groupData;
  
}

