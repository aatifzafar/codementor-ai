'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Flame } from 'lucide-react'
import { navItems } from '@/lib/nav'
import { streak, user } from '@/lib/mock-data'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <Link
          href="/"
          onClick={() => setOpenMobile(false)}
          className="flex items-center gap-2.5 px-1 py-2"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">CodeMentor AI</span>
            <span className="text-xs text-muted-foreground">Learn. Practice. Master.</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                    >
                      <Link href={item.href} onClick={() => setOpenMobile(false)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-warning/15 text-warning">
                  <Flame className="size-4" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{streak.current}-day streak</p>
                  <p className="text-xs text-muted-foreground">
                    {streak.daysThisWeek}/{streak.weeklyGoal} days this week
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                {streak.activeDays.map((active, i) => (
                  <div
                    key={i}
                    className={
                      'h-1.5 flex-1 rounded-full ' +
                      (active ? 'bg-warning' : 'bg-sidebar-border')
                    }
                  />
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <Link
          href="/profile"
          onClick={() => setOpenMobile(false)}
          className="flex items-center gap-3 rounded-lg px-1 py-1.5 transition-colors hover:bg-sidebar-accent"
        >
          <Avatar className="size-9">
            <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.fullName} />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium">{user.fullName}</span>
            <span className="truncate text-xs text-muted-foreground">{user.experience}</span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
