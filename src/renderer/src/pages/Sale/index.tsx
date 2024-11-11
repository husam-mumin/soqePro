import { Card, CardContent, CardHeader, CardTitle } from '@/renderer/components/ui/card'
import { useGetProducts } from './hooks/fetch'
import { useEffect, useRef, useState } from 'react'
import { showProduct } from 'src/models/products'
import Combobox from './components/Combobox'
import SalesSection from './components/saleTable/SalesSection'
import { orderItem, paymentMethod } from 'src/models/sales'
import { Label } from '@/renderer/components/ui/label'
import { Input } from '@/renderer/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/renderer/components/ui/select'
import sound from '/sound_1.mp3'
import { Button } from '@/renderer/components/ui/button'

export default function Sale(): JSX.Element {
  const [selectData, setSelectData] = useState<showProduct>()
  const [orderItems, setOrderItems] = useState<orderItem[]>([])
  const [discount, setDiscount] = useState<number>(0)
  const [paymentMethod, setpaymentMethod] = useState<number>(1)
  const [paymentMethodList, setpaymentMethodList] = useState<paymentMethod[]>([])
  const discountRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!discountRef) return
    discountRef.current?.addEventListener('keydown', (e) => {
      e.preventDefault()
    })
  }, [])

  useEffect(() => {
    const asyncPayment = async (): Promise<void> => {
      setpaymentMethodList(await window.api.getPaymentMethod())
    }
    asyncPayment()
  }, [])
  function getOorder(): orderItem[] {
    return orderItems
  }

  const handleOrder = (product: showProduct, isAdded: boolean = true): void => {
    setSelectData(product)
    setOrderItems((items) => {
      if (items.length == 0) {
        return [
          {
            id: product.id,
            name: product.productname,
            discount: 0,
            quantity: 1,
            sell_price: product.price
          }
        ]
      }
      let there = false
      const addQuanity = items.map((e) => {
        if (e.id == product.id) {
          there = true
          return {
            id: e.id,
            name: product.productname,
            discount: e.discount,
            quantity: isAdded ? ++e.quantity : --e.quantity,
            sell_price: e.sell_price
          }
        }
        return e
      })

      if (there) return addQuanity
      return [
        ...items,
        {
          id: product.id,
          name: product.productname,
          discount: 0,
          quantity: 1,
          sell_price: product.price
        }
      ]
    })
  }
  function handleSold(): void {
    if (orderItems.length == 0) return
    window.api.getAuthUser().then((user) => {
      window.api
        .insertOrder({
          paymentMethodID: paymentMethod,
          discount: discount,
          customerID: null,
          userId: user.id
        })
        .then((e) => {
          orderItems.forEach((item) => {
            window.api.insertOrderProduct({
              productID: item.id,
              order_id: e.id,
              quentity: item.quantity,
              sellPrice: item.sell_price,
              discount: item.discount
            })
          })
          setOrderItems([])
          const aduio = new Audio(sound)
          aduio.play()
          window.api.getAuthUser().then((user) => {
            if (!user.username) return
            const postFild: string[][] = []
            orderItems.forEach((product) =>
              postFild.push([product.name, product.quantity.toString(), product.sell_price])
            )
            window.api.printReceipt({
              paymentinfomrtion: e,
              products: postFild,
              username: user.username
            })
          })
        })
    })
  }
  function totalPrice(): number {
    let total = 0

    orderItems.forEach((e) => {
      total += e.quantity * parseInt(e.sell_price.replace('$', ''))
    })
    total = total - total * (discount / 100)
    return total
  }

  const twoEnter = useRef(false)
  const handleEnterKey = (key: KeyboardEvent): void => {
    if (key.code == 'Enter' || key.code == 'NumpadEnter') {
      if (orderItems.length == 0) return
      if (twoEnter.current) handleSold()
      twoEnter.current ? (twoEnter.current = false) : (twoEnter.current = true)
    }
  }
  const products = useGetProducts()
  useEffect(() => {
    window.addEventListener('keydown', handleEnterKey)
    return (): void => {
      window.removeEventListener('keydown', handleEnterKey)
    }
  }, [orderItems])
  return (
    <div className="flex w-full">
      <div className="grow">
        <SalesSection orderItems={getOorder()} setOrderItems={setOrderItems} />
      </div>
      <Card className="w-64 grow-0 mr-8 overflow-visible">
        <CardHeader>
          <CardTitle>فاتورة</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Combobox
            data={products}
            values={selectData?.productname ? selectData.productname : ''}
            handleOrder={handleOrder}
          />
          <div className="flex items-center mt-6 justify-between gap-24">
            <Label htmlFor="dicount">الخصم</Label>
            <Input
              id="dicount"
              type="text"
              value={discount}
              onChange={(e) => {
                const value = e.currentTarget.value

                if (value === '') setDiscount(0)
                else setDiscount(parseInt(value))
              }}
            />
          </div>
          <div className="flex items-center justify-between  mt-6 gap-4">
            <Label htmlFor="PaymentMethod" className="min-w-fit">
              طريقة الدفع
            </Label>
            <Select
              value={paymentMethod.toString()}
              defaultValue={paymentMethod.toString()}
              onValueChange={(e) => setpaymentMethod(parseInt(e))}
            >
              <SelectTrigger id="PaymentMethod" className="w-24 ">
                <SelectValue placeholder="Select the payment Method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethodList.map((e) => (
                  <SelectItem key={e.id} value={e.id.toString()}>
                    {e.payment_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between mt-6">
            <Label htmlFor="total">المجموع</Label>
            <h3>{totalPrice()}</h3>
          </div>

          <Button className="mt-6" onClick={() => handleSold()}>
            بيع
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
