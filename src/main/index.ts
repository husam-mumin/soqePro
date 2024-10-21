import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { PosPrinter, PosPrintData, PosPrintOptions } from 'electron-pos-printer'
import * as path from 'path'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const options: PosPrintOptions = {
  margin: '0 0 0 0',
  copies: 1,
  printerName: 'XP-80C',
  silent: true,
  pageSize: '80mm' // page size
}

const data: PosPrintData[] = [
  {
    type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: 'SAMPLE HEADING',
    style: { fontWeight: '700', textAlign: 'center', fontSize: '18px' }
  },
  {
    type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    value: 'Secondary text',
    style: { textDecoration: 'underline', fontSize: '10px', textAlign: 'center', color: 'red' }
  },
  {
    type: 'barCode',
    value: '023456789010',
    height: 40, // height of barcode, applicable only to bar and QR codes
    width: 2, // width of barcode, applicable only to bar and QR codes
    displayValue: true, // Display value below barcode
    fontsize: 12
  },
  {
    type: 'qrCode',
    value: 'https://github.com/Hubertformin/electron-pos-printer',
    height: 120,
    width: 120,
    style: { margin: '10 20px 20 20px' }
  },
  {
    type: 'table',
    // style the table
    style: { border: '1px solid #ddd', fontSize: '16px', fontWeight: '600' },
    // list of the columns to be rendered in the table header
    tableHeader: ['Animal', 'Age'],
    // multi dimensional array depicting the rows and columns of the table body
    tableBody: [
      ['Cat', 2],
      ['Dog', 4],
      ['Horse', 12],
      ['Pig', 4]
    ],
    // list of columns to be rendered in the table footer
    tableFooter: ['Animal', 'Age'],
    // custom style for the table header
    tableHeaderStyle: { backgroundColor: '#000', color: 'white', border: 'solid 1px #000' },
    // custom style for the table body
    tableBodyStyle: { border: '0.5px solid #ddd' },
    // custom style for the table footer
    tableFooterStyle: { backgroundColor: '#000', color: 'white' }
  },
  {
    type: 'table',
    style: { border: '1px solid #ddd' }, // style the table
    // list of the columns to be rendered in the table header
    // multi-dimensional array depicting the rows and columns of the table body
    // list of columns to be rendered in the table footer
    // custom style for the table header
    tableHeaderStyle: { backgroundColor: 'red', color: 'white' },
    // custom style for the table body
    tableBodyStyle: { border: '0.5px solid #ddd' },
    // custom style for the table footer
    tableFooterStyle: { backgroundColor: '#000', color: 'white' }
  }
]

function printReus(): void {
  PosPrinter.print(data, options)
    .then(console.log)
    .catch((error) => {
      console.error(error)
    })
}
