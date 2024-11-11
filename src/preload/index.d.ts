import { ReceiptType } from './../main/index'
import { category } from './../main/models/products'
import { ElectronAPI } from '@electron-toolkit/preload'
import { Permissions } from '@renderer/pages/Setting/components/Forms/UserForm'
import { User } from '@renderer/pages/Setting/components/UserTable/column'
import { brand } from '@renderer/pages/Storage/page/InsertItemFrom'
import { product, provider, showProduct } from 'src/models/products'
import { orderProduct, orders, paymentMethod } from 'src/models/sales'

type showCatogory = {
  counts: number
} & category
type Size = {
  id?: number
  name: string
  size_group_id: number
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getPrinters: () => Promise<string[]>
      getUsers: () => Promise<User[]>
      insertUser: (user: User) => Promise<User>
      getPermissions: () => Promise<Permissions[]>
      getAuthUser: () => Promise<User>
      logout: () => void
      insertCategoris: (name: string) => Promise<category>
      getCategoris: () => Promise<showCatogory[]>
      getBrand: () => Promise<brand[]>
      insertBrand: (data: string) => Promise<brand | null>
      insertProvider: (data: provider) => Promise<provider>
      getProviders: () => Promise<provider[]>
      testProductCode: (data: string) => Promise<booelan>
      insertProduct: (data: product) => Promise<product>
      getProducts: () => Promise<product[]>
      getShowProducts: () => Promise<showProduct[]>
      deleteProduct: (id: number) => Promise<product>
      setDefaultLabel: (data: string) => void
      getDefaultLabel: () => Promise<string>
      printLabel: (data) => void
      getDefaultPrinter: () => Promise<string>
      setDefaultPrinter: (data) => void
      insertOrder: (data: orders) => Promise<orders>
      insertOrderProduct: (data: orderProduct) => Promise<orderProduct>
      insertPaymentMethod: (data: string) => Promise<paymentMethod>
      getPaymentMethod: () => Promise<paymentMethod[]>
      printReceipt: (data: ReceiptType) => void
    }
    login: {
      login: (user: User) => Promise<User>
    }
  }
}
