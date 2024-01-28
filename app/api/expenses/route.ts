import { balance, expense, insertBalanceSchema, insertExpenseSchema } from "@db/schema";
import { db } from "db";
import { type NextRequest, NextResponse } from "next/server";
import { getGroupById } from "queries/group/queries";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newExpenseData = insertExpenseSchema.parse(body);
    const groupData = await getGroupById(newExpenseData.groupId);
    const users = groupData?.groupMembers;
    if(!users || users?.length === 0) throw(`No User Found in group: ${newExpenseData.groupId}`);
    
    const [ { expenseId } ] = await db.insert(expense).values(newExpenseData).returning({expenseId: expense.id});
    
    if(newExpenseData.splitEqually) {
      // Split the amount equally among group users
      const owedShare = parseFloat(newExpenseData.amount) / users?.length ;
      const insertedData = users?.map(async user => {
        const paidShare = user.userId === newExpenseData.payerId ? parseFloat( newExpenseData.amount ) : 0.0;
        const netBalance = paidShare - owedShare;
        const newBalance =  insertBalanceSchema.parse({
          userId: user.userId,
          groupId: user.groupId,
          expenseId: expenseId,
          owedShare,
          paidShare,
          netBalance
        });
        return await db.insert(balance).values(newBalance);
      });
      return NextResponse.json(insertedData);
    }
  }catch(err) {
    console.log(err);
    return NextResponse.json({message: err}, {status: 500});
  }
}
