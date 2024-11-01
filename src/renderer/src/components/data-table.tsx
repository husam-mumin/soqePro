import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { showProduct } from 'src/models/products'
import { Product } from 'electron'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onDelete?: (id: number) => Product
  onEdit?: (id: Product) => Product
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>): JSX.Element {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnVisibility: {
        prodcut_code: false
      }
    },
    state: {
      columnFilters
    }
  })

  const hideColunms = (keys: string[]): { [key: string]: boolean } => {
    return keys.reduce(
      (acc, key) => {
        acc[key] = false
        return acc
      },
      {} as { [key: string]: boolean }
    )
  }
  const hiddenColumns = ['prodcut_code']
  useEffect(() => {
    hiddenColumns && table.setColumnVisibility(hideColunms(hiddenColumns))
  }, [])
  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('name')?.setFilterValue(event.target.value)
            table.getColumn('barcode')?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
