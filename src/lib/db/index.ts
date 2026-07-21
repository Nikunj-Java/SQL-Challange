import mysql, { ResultSetHeader, QueryValue } from "mysql2/promise";

const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

function createPool() {
  return mysql.createPool({
    uri: process.env.DATABASE_URL!,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export const pool = globalForDb.pool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export async function query<T>(
  sql: string,
  params: QueryValue[] = []
): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

export async function queryOne<T>(
  sql: string,
  params: QueryValue[] = []
): Promise<T | null> {
  const [rows] = await pool.execute(sql, params);
  const arr = rows as T[];
  return arr.length ? arr[0] : null;
}

export async function insert(
  sql: string,
  params: QueryValue[] = []
): Promise<number> {
  const [result] = await pool.execute(sql, params);
  return (result as ResultSetHeader).insertId;
}

export async function update(
  sql: string,
  params: QueryValue[] = []
): Promise<number> {
  const [result] = await pool.execute(sql, params);
  return (result as ResultSetHeader).affectedRows;
}