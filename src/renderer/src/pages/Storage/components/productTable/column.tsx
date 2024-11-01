import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdownMenu'
import { Input } from '@renderer/components/ui/input'
import { Popover } from '@renderer/components/ui/popover'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { showProduct } from 'src/models/products'

type rowAction = {
  onEdit?: (showProduct) => void
  onDelete: (id: number) => void
  onPrint: (product: showProduct) => void
}

export const getProductCulumns = ({ onDelete, onPrint }: rowAction): ColumnDef<showProduct>[] => {
  return [
    {
      accessorKey: 'productname',
      header: 'Name',
      id: 'name'
    },
    {
      accessorKey: 'categoryname',
      header: 'Category'
    },
    {
      accessorKey: 'brandname',
      header: 'Brand'
    },
    {
      accessorKey: 'cost',
      header: 'Cost'
    },
    {
      accessorKey: 'price',
      header: 'Price'
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity'
    },
    {
      id: 'barcode',
      accessorKey: 'prodcut_code',
      enableHiding: true
    },
    {
      id: 'actions',
      enableHiding: false,
      size: 5,
      maxSize: 10,
      cell: ({ row }): JSX.Element => {
        const product = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  onDelete(row.original.id)
                }}
              >
                Delete Product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onPrint(product)
                }}
              >
                print Label
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
