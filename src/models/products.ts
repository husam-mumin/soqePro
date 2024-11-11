export type productGroup = {
  id: number
  name: string
  category_id: number
  brand_id: string
  entry_at: Date
  provider_id: number
  cost: number
}

export type category = {
  id: number
  name: string
}

export type provider = {
  id?: number
  name?: string
  phone?: string
  description?: string
}

export type brand = {
  id: number
  name: string
}

export type colors = {
  product_id: number
  name: string
  hex: string
}

export type size_group = {
  id: number
  name: string
}

export type Size = {
  id?: number
  size: string
  size_group_id: number
}

export type product = {
  id?: number
  brandId: number
  cost: number
  categoryId: number
  name: string
  product_code: string
  quantity: number
  providerId: number
  entryDate?: Date
  userId: number
  price: number
}

export type showProduct = {
  id: number
  categoryname: string
  productname: string
  brandname: string
  cost: number
  price: string
  prodcut_code: string
  quantity: number
  username: string
}
