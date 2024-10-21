import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import UserFormDailog from './Forms/UserForm'
import { Button } from '@renderer/components/ui/button'
import { useState } from 'react'

export default function AddUserDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const HandleCloseDalog: () => void = () => {
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button">Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>this for add user for your POS</DialogDescription>
        </DialogHeader>
        <UserFormDailog HandleCloseDialog={HandleCloseDalog} />
      </DialogContent>
    </Dialog>
  )
}
