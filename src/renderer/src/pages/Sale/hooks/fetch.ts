import { showProduct } from 'src/models/products'
import { useEffect, useState } from 'react'

export function useGetProducts(): showProduct[] {
  const [product, setProduct] = useState<showProduct[]>([])
  useEffect(() => {
    const getData = async (): Promise<void> => {
      setProduct(await window.api.getShowProducts())
    }
    getData()
  }, [])
  return product
}
