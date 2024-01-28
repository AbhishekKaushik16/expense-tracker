
import { relations } from "drizzle-orm";
import { serial, text, timestamp, boolean, pgTable, numeric, primaryKey, unique,integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  registrationStatus: boolean("registration_status").default(false),
  customPicture: boolean("custom_picture").default(false),
  defaultCurrency: text("default_currency"),
  locale: text("locale"),
});


export const insertUserSchema = createInsertSchema(user);

export const selectUserSchema = createSelectSchema(user);


export const group = pgTable("group", {
  id: serial("id").primaryKey(),
  title: text("title"),
  type: text("type"),
  simplifyDebt: boolean("simplify_debt").default(false),
  isDeleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
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

export const usersRelations = relations(user, ({many}) => ({
  groupMembers: many(groupMembers)
}))

export const groupRelations = relations(group, ({many}) => ({
  groupMembers: many(groupMembers),
}))

export const groupMembersRelations = relations(groupMembers, ({one}) => ({
  group: one(group, {
    fields: [groupMembers.groupId],
    references: [group.id],
  }),
  user: one(user, {
    fields: [groupMembers.userId],
    references: [user.id]
  })
}))

export const selectGroupMembersSchema = createSelectSchema(groupMembers);

export const insertGroupMembersSchema = createInsertSchema(groupMembers, {
  groupId: z.coerce.number(),
  userId: z.coerce.number()
});


export const expense = pgTable("expense", {
  id: serial("id"),
  title: text("title").notNull(),
  amount: numeric("amount").notNull(),
  details: text("details"),
  payerId: integer("payer_id").references(() => user.id).notNull(),
  groupId: integer("group_id").references(() => group.id).notNull(),
  splitEqually: boolean("split_equally").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => user.id),
  updatedAt: timestamp("updated_at"),
  updatedBy: integer("updated_by").references(() => user.id),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by").references(() => user.id),
  isDeleted: boolean("is_deleted").default(false),
}, (table) => {
    return {
      pk: primaryKey({name: "expense_pk", columns: [table.id]})
    }
  }
);

export const selectExpenseSchema = createSelectSchema(expense);

export const insertExpenseSchema = createInsertSchema(expense);


export const balance = pgTable("balance", {
  id: serial("id"),
  userId: integer("user_id").references(() => user.id),
  expenseId: integer("expense_id").references(() => expense.id),
  groupId: integer("group_id").references(() => group.id),
  paidShare: integer("paid_share"),
  owedShare: integer("owed_share"),
  netBalance: integer("net_balance"),
}, (table) => {
    return {
      pk: primaryKey({name: "balance_pk", columns: [table.id]})
    }
  }
);

export const expenseBalanceRelation = relations(expense, ({many}) => ({
  balance: many(balance)
}));

export const balanceExpenseRelation = relations(balance, ({one}) => ({
  expense: one(expense, {
    fields: [balance.expenseId],
    references: [expense.id]
  })
}));

export const selectBalanceSchema = createSelectSchema(balance);

export const insertBalanceSchema = createInsertSchema(balance);


export const friend = pgTable("friend", {
  id: serial("id"),
  friend1: integer("friend_1").references(() => user.id),
  friend2: integer("friend_2").references(() => user.id),
}, (table) => {
    return {
      unk: unique("friend_uk").on(table.friend1, table.friend2)
    }
  }
);

export const selectFriendSchema = createSelectSchema(friend);

export const insertFriendSchema = createInsertSchema(friend);
