
import { serial, text, timestamp, boolean, pgTable, numeric, primaryKey, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {z} from 'zod';

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  countryCode: text("country_code").default("+91"),
  phoneNumber: text("phone_number"),
});


export const insertUserSchema = createInsertSchema(user, {
  email: (schema) => schema.email.email(),
  phoneNumber: (schema) => schema.phoneNumber.length(10),
  role: z.enum(["admin", "customer"])
});

export const selectUserSchema = createSelectSchema(user);



export const group = pgTable("group", {
  id: serial("id").primaryKey(),
  title: text("title"),
  simplifyDebt: boolean("simplify_debt").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const selectGroupSchema = createSelectSchema(group);

export const insertGroupSchema = createInsertSchema(group);

export const groupMembers = pgTable("group_members", {
  groupId: integer("group_id").references(() => group.id),
  userId: integer("user_id").references(() => user.id),
}, (table) => {
    return {
      pkWithCustomName: primaryKey({name: "group_members_pk", columns: [table.userId, table.groupId] }),
    }
  }
);

export const selectGroupMembersSchema = createSelectSchema(groupMembers);

export const insertGroupMembersSchema = createInsertSchema(groupMembers, {
  groupId: (s) => s.groupId.int(),
  userId: (s) => s.userId.int(),
});

export const expenseType = pgTable("expense_type", {
  id: serial("id"),
  name: text("name"),
  label: text("label")
}, (table) => {
    return {
      pk: primaryKey({name: "expense_type_pk", columns: [table.id]})
    }
  }
);

export const selectExpenseTypeSchema = createSelectSchema(expenseType);

export const insertExpenseTypeSchema = createInsertSchema(expenseType);

export const expense = pgTable("expense", {
  id: serial("id"),
  title: text("title"),
  amount: numeric("amount"),
  payerId: integer("payer_id").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  expenseType: integer("id").references(() => expenseType.id)
}, (table) => {
    return {
      pk: primaryKey({name: "expense_pk", columns: [table.id]})
    }
  }
);

export const selectExpenseSchema = createSelectSchema(expense);

export const insertExpenseSchema = createInsertSchema(expense);


export const expenseShareSplit = pgTable("expense_share_split", {
  id: serial("id"),
  user: integer("id").references(() => user.id),
  split: numeric("split"),
}, (table) => {
    return {
      pk: primaryKey({name: "expense_share_split_pk", columns: [table.id]})
    }
  }
);

export const selectExpenseShareSplitSchema = createSelectSchema(expenseShareSplit);

export const insertExpenseShareSplitSchema = createInsertSchema(expenseShareSplit);

export const groupExpenses = pgTable("group_expense", {
  groupId: integer("group_id").references(() => group.id),
  expenseId: integer("expense_id").references(() => expense.id),
}, (table) => {
    return {
      pkWithCustomName: primaryKey({name: "group_expenes_pk", columns: [table.groupId, table.expenseId]}),
    }
  }
);

export const selectGroupExpenseSchema = createSelectSchema(groupExpenses);

export const insertGroupExpenseSchema = createInsertSchema(groupExpenses);
