import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/placeholder";

// Disable prefetch for safe serverless usage and connection pooling (Supavisor)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
