import { DataTable } from '@/renderer/components/data-table'
import React, { useState } from 'react'
import { columns } from './column'
import { orderItem } from 'src/models/sales'
import { Dispatch } from 'redux'
import { ReactElementType } from '@/renderer/types/ReactElementType'

type salesSectionType = {
  orderItems: orderItem[]
  setOrderItems: React.Dispatch<React.SetStateAction<orderItem[]>>
} & ReactElementType

export default function SalesSection({ orderItems }: salesSectionType): JSX.Element {
  return (
    <div>
      <DataTable data={orderItems} columns={columns()} />
    </div>
  )
}
