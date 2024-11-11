import { app, shell, BrowserWindow, ipcMain } from 'electron'
import settings from 'electron-settings'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { PrinterNameList } from './helpers/getPrintersNames'
import { getPermission, getUsers, insertUser, login } from './actions/user_action'
import { User_type } from '../models/user'
import {
  deleteProduct,
  getBrands,
  getCategoris,
  getProducts,
  getProviders,
  getShowProducts,
  insertBrand,
  insertCategory,
  insertProduct,
  insertProvider,
  testProductCode
} from './actions/product_action'

import { PosPrinter, PosPrintData, PosPrintOptions } from 'electron-pos-printer'
import * as path from 'path'
import {
  getPaymentMethod,
  insertorder,
  insertorderProduct,
  insertPaymentMethod
} from './actions/order'
import { orders } from '../models/sales'

// defining backup file name
async function LabelPrinter(data: {
  marketName?: string
  copies: number
  barcode: string
  name: string
  price: number
}): Promise<void> {
  const printerName = await getDefaultLabel()
  const options: PosPrintOptions = {
    preview: false,
    margin: '0 0 0 0',
    copies: data.copies,
    boolean: true,
    timeOutPerLine: 400,
    printerName: printerName,
    silent: true,
    pageSize: '44mm' // page size
  }

  const ps: PosPrintData[] = [
    {
      type: 'text',
      style: {
        margin: '0 0 -8px 0',
        zIndex: '10',
        position: 'relative',
        textAlign: 'center',
        fontSize: '12px',
        fontFamily: 'system-ui'
      },
      position: 'center',
      value: data.marketName
    },
    {
      type: 'barCode',
      style: { zIndex: '1', backgroundColor: 'trans' },
      position: 'center',
      value: data.barcode,
      displayValue: true,
      height: '30',
      width: '1',
      fontsize: 8
    },
    {
      type: 'text',
      style: {
        margin: '-12px 0 0 0',
        zIndex: '10',
        position: 'relative',
        display: 'block',
        fontSize: '11px',
        fontFamily: 'system-ui'
      },
      value: data.name
    },
    {
      type: 'text',
      style: {
        zIndex: '10',
        position: 'absolute',
        display: 'block',
        right: '22px',
        top: '66px',
        fontSize: '12px',
        fontFamily: 'system-ui'
      },
      position: 'center',
      value: 'سعر:' + data.price
    }
  ]

  PosPrinter.print(ps, options)
    .then(console.log)
    .catch((error) => {
      console.error(error)
    })
}

export type ReceiptType = {
  username: string
  products: string[][]
  paymentinfomrtion: orders
}

async function printReceipt(data: ReceiptType): Promise<void> {
  const defaultPrinter = await getDefaultPrinter()

  const options: PosPrintOptions = {
    preview: false,
    margin: '0 0',
    silent: true,
    copies: 1,
    boolean: true,
    timeOutPerLine: 400,
    printerName: defaultPrinter,
    pageSize: { width: 252, height: 1200 },
    printBackground: true // page size
  }

  const total = 0
  data.paymentinfomrtion.customerID == 0

  const date: string = data.paymentinfomrtion.entryat
    ? data.paymentinfomrtion.entryat?.toLocaleString()
    : new Date().toLocaleString()
  if (!data.products) return
  const dataprint: PosPrintData[] = [
    {
      type: 'text',
      value: 'بن عمورة',
      style: { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }
    },
    {
      type: 'text',
      value: data.username + ': المستخدم',
      style: { textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }
    },
    {
      type: 'text',
      value: data.paymentinfomrtion.id + ': فاتورة رقم',
      style: { textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }
    },
    {
      type: 'text',
      value: date + ': تاريخ',
      style: { textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }
    },
    {
      type: 'table',
      style: { border: '1px solid #ddd' },
      tableHeader: ['الاسم', 'الكمية', 'السعر'],
      tableBody: data.products,
      tableFooter: ['مجموع', '-', total.toString()],
      tableHeaderStyle: { backgroundColor: '#000', color: 'white' },
      // custom style for the table body
      tableBodyStyle: { border: '0.5px solid #ddd' },
      // custom style for the table footer
      tableFooterStyle: { backgroundColor: '#000', color: 'white' }
    }
  ]

  PosPrinter.print(dataprint, options)
    .then(console.log)
    .catch((error) => {
      console.log(error)
    })
}
async function setDefaultLabel(data): Promise<void> {
  await settings.set('defaultLabel', {
    name: data
  })
}
async function getDefaultLabel(): Promise<string> {
  const data = await settings.get('defaultLabel.name')
  if (!data) return ''
  if (typeof data == 'string') return data
  return ''
}

async function getDefaultPrinter(): Promise<string> {
  const data = await settings.get('defaultPrinter.name')
  if (!data) return ''
  if (typeof data == 'string') return data
  return ''
}
async function setdefaultPrinter(data: string): Promise<void> {
  await settings.set('defaultPrinter', {
    name: data
  })
}
function createWindow(data: User_type): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  ipcMain.removeHandler('getPrinters')
  ipcMain.removeHandler('insertUser')
  ipcMain.removeHandler('getUsers')
  ipcMain.removeHandler('getPermissions')
  ipcMain.removeHandler('getAuthUser')
  ipcMain.removeHandler('getCategoris')
  ipcMain.removeHandler('insertCategoris')
  ipcMain.removeHandler('getbrand')
  ipcMain.removeHandler('insertBrand')
  ipcMain.removeHandler('insertProvider')
  ipcMain.removeHandler('getProviders')
  ipcMain.removeHandler('testProductCode')
  ipcMain.removeHandler('insertProduct')
  ipcMain.removeHandler('getProducts')
  ipcMain.removeHandler('getShowProducts')
  ipcMain.removeHandler('deleteProduct')
  ipcMain.removeHandler('getDefaultLabel')
  ipcMain.removeHandler('getDefaultPrinter')
  ipcMain.removeHandler('insertOrder')
  ipcMain.removeHandler('insertOrderProduct')
  ipcMain.removeHandler('insertPaymentMethod')
  ipcMain.removeHandler('getPaymentMethod')
  ipcMain.handle('getPaymentMethod', () => getPaymentMethod())
  ipcMain.handle('insertOrder', (_, data) => insertorder(data))
  ipcMain.handle('insertOrderProduct', (_, data) => insertorderProduct(data))
  ipcMain.handle('insertPaymentMethod', (_, data) => insertPaymentMethod(data))
  ipcMain.on('printReceipt', (_, data) => printReceipt(data))
  ipcMain.handle('getDefaultPrinter', () => getDefaultPrinter())
  ipcMain.on('setDefaultPrinter', (_, data) => setdefaultPrinter(data))
  ipcMain.on('printLabel', (_, data) => {
    LabelPrinter(data)
  })
  ipcMain.on('defaultLebal', (_, data) => {
    console.log('work in main' + ' ' + data)

    setDefaultLabel(data)
  })
  ipcMain.handle('getDefaultLabel', () => getDefaultLabel())
  ipcMain.handle('deleteProduct', (_, id) => deleteProduct(id))
  ipcMain.handle('getShowProducts', () => getShowProducts())
  ipcMain.handle('getProducts', () => getProducts())
  ipcMain.handle('insertProduct', (_, data) => insertProduct(data))
  ipcMain.handle('testProductCode', (_, data) => testProductCode(data))
  ipcMain.handle('getProviders', () => getProviders())
  ipcMain.handle('insertProvider', (_, data) => insertProvider(data))
  ipcMain.handle('insertBrand', (_, data) => insertBrand(data))
  ipcMain.handle('getbrand', () => getBrands())
  ipcMain.handle('getCategoris', () => getCategoris())
  ipcMain.handle('insertCategoris', (_, data) => insertCategory(data))
  ipcMain.handle('getPrinters', () => PrinterNameList())
  ipcMain.handle('insertUser', (_, user) => insertUser(user))
  ipcMain.handle('getUsers', () => getUsers())
  ipcMain.handle('getPermissions', () => getPermission())

  ipcMain.handle('getAuthUser', () => data)
  ipcMain.on('logout', () => {
    loginWindow()
    mainWindow.close()
    ipcMain.removeAllListeners()
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

function loginWindow(): void {
  const loadinWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      sandbox: true,
      preload: path.join(__dirname, '../preload/login.js'),
      contextIsolation: true
    }
  })
  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    loadinWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/login.html`)
  } else {
    loadinWindow.loadFile(path.join(__dirname, '../renderer/login.html'))
  }

  ipcMain.handle('login', (_, user: User_type) => {
    login({ username: user.username, password: user.password }).then((data) => {
      if (!data) return

      loadinWindow.close()
      createWindow(data)
      ipcMain.removeHandler('login')
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // createWindow()
  loginWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) loginWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
