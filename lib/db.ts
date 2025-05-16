import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: "7w7pk.h.filess.io",
  port: 61002,
  user: "tokoonline1_proveroute",
  password: "3208ee06922c5f020fb293166bfd1a1bee51c189",
  database: "tokoonline1_proveroute",
}

// Create a connection pool
const pool = mysql.createPool(dbConfig)

export async function query(sql: string, params?: any[]) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export default { query }
