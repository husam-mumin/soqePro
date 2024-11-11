export type orders = {
  id?: number
  entryat?: Date
  paymentMethodID?: number
  discount?: string | number
  customerID?: number | null
  userId?: number
}

export type orderProduct = {
  id?: number
  productID: number
  sellPrice: string
  quentity: number
  order_id: number | undefined
  discount: string | number
}

export type paymentMethod = {
  id: number
  payment_type: string
}

export type customer = {
  id: number
  name: string
}

export type showOrders = {
  id: number
  name: string
  quantity: number
  entryat: Date
  payment_type: string
  discount: number
  customername: string
}

export type orderItem = {
  id: number
  name: string
  sell_price: string
  quantity: number
  discount: number
  entryat?: Date
  username?: string
}
