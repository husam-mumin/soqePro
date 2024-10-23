import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { useEffect, useState } from 'react'

export default function PrinterSelecter(): JSX.Element {
  const [printers, setPrinters] = useState<string[]>()
  useEffect(() => {
    window.api.getPrinters().then((response) => {
      setPrinters(response)
    })
  }, [])
  return (
    <Select>
      <SelectTrigger className="w-40 mt-8">
        <SelectValue placeholder="Select Printer" />
      </SelectTrigger>
      <SelectContent>
        {printers?.map((printer) => (
          <SelectItem value={printer} key={printer}>
            {printer}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
