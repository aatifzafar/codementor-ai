'use client'

import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { navItems } from '@/lib/nav'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group'

export function Topbar() {
  const pathname = usePathname()
  const current =
    navItems.find((n) =>
      n.href === '/' ? pathname === '/' : pathname.startsWith(n.href),
    ) ?? navItems[0]

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

        <ThemeToggle />
      </div>
    </header>
  )
}
