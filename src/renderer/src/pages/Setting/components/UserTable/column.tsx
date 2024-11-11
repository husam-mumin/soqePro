import { usePermissionConverter } from '../../../../lib/usePermissionConverter'
import { ColumnDef } from '@tanstack/react-table'
import TimeAgo from 'javascript-time-ago'
import ar from 'javascript-time-ago/locale/en'

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
      header: 'اسم المستخدم',
      id: 'name'
    },
    {
      accessorKey: 'phone',
      header: 'رقم الهاتف'
    },
    {
      accessorKey: 'lastLogin',
      header: 'اخر تسجيل دخول',
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
      header: 'صلاحية',
      cell: (item) => <div>{usePermissionConverter(item.row.getValue<number>('permission'))}</div>
    }
  ]
}
