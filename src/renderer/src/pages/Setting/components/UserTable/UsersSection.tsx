import { DataTable } from '@renderer/components/data-table'
import { columns, User } from './column'
import { faker } from '@faker-js/faker'

function getdata(): User[] {
  const userNumber = 7
  type permissointype = 'admin' | 'seller' | 'counter'
  const userPermission: permissointype[] = ['admin', 'seller', 'counter']
  const users: User[] = []
  for (let i = 0; i < userNumber; i++) {
    users.push({
      id: i,
      username: faker.internet.userName(),
      createat: faker.date.past({ years: 1 }),
      lastLogin: faker.date.between({
        from: new Date('2024-9-20'),
        to: new Date()
      }),
      phone: faker.phone.number(),
      permission: userPermission[Math.floor(Math.random() * 3)]
    })
  }
  return users
}

export default function UsersSection(): JSX.Element {
  return (
    <div>
      <DataTable columns={columns()} data={getdata()} />
    </div>
  )
}
