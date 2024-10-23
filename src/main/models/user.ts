export type User_type = {
  id: number
  username: string
  password: string
  phone: string
  createat: Date
  lastLogin: Date
  permission: 'admin' | 'seller' | 'counter'
}
