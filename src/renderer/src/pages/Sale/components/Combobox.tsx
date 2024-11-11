import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/renderer/components/ui/command'
import { cn } from '@/renderer/lib/utils'
import { ReactElementType } from '@/renderer/types/ReactElementType'
import { Check } from 'lucide-react'
import React, { useRef } from 'react'
import { showProduct } from 'src/models/products'

type SaleCombobox = {
  data: showProduct[]
  values: string
  handleOrder: (product: showProduct, isAdded?: boolean) => void
} & ReactElementType

export default function Combobox({ data, values, handleOrder }: SaleCombobox): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [selectProduct, setSelectProduct] = React.useState<showProduct | null>(null)
  const [value, setValue] = React.useState('')

  const addtoSelectProduct = (product): void => {
    setValue('')
    setOpen(false)
    handleOrder(product)
    setSelectProduct(product)
  }

  const handlekeyDown = (key: KeyboardEvent): void => {
    if (!inputRef) return
    if (key.code == 'Enter' || key.code == 'NumpadEnter') {
      if (!inputRef.current?.value)
        // const isWord = /\w/i

        // if (isWord.test(key.key) && !key.ctrlKey && !key.altKey && !key.shiftKey)
        //   inputRef.current?.focus()
        // else {
        //   inputRef.current?.blur()
        // }
        return
      data.map((e) => {
        if (e.prodcut_code == inputRef.current?.value) addtoSelectProduct(e)
      })
    }

    if (!selectProduct) return

    if (key.code === 'NumpadSubtract') {
      handleOrder(selectProduct, false)
    }

    if (key.code === 'NumpadAdd') {
      handleOrder(selectProduct)
    }
  }

  React.useEffect(() => {
    setValue(values)
    window.addEventListener('keydown', handlekeyDown)
    return (): void => {
      window.removeEventListener('keydown', handlekeyDown)
    }
  }, [data])

  return (
    <Command className="relative overflow-visible">
      <CommandInput
        placeholder="بحث"
        ref={inputRef}
        className="peer-first:focus:block"
        value={value}
        onBlur={() => setOpen(false)}
        onChangeCapture={(e) => {
          setValue(e.currentTarget.value)
          setOpen(true)
        }}
      />
      <CommandList
        className={`${!open ? 'hidden' : ''} absolute top-12 left-0 z-10 bg-background w-full ring-1 rounded-md`}
      >
        <CommandEmpty> لا يوجد</CommandEmpty>
        <CommandGroup>
          {data.map((framework) => (
            <CommandItem
              key={framework.id}
              value={framework.productname}
              onSelect={() => {
                setOpen(false)
                addtoSelectProduct(framework)
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === framework.productname ? 'opacity-100' : 'opacity-0'
                )}
              />
              {framework.productname}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
