export type productGroup = {
  id: number
  productName: string
  proudctDescription: string
  BrandId: string
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
  color: number
  size: string
  product_code: number
  price: number
  quantity: number
}

export type brand = {
  brandid: number
  brandName: string
}

export type colors = {
  product_id: number
  color: string
}

export type Size = {
  product_id: number
  size: string
}
