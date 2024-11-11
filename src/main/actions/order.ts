import { orderItem, orderProduct, orders, paymentMethod } from '../../models/sales'
import { pool } from '../data/db'

export async function getPaymentMethod(): Promise<paymentMethod[]> {
  return (await pool.query<paymentMethod>('select * from payment_method')).rows
}

export async function getOrders(): Promise<orders[]> {
  return (await pool.query<orders>('SELECT * FROM showOrders')).rows
}

export async function getOrdersItems(): Promise<orderItem[]> {
  return (await pool.query<orderItem>(`SELECT * FROM showOrdersItems`)).rows
}
export async function insertPaymentMethod(data: string): Promise<paymentMethod> {
  return (
    await pool.query<paymentMethod>(
      `INSERT INTO payment_method (payment_type) VALUES ('${data}') returning *`
    )
  ).rows[0]
}

export async function insertorder(data: orders): Promise<orders> {
  return (
    await pool.query<orders>(
      `INSERT INTO orders (payment_type_id, customer_ID, discount, user_id) VALUES (${data.paymentMethodID}, ${data.customerID}, ${data.discount}, ${data.userId} ) returning *`
    )
  ).rows[0]
}

export async function insertorderProduct(data: orderProduct): Promise<orderProduct> {
  return (
    await pool.query<orderProduct>(
      `INSERT INTO order_product (product_id,sell_price, quantity, order_id, discount) VALUES (${data.productID}, '${data.sellPrice}', ${data.quentity}, ${data.order_id}, ${data.discount}) returning *`
    )
  ).rows[0]
}
