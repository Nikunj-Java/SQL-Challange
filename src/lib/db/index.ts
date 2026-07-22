import mysql from "mysql2/promise";

const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

function createPool() {
  return mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export const pool = globalForDb.pool ?? createPool();
if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export async function query<T>(sql: string, params?: unknown[]): Promise<T> {
  const [rows] = await pool.execute(sql, params as any);
  return rows as T;
}

export async function queryOne<T>(sql: string, params?: unknown[]): Promise<T | null> {
  const [rows] = await pool.execute(sql, params as any);
  const arr = rows as T[];
  return arr.length > 0 ? arr[0] : null;
}

export async function insert(sql: string, params?: unknown[]): Promise<number> {
  const [result] = await pool.execute(sql, params as any);
  return (result as mysql.ResultSetHeader).insertId;
}

export async function update(sql: string, params?: unknown[]): Promise<number> {
  const [result] = await pool.execute(sql, params as any);
  return (result as mysql.ResultSetHeader).affectedRows;
}
