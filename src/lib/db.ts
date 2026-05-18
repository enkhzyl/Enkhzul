import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL тохируулаагүй байна. .env.local файл үүсгэнэ үү.");
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
  }
  return pool;
}

export async function query(text: string, params?: unknown[]) {
  const client = getPool();
  const result = await client.query(text, params);
  return result;
}
