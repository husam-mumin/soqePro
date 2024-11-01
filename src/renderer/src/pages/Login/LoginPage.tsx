import { Button } from '@renderer/components/ui/button'
import '../../assets/main.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@renderer/components/theme-provider'
import { Card, CardContent, CardFooter, CardHeader } from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { User } from '../Setting/components/UserTable/column'

export default function LoginPage(): JSX.Element {
  const [user, setUser] = useState<User>({ username: '', password: '' })
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Input
            type="text"
            onChange={(e) =>
              setUser((i) => {
                return { ...i, username: e.target.value }
              })
            }
            name="username"
            placeholder="Username"
          />
          <Input
            type="password"
            onChange={(e) =>
              setUser((i) => {
                return { ...i, password: e.target.value }
              })
            }
            name="password"
            placeholder="Password"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              console.log(user)

              window.login.login(user)
            }}
            className="mt-6"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <LoginPage />
    </ThemeProvider>
  </React.StrictMode>
)
