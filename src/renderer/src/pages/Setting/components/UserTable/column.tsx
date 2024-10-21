import { ColumnDef } from '@tanstack/react-table'
import TimeAgo from 'javascript-time-ago'
import ar from 'javascript-time-ago/locale/en'

export type User = {
  id: number
  username: string
  phone: string
  createat: Date
  lastLogin: Date
  password?: string
  permission: 'admin' | 'seller' | 'counter'
}

TimeAgo.addDefaultLocale(ar)
export const columns: () => ColumnDef<User>[] = () => {
  const timeAgo = new TimeAgo('en')
  return [
    {
      accessorKey: 'username',
      header: 'Username'
    },
    {
      accessorKey: 'phone',
      header: 'Phone'
    },
    {
      accessorKey: 'lastLogin',
      header: 'last Login',
      cell: (item) => <div>{timeAgo.format(item.row.getValue<Date>('lastLogin'))}</div>
    },
    {
      accessorKey: 'permission',
      header: 'Permission'
    }
  ]
}
