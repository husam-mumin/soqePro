import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { ReactElementType } from '@renderer/types/ReactElementType'
import { useEffect, useState } from 'react'
type PrinterSelecterProps = {
  value: string
  handleOnChange: (event) => void
} & ReactElementType
export default function PrinterSelecter({
  value,
  handleOnChange
}: PrinterSelecterProps): JSX.Element {
  const [printers, setPrinters] = useState<string[]>()
  useEffect(() => {
    window.api.getPrinters().then((response) => {
      setPrinters(response)
    })
  }, [])
  return (
    <Select
      onValueChange={(e) => {
        handleOnChange(e)
      }}
      value={value}
    >
      <SelectTrigger className="w-40 ">
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
