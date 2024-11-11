import {
  BadgeCheck,
  Bell,
  Box,
  ChevronsUpDown,
  DollarSign,
  Home,
  LifeBuoy,
  LogOut,
  Send,
  Settings2
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../components/ui/dropdownMenu'
import { Separator } from '../components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '../components/ui/sidebar'
import { ReactElementType } from '@/renderer/types/ReactElementType'
import { Link, useMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { User } from '@/renderer/pages/Setting/components/UserTable/column'
import { usePermissionConverter } from '@/renderer/lib/usePermissionConverter'
import ConfirmationDialog from '@/renderer/pages/Storage/components/ConfirmationDialog'
// This is sample data.
const data = {
  navMain: [
    {
      title: 'صفحة الرئسية',
      url: '/',
      isActive: false,
      icon: Home,
      disabled: false
    },
    {
      title: 'البيعات',
      isActive: false,
      url: '/Sale',
      icon: DollarSign,
      disabled: false
    },
    {
      title: 'المخزن',
      isActive: false,
      url: '/storage',
      icon: Box,
      disabled: false
    }
  ],
  navSecondary: [
    {
      title: 'الدعم',
      url: '#',
      icon: LifeBuoy,
      isActive: false,
      disabled: true
    },
    {
      title: 'تقييم',
      url: '#',
      icon: Send,
      isActive: false,
      disabled: true
    }
  ]
}

export default function Main_layout({ children }: ReactElementType): JSX.Element {
  const [user, setUser] = useState<User>({})
  const [permission, setPermission] = useState<string>('')
  useEffect(() => {
    window.api.getAuthUser().then((user) => {
      setUser(user)
    })
    if (user.permission) setPermission(usePermissionConverter(user.permission))
  }, [user.id])
  return (
    <div className="max-w-screen">
      <SidebarProvider defaultOpen={false}>
        <Sidebar collapsible="icon" side="right">
          <SidebarHeader className="flex justify-center items-center">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <h1 className="text-xl font-bold py-4">
                    <span>بن عمورة</span>
                  </h1>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>صفحات</SidebarGroupLabel>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link to={item.url}>
                      <SidebarMenuButton
                        url={item.url}
                        tooltip={item.title}
                        isActive={useMatch(item.url) ? true : false}
                        disabled={item.disabled}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.navSecondary.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild size="sm">
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={''} alt={user.username} />
                        <AvatarFallback className="rounded-lg">
                          {user.username && user.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.username}</span>
                        <span className="truncate text-xs">{permission}</span>
                      </div>
                      <ChevronsUpDown className="mr-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex rtl:flex-row-reverse items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={''} title={user.username} alt={user.username} />
                          <AvatarFallback className="rounded-lg">
                            {user.username && user.username[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left rtl:text-right text-sm leading-tight">
                          <span className="truncate font-semibold">{user.username}</span>
                          {
                            // todo fix permission show Problem}
                          }
                          <span className="truncate text-xs">{permission}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link to={'/setting'}>
                        <DropdownMenuItem>
                          <Settings2 />
                          الاعدادت
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem disabled>
                        <BadgeCheck />
                        حساب
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <Bell />
                        الاشعارات
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        window.api.logout()
                      }}
                    >
                      <LogOut />
                      تسجيل خروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <nav className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-mr-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </nav>
          </header>
          <div className="m-4 w-auto flex">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <ConfirmationDialog />
    </div>
  )
}
