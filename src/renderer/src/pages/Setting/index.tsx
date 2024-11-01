import UsersSection from './components/UserTable/UsersSection'
import AddUserDialog from './components/addUserDialog'
import PrinterSelecter from './components/PrinterSelecter'
import { Label } from '@renderer/components/ui/label'
import { useEffect, useState } from 'react'

export default function Setting(): JSX.Element {
  const [defaultPrinterLabel, setDefaultPrinterLabel] = useState('')
  useEffect(() => {
    window.api.getDefaultLabel().then((item) => {
      setDefaultPrinterLabel(item)
    })
  }, [])
  const handleOnChange = (item: string): void => {
    window.api.setDefaultLabel(item)
    setDefaultPrinterLabel(item)
  }
  return (
    <div>
      <div className="w-full flex justify-end mb-4">
        <AddUserDialog />
      </div>
      <UsersSection />

      <div className="flex gap-2 items-center mt-4">
        Label Printer
        <PrinterSelecter
          value={defaultPrinterLabel}
          handleOnChange={handleOnChange}
          className="flex w-52"
        />
      </div>
    </div>
  )
}
