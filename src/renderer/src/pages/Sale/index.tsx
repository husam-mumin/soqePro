import { Button } from '@renderer/components/ui/button'
import { useState } from 'react'

export default function Sale(): JSX.Element {
  const [orderNumber, setOrderNumber] = useState()
  const [porductC, setProductC] = useState()
  const [invoice, setInvoice] = useState()
  return (
    <div>
      <Button
        onClick={() => {
          window.electron.ipcRenderer.send('printRe')
        }}
      >
        print
      </Button>
    </div>
  )
}
