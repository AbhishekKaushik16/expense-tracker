import { user } from '@db/schema';
import {db} from 'db';
import { UserSchema } from 'db/types';
import { eq } from 'drizzle-orm';


export const getUserById = async (id: number) => {
  let userFound = ( await db.select().from(user).where(eq(user.id, id)).limit(1)).at(0);
    
  return UserSchema.parse(userFound);
}
