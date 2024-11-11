import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import * as icons from '@radix-ui/react-icons'
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
import React from 'react'

export function SelectIcon(): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[11.5rem]  justify-between overflow-hidden"
        >
          {value ? (
            <>{Object.keys(icons).find((framework) => framework === value)}</>
          ) : (
            'Select icon'
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select Icon" className="h-9" />
          <CommandList>
            <CommandEmpty>لا يوجد منتجات</CommandEmpty>
            <CommandGroup>
              {Object.keys(icons).map((framework) => (
                <CommandItem
                  key={framework}
                  value={framework}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === framework ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
