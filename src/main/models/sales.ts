export type SaleTransaction = {
  id: number
  createAt: Date
  paymentMethodID: number
  discount?: number
  customerID?: number
}

export type SaleTransaction_Product = {
  saleTransactionID: number
  productID: number
  quentity: number
}

export type paymentMethod = {
  id: number
  name: string
}
