import { Button } from '@renderer/components/ui/button'
import '../../assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@renderer/components/theme-provider'
import { Card, CardContent, CardFooter, CardHeader } from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'

export default function LoginPage(): JSX.Element {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <Input type="text" name="username" placeholder="Username" />
          <Input type="password" name="password" placeholder="Password" />
        </CardContent>
        <CardFooter>
          <Button type="submit">Login</Button>
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
