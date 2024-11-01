'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@renderer/components/ui/button'
import { DialogClose, DialogFooter } from '@renderer/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { User } from '../UserTable/column'
import { useEffect, useState } from 'react'

export type Permissions = {
  id: number
  name: string
}

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.'
    }),
    confirm: z.string(),
    phone: z.string(),
    permission: z.string()
  })
  .refine((data) => data.password == data.confirm, {
    message: "Password don't match",
    path: ['confirm']
  })

export default function UserFormDailog({
  HandleCloseDialog
}: {
  HandleCloseDialog: () => void
}): JSX.Element {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phone: '',
      password: '',
      confirm: '',
      permission: 'seller'
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const user: User = {
      username: values.username,
      password: values.password,
      phone: values.phone,
      permission: Number(values.permission)
    }
    const a = await window.api.insertUser(user)
    console.log(a)

    HandleCloseDialog()
  }

  const [permissions, setPermissions] = useState<Permissions[]>([])
  useEffect(() => {
    const pyfun = async (): Promise<void> => {
      const data = await window.api.getPermissions()
      console.log(data)

      setPermissions(data)
    }
    pyfun()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-[15rem]">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="User Name" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="flex flex-col justify-between gap-7">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormDescription>Your Phone Number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-between">
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>rewrite your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permission</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Permission Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {permissions &&
                        permissions.map((permission) => (
                          <SelectItem key={permission.id} value={permission.id.toString()}>
                            {permission.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>You can manage email addresses in your </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'secondary'}>
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
