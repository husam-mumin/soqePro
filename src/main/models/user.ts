export type User_type = {
  id: number
  name: string
  phnoe: string
  createat: Date
  lastLogin: Date
  permission: 'admin' | 'seller' | 'counter'
}

export type productGroup = {
  id: number
  enteryAt: Date
  provider: number
  cost: number
}

export type productGroup_product = {
  productGroupID: number
  productID: number
}

export type product = {
  id: number
  name: string
  createat: Date
  entryBy: number // user.id
}

export type product_barcode = {
  id: number
  product_id: number
  barcode: string
}

export type colors = {
  product_id: number
  color: string
}

export type Size = {
  product_id: number
  size: string
}

export type product_varient = {
  product_id: number
  varient: string
}
