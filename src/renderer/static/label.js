import { ipcRenderer } from 'electron'
import jsbarcode from 'jsbarcode'
let marketNameDiv = document.getElementById('market_Name')
let barcodeDiv = document.getElementById('barcode')
let nameDiv = document.getElementById('name')
let priceDiv = document.getElementById('price')
document.body.style.backgroundColor = '#000'
ipcRenderer.send('sentdata')
ipcRenderer.on(
  'sentedData',
  (_, data: { marketName: string; productCode: string; name: string; price: string }): void => {
    marketNameDiv?.textContent = data.marketName
    jsbarcode('#barcode', data.productCode)
    nameDiv?.textContent = data.name
    priceDiv?.textContent = data.price
  }
)
