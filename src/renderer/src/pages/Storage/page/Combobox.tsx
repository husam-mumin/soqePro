import { Button } from '@/renderer/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/renderer/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/renderer/components/ui/popover'
import { cn } from '@/renderer/lib/utils'
import { ReactElementType } from '@/renderer/types/ReactElementType'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useEffect } from 'react'
import { setPrps } from './InsertItemFrom'

export default function Combobox({
  data,
  values,
  className,
  setCateogry
}: {
  data: setPrps[]
  setCateogry: React.Dispatch<React.SetStateAction<setPrps | null>>
  values: string
} & ReactElementType): JSX.Element {
  const [open, setOpen] = React.useState(false)

  const [value, setValue] = React.useState('')
  useEffect(() => {
    setValue(values)
  }, [values])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between ', !value && 'text-muted-foreground', className)}
        >
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          {value ? data.find((framework) => framework.name === value)?.name : 'أختار'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="بحث" />
          <CommandList>
            <CommandEmpty>لا منتجات</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setCateogry(framework)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 rtl:ml-3 h-4 w-4',
                      value === framework.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
