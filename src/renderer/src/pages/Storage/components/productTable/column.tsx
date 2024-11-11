import { Button } from '@/renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/renderer/components/ui/dropdownMenu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
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
      header: 'اسم',
      id: 'name'
    },
    {
      accessorKey: 'categoryname',
      header: 'تصنيف'
    },
    {
      accessorKey: 'brandname',
      header: 'ماركة'
    },
    {
      accessorKey: 'cost',
      header: 'تكلفة'
    },
    {
      accessorKey: 'price',
      header: 'سعر'
    },
    {
      accessorKey: 'quantity',
      header: 'الكمية'
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
                <span className="sr-only">نافذة</span>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>اوامر</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  onDelete(row.original.id)
                }}
              >
                حذف منتج
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onPrint(product)
                }}
              >
                طباعة ملاصق
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
