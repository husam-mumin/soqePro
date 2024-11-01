import { contextBridge, ipcRenderer } from 'electron'
import { User } from '../../renderer/src/pages/Setting/components/UserTable/column'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be enabled in the BrowserWindow')
}

const api = {
  login: (user: User): Promise<User> => {
    return ipcRenderer.invoke('login', user)
  }
}
try {
  contextBridge.exposeInMainWorld('login', api)
} catch (error) {
  console.error(error)
}
