import { orders, orderProduct, paymentMethod } from './../models/sales'
import { User_type as User } from './../models/user'
import { contextBridge, ipcRenderer } from 'electron'
import { brand, category, product, provider, showProduct } from '../models/products'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be enabled in the BrowserWindow')
}

const api = {
  getPrinters: (): Promise<string[]> => ipcRenderer.invoke('getPrinters'),
  getUsers: (): Promise<User[]> => {
    return ipcRenderer.invoke('getUsers')
  },
  insertUser: (user: User): Promise<User> => ipcRenderer.invoke('insertUser', user),
  getPermissions: (): Promise<Permissions[]> => ipcRenderer.invoke('getPermissions'),
  getAuthUser: (): Promise<User> => ipcRenderer.invoke('getAuthUser'),
  logout: (): void => ipcRenderer.send('logout'),
  insertCategoris: (name: string): Promise<category[]> =>
    ipcRenderer.invoke('insertCategoris', name),
  getCategoris: (): Promise<category[]> => ipcRenderer.invoke('getCategoris'),
  getBrand: (): Promise<brand[]> => ipcRenderer.invoke('getbrand'),
  insertBrand: (data: string): Promise<brand | null> => ipcRenderer.invoke('insertBrand', data),
  insertProvider: (data: provider): Promise<provider> => ipcRenderer.invoke('insertProvider', data),
  getProviders: (): Promise<provider[]> => ipcRenderer.invoke('getProviders'),
  testProductCode: (data: string): Promise<boolean> => ipcRenderer.invoke('testProductCode', data),
  insertProduct: (data: product): Promise<product> => ipcRenderer.invoke('insertProduct', data),
  getProducts: (): Promise<product[]> => ipcRenderer.invoke('getProducts'),
  getShowProducts: (): Promise<showProduct[]> => ipcRenderer.invoke('getShowProducts'),
  deleteProduct: (id: number): Promise<product> => ipcRenderer.invoke('deleteProduct', id),
  setDefaultLabel: (data: string): void => ipcRenderer.send('defaultLebal', data),
  getDefaultLabel: (): Promise<string> => ipcRenderer.invoke('getDefaultLabel'),
  printLabel: (data): void => ipcRenderer.send('printLabel', data),
  getDefaultPrinter: (): Promise<string> => ipcRenderer.invoke('getDefaultPrinter'),
  setDefaultPrinter: (data: string): void => ipcRenderer.send('setDefaultPrinter', data),
  insertOrder: (data): Promise<orders> => ipcRenderer.invoke('insertOrder', data),
  insertOrderProduct: (data): Promise<orderProduct> =>
    ipcRenderer.invoke('insertOrderProduct', data),
  insertPaymentMethod: (data): Promise<paymentMethod> =>
    ipcRenderer.invoke('insertPaymentMethod', data),
  getPaymentMethod: (): Promise<paymentMethod[]> => ipcRenderer.invoke('getPaymentMethod'),
  printReceipt: (data): void => ipcRenderer.send('printReceipt', data)
}
try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
