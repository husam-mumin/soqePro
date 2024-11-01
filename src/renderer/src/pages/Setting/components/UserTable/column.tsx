import { ColumnDef } from '@tanstack/react-table'
import TimeAgo from 'javascript-time-ago'
import ar from 'javascript-time-ago/locale/en'
import { usePermissionConverter } from '@renderer/lib/usePermissionConverter'

export type User = {
  id?: number
  username?: string
  phone?: string
  lastLogin?: Date
  createAt?: Date
  password?: string
  permission?: number
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
      cell: (item) => (
        <div>
          {item.row.getValue<Date>('lastLogin')
            ? timeAgo.format(item.row.getValue<Date>('lastLogin'))
            : 'not'}
        </div>
      )
    },
    {
      accessorKey: 'permission',
      header: 'Permission',
      cell: (item) => <div>{usePermissionConverter(item.row.getValue<number>('permission'))}</div>
    }
  ]
}
