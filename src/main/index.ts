import { Bar } from 'recharts'
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { PosPrinter, PosPrintData, PosPrintOptions } from 'electron-pos-printer'
import { error } from 'console'

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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const options: PosPrintOptions = {
  margin: '0 0 0 0',
  copies: 2,
  boolean: false,
  pageSize: { height: 10, width: 30 } // page size
}

const data: PosPrintData[] = [
  {
    type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: 'SAMPLE HEADING',
    style: {
      fontWeight: '800',
      fontSize: '12px',
      textAlign: 'center',
      marginBottom: '-10px',
      position: 'relative',
      zIndex: '10'
    }
  },
  {
    type: 'barCode',
    value: '023456789010',
    height: '40', // height of barcode, applicable only to bar and QR codes
    width: '1', // width of barcode, applicable only to bar and QR codes
    displayValue: true, // Display value below barcode
    position: 'center'
  },
  {
    type: 'text',
    value: 'name or product (sz)',
    style: {
      marginTop: '-12px',
      fontSize: '14px',
      textAlign: 'center',
      position: 'relative',
      zIndex: '10'
    }
  }
]

function printReus(): void {
  PosPrinter.print(data, options)
    .then(() => {
      console.log()
    })
    .catch((error) => {
      console.error(error)
    })
}
