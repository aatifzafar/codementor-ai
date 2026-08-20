'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import { navItems } from '@/lib/nav'
import { notifications } from '@/lib/mock-data'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Topbar() {
  const pathname = usePathname()
  const current =
    navItems.find((n) =>
      n.href === '/' ? pathname === '/' : pathname.startsWith(n.href),
    ) ?? navItems[0]
  const unread = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-5" />
      <h1 className="text-sm font-semibold tracking-tight">{current.title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <InputGroup className="hidden w-64 md:flex">
          <InputGroupInput placeholder="Search lessons, problems..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell data-icon />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background" />
                )}
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary">{unread} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {notifications.map((n) => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2.5">
                  <div className="flex w-full items-center gap-2">
                    {n.unread && <span className="size-1.5 rounded-full bg-primary" />}
                    <span className="text-sm font-medium">{n.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground text-pretty">{n.body}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  )
}
