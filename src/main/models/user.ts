export type User_type = {
  id: number
  name: string
  phnoe: string
  createat: Date
  lastLogin: Date
  permission: 'admin' | 'seller' | 'counter'
}
