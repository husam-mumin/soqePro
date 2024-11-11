import { pool } from '../data/db'
import {
  brand,
  category,
  product,
  productGroup,
  provider,
  showProduct
} from '../../models/products'

// Provider
export async function getProviders(): Promise<provider[]> {
  const data = await pool.query<provider>(`SELECT * FROM provider`)
  return data.rows
}

export async function getProvider(id: number): Promise<provider> {
  const data = await pool.query<provider>(`SELECT * FROM provider where id = '${id}'`)
  return data.rows[0]
}

// Products
export async function getProducts(): Promise<product[]> {
  const data = await pool.query<product>(`SELECT * FROM product`)
  return data.rows
}

export async function getProdcut(id: number): Promise<product> {
  const data = await pool.query<product>(`SELECT * FROM product where id = '${id}'`)
  return data.rows[0]
}

export async function getProductGroups(): Promise<productGroup[]> {
  const data = await pool.query<productGroup>(`SELECT * FROM product_group`)
  return data.rows
}

export async function getProductGroup(id: number): Promise<productGroup> {
  const data = await pool.query<productGroup>(`SELECT * FROM product_group where id = '${id}'`)
  return data.rows[0]
}

// get utlits

export async function getBrands(): Promise<brand[]> {
  const data = await pool.query<brand>(`SELECT * FROM brand`)
  return data.rows
}

export async function getCategoris(): Promise<category[]> {
  const data = await pool.query<category>(`SELECT * FROM showCategory`)
  return data.rows
}

export async function insertCategory(category: string): Promise<category[]> {
  try {
    return (
      await pool.query<category>(`INSERT INTO category (name) values ('${category}') returning *`)
    ).rows
  } catch {
    return []
  }
}

export async function insertBrand(brands: string): Promise<brand | null> {
  try {
    return (await pool.query(`INSERT INTO brand (name) VALUES ('${brands}') returning *`)).rows[0]
  } catch {
    return null
  }
}

export async function insertProvider(provider: provider): Promise<provider> {
  return (
    await pool.query(
      `INSERT INTO provider (name, phone, description) VALUES ('${provider.name}', '${provider.phone}', '${provider.description}') returning *`
    )
  ).rows[0]
}

export async function insertProduct(product: product): Promise<product> {
  return (
    await pool.query(
      `INSERT INTO product ( name, category_id, brand_id, provider_id, cost, price, prodcut_code, quantity, user_id ) VALUES ('${product.name}', ${product.categoryId}, ${product.brandId}, ${product.providerId}, ${product.cost}, ${product.price}, '${product.product_code}', ${product.quantity}, ${product.userId}) returning *`
    )
  ).rows[0]
}

export async function testProductCode(data: string): Promise<boolean> {
  const product = await pool.query<product>(
    `SELECT prodcut_code FROM product WHERE prodcut_code = '${data}'`
  )

  if (product.rowCount == 0) return true

  return false
}

export async function getShowProducts(): Promise<showProduct[]> {
  return (await pool.query<showProduct>(`SELECT * FROM showProduct`)).rows
}

export async function deleteProduct(id: number): Promise<product> {
  return (await pool.query(`DELETE FROM product WHERE id=${id} RETURNING *`)).rows[0]
}
