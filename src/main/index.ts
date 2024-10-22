import { Bar } from 'recharts'
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { PosPrinter, PosPrintData, PosPrintOptions } from 'electron-pos-printer'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    fullscreen: true,
    show: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  ipcMain.on('printRe', () => {
    printReus()
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
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
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

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
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

const labelprinter = () => {
  const widthByCM = 3.5
  const heightByCM = 2.5
  const cmToPixel = 37.795
  const width = widthByCM * cmToPixel
  const height = heightByCM * cmToPixel

  const window = new BrowserWindow({
    width: widthByCM * cmToPixel,
    height: heightByCM * cmToPixel,
    show: true
  })

  window.loadFile('./Reports/label.html')

  window.webContents.print({
    pageSize: { height: height, width: width },
    margins: { marginType: 'default' }
  })
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const options: PosPrintOptions = {
  margin: '2 0 2 0',
  copies: 1,
  printerName: 'Xprinter XP-237B', // write the print name in the computer
  silent: true, // print with out ask
  pageSize: '44mm' // page size
}

const data: PosPrintData[] = [
  {
    type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: 'SAMPLE HEADING',
    style: { fontWeight: '700', fontSize: '8px' }
  },
  {
    type: 'barCode',
    value: '023456789010',
    height: '40', // height of barcode, applicable only to bar and QR codes
    width: '1', // width of barcode, applicable only to bar and QR codes
    displayValue: true, // Display value below barcode
    fontsize: 12
  }
]

function printReus(): void {
  labelprinter()
}
