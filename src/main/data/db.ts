import pg from 'pg'
const { Pool, Client } = pg

export const pool = new Pool({
  user: 'hossam',
  password: 'hossam12',
  host: 'localhost',
  port: 5432,
  database: 'soqepro'
})

export async function nows(): Promise<void> {
  console.log(await pool.query('select * from users'))
}

export const client = new Client({
  user: 'hossam',
  password: 'hossam12',
  host: 'localhost',
  port: 5432,
  database: 'soqepro'
})

export async function clientt(): Promise<void> {
  await await client.connect()
  console.log((await client.query('SELECT NOW()')).rows)
  await client.end()
}
