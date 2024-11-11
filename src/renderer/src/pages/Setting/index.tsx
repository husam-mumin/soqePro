import UsersSection from './components/UserTable/UsersSection'

import AddUserDialog from './components/addUserDialog'

import PrinterSelecter from './components/PrinterSelecter'

import { useEffect, useState } from 'react'
import { Button } from '@/renderer/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/renderer/components/ui/select'
import { paymentMethod } from 'src/models/sales'
import { Label } from '@/renderer/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/renderer/components/ui/popover'
import { Input } from '@/renderer/components/ui/input'

export default function Setting(): JSX.Element {
  const [defaultPrinterLabel, setDefaultPrinterLabel] = useState('')
  const [paymentMethodList, setpaymentMethodList] = useState<paymentMethod[]>([])
  const [paymentMethodValue, setpaymentMethodValue] = useState<string>('')
  const [defaultPrinter, setDefaultPrinter] = useState('')
  const [paymentOpen, setPaymentOpen] = useState(false)

  useEffect(() => {
    window.api.getDefaultLabel().then((item) => {
      setDefaultPrinterLabel(item)
    })

    window.api.getDefaultPrinter().then((item) => {
      setDefaultPrinter(item)
    })

    window.api.getPaymentMethod().then((item) => {
      setpaymentMethodList(item)
    })
  }, [])

  const handleOnChange = (item: string): void => {
    window.api.setDefaultLabel(item)

    setDefaultPrinterLabel(item)
  }

  const handleDefaultPrinter = (item: string): void => {
    window.api.setDefaultPrinter(item)

    setDefaultPrinter(item)
  }

  return (
    <div>
      <div className="w-full flex justify-end mb-4">
        <AddUserDialog />
      </div>

      <UsersSection />

      <div className="flex gap-2 items-center mt-4">
        طابعة لاصق
        <PrinterSelecter
          value={defaultPrinterLabel}
          handleOnChange={handleOnChange}
          className="flex w-52"
        />
      </div>

      <div className="flex gap-2 items-center mt-4">
        طابعة الفوتير
        <PrinterSelecter
          value={defaultPrinter}
          handleOnChange={handleDefaultPrinter}
          className="flex w-52"
        />
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Label htmlFor="PaymentMethod" className="min-w-fit">
          طريقة الدفع الافراضية
        </Label>
        <Select>
          <SelectTrigger id="PaymentMethod" className="">
            <SelectValue placeholder="Select the payment Method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethodList.map((e) => (
              <SelectItem key={e.id} value={e.id.toString()}>
                {e.payment_type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover open={paymentOpen} onOpenChange={(open) => setPaymentOpen(open)}>
          <PopoverTrigger asChild>
            <Button>اضافة</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-8">
              <div className="flex items-center  gap-10">
                <Label htmlFor="paymentMethodInput" className="min-w-fit">
                  طرق الدفع
                </Label>
                <Input
                  value={paymentMethodValue}
                  onChange={(e) => setpaymentMethodValue(e.currentTarget.value)}
                />
              </div>
              <Button
                onClick={() => {
                  if (!paymentMethodValue) return
                  window.api
                    .insertPaymentMethod(paymentMethodValue)
                    .then((e) => setpaymentMethodList((payment) => [...payment, e]))
                  setPaymentOpen(false)
                }}
              >
                حفظ
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
