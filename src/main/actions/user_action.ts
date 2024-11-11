import { pool } from '../data/db'
import { AuthUesr, permission, User_type } from '../../models/user'

export async function getUsers(): Promise<User_type[]> {
  const data = await pool.query<User_type>('SELECT * FROM users')
  return data.rows
}

export async function insertUser({
  username,
  password,
  phone,
  permission
}: User_type): Promise<User_type[]> {
  const data = await pool.query<User_type>(
    `INSERT INTO users(username, password, phone, permission) VALUES ('${username}', '${password}','${phone}', ${permission} )`
  )
  return data.rows
}

export async function updateUser(user: User_type): Promise<boolean> {
  try {
    await pool.query(
      `UPDATE users SET username='${user.username}', phone ='${user.phone}' where id = ${user.id}`
    )
    return true
  } catch {
    return false
  }
}

export async function deleteUser(user: User_type): Promise<boolean> {
  try {
    await pool.query(`delete users where id = ${user.id}`)
    return true
  } catch {
    return false
  }
}
export async function getPermission(): Promise<permission[]> {
  const data = await pool.query<permission>('SELECT * FROM permissions')
  return data.rows
}

export async function login({ username, password }): Promise<User_type> {
  const data = await pool.query<User_type>(
    `select * from users where username = '${username}' and password = '${password}'`
  )
  const user = await data.rows[0]

  if (!user) {
    throw Error('log error')
  }

  return user
}

export async function getAuthUser(authKey: string): Promise<User_type> {
  const userid = (
    await pool.query<AuthUesr>(`select id from AuthUser where authKey_user = '${authKey}'`)
  ).rows[0]
  const user = (
    await pool.query<User_type>(
      `select id,username,phone, permssion from users where id = '${userid}'`
    )
  ).rows[0]
  return user
}
