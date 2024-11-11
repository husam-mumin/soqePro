import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/renderer/components/ui/dialog'
import UserFormDailog from './Forms/UserForm'
import { Button } from '@/renderer/components/ui/button'
import { useState } from 'react'

export default function AddUserDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const HandleCloseDalog: () => void = () => {
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button">اضافة مستخدم</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة مستخدم</DialogTitle>
          <DialogDescription>اضافة مستخدم الي البرنامج</DialogDescription>
        </DialogHeader>
        <UserFormDailog HandleCloseDialog={HandleCloseDalog} />
      </DialogContent>
    </Dialog>
  )
}
