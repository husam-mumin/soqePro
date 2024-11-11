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
import { orderItem } from 'src/models/sales'

export const columns: () => ColumnDef<orderItem>[] = () => {
  return [
    {
      accessorKey: 'name',
      header: 'الاسم'
    },
    {
      accessorKey: 'sell_price',
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
      cell: (): JSX.Element => {
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
              <DropdownMenuItem>حذف منتج</DropdownMenuItem>
              <DropdownMenuItem>طابعة ملصق</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
