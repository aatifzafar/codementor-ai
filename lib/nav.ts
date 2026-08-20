import {
  LayoutDashboard,
  Bot,
  Dumbbell,
  Route,
  ChartNoAxesColumn,
  TriangleAlert,
  User,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'AI Tutor', href: '/tutor', icon: Bot },
  { title: 'Practice', href: '/practice', icon: Dumbbell },
  { title: 'Learning Path', href: '/learning-path', icon: Route },
  { title: 'Progress', href: '/progress', icon: ChartNoAxesColumn },
  { title: 'Mistakes', href: '/mistakes', icon: TriangleAlert },
  { title: 'Profile', href: '/profile', icon: User },
]
