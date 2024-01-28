import { z } from "zod";
import { selectUserSchema } from "./schema";

export interface Picture {
  id: string;
  small: string;
  medium: string;
  large: string;
}

export interface Notification {
  id: string;
  type: number;
  created_at: string;
  created_by: number;
  image_url: string;
  image_shape: string;
  content: string;
}



export interface CurrentUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  registration_status: string;
  picture: Picture;
  custom_picture: boolean;
  notification_read: string;
  notification_count: number;
  notifications: Notification[];
  default_currency: string;
  locale: string;
}

export type User = Pick<CurrentUser, "id" | "first_name" | "last_name" | "email" | "registration_status" | "picture" | "custom_picture">;



export interface Balance {
  currency_code: string;
  amount: number;
  from: number;
  to: number;
}

export type GroupMember = User & Balance;

export interface Avatar {
  id: string;
  original: string;
  xxlarge: string;
  xlarge: string;
  large: string;
  medium: string;
  small: string;
}

export interface Group {
  id: number;
  name: string;
  group_type: string;
  updated_at: string;
  simplify_by_default: boolean;
  members: GroupMember[];
  original_debts: Balance[];
  simplified_debts: Balance[];
  avatar: Avatar;
  custom_avatar: boolean;
  cover_photo: Avatar;
  invite_link: string;
}


export const UserSchema =  selectUserSchema;

export const customInsertExpenseSchema = z.object({
  title: z.string(),
  amount: z.number(),
  description: z.string(),
  details: z.string(),
  group_id: z.number(),
  payer_id: z.number(),
  split_equally: z.boolean()
});
