import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import {sql} from '@vercel/postgres';
import { db } from "./index";
import './config';
(async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
  await sql.end();
})();
