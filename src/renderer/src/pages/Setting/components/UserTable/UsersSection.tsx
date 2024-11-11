import { DataTable } from '@/renderer/components/data-table'
import { columns, User } from './column'
import { useEffect, useState } from 'react'

export default function UsersSection(): JSX.Element {
  const [data, setData] = useState<User[]>([])
  useEffect(() => {
    function getdata(): void {
      window.api.getUsers().then((data) => {
        setData(data)
      })
    }
    getdata()
  }, [])
  return (
    <div>
      <DataTable columns={columns()} data={data} />
    </div>
  )
}
