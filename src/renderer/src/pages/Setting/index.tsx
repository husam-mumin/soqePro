import { Button } from '@renderer/components/ui/button'
import UsersSection from './components/UserTable/UsersSection'
import AddUserDialog from './components/addUserDialog'

export default function Setting(): JSX.Element {
  return (
    <div>
      <div className="w-full flex justify-end mb-4">
        <AddUserDialog />
      </div>
      <UsersSection />
    </div>
  )
}
