export type User_type = {
  id: number
  username: string
  password: string
  phone: string
  createat: Date
  lastLogin: Date
  permission: number
}

export type permission = {
  id: number
  name: string | 'owner' | 'admin' | 'seller' | 'counter'
}

export type AuthUesr = {
  id_user: number
  authKey: string
}
