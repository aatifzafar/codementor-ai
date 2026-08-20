'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  User as UserIcon,
  Mail,
  Calendar,
  Flame,
  Trophy,
  Target,
  Bell,
  Sliders,
  Code2,
  GraduationCap,
  Check,
} from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader, StatCard } from '@/components/ui-bits'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { user, streak, overallProgress } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const experienceLevels = ['Beginner', 'Intermediate', 'Advanced']
const languages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go']

export default function ProfilePage() {
  const [dailyTarget, setDailyTarget] = useState(user.dailyTargetMinutes)
  const [experience, setExperience] = useState(user.experience)
  const [language, setLanguage] = useState(user.preferredLanguage)
  const [prefs, setPrefs] = useState({
    hints: true,
    autoReview: true,
    lineByLine: false,
    encouragement: true,
  })
  const [notifs, setNotifs] = useState({
    dailyReminder: true,
    streakAlerts: true,
    recommendations: true,
    weeklyReport: false,
  })

  function save(section: string) {
    toast.success(`${section} saved`, {
      description: 'Your changes have been updated.',
    })
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Profile & Settings"
        description="Manage your account, tune how your AI tutor teaches you, and control your notifications."
      />

      {/* Identity header */}
      <Card>
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
          <Image
            src={user.avatar || "/placeholder.svg"}
            alt={`${user.fullName}'s avatar`}
            width={80}
            height={80}
            className="size-20 shrink-0 rounded-full border border-border object-cover"
          />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <Badge className="border-transparent bg-primary/12 text-primary">
                Level {overallProgress.level}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="size-3.5" />
                {user.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                Joined {user.joinedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Code2 className="size-3.5" />
                {user.preferredLanguage}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Current Streak" value={`${streak.current} days`} icon={Flame} sub={`Longest: ${streak.longest} days`} />
        <StatCard label="Problems Solved" value={String(overallProgress.problemsSolved)} icon={Trophy} sub={`${overallProgress.accuracy}% accuracy`} />
        <StatCard label="Total XP" value={overallProgress.xp.toLocaleString()} icon={Target} sub={`${overallProgress.xpToNext - overallProgress.xp} XP to Level ${overallProgress.level + 1}`} />
      </div>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <UserIcon data-icon="inline-start" />
            Account
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Sliders data-icon="inline-start" />
            Tutor
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell data-icon="inline-start" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Account */}
        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account details</CardTitle>
              <CardDescription>
                Update your personal information and learning background.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                    <Input id="fullName" defaultValue={user.fullName} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Experience level</FieldLabel>
                    <Select value={experience} onValueChange={(v) => setExperience(v as string)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((lvl) => (
                          <SelectItem key={lvl} value={lvl}>
                            {lvl}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Preferred language</FieldLabel>
                    <Select value={language} onValueChange={(v) => setLanguage(v as string)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="goals">Learning goals</FieldLabel>
                  <Textarea id="goals" rows={3} defaultValue={user.learningGoals} />
                  <FieldDescription>
                    Your tutor uses this to prioritize what to teach you next.
                  </FieldDescription>
                </Field>
              </FieldGroup>

              <Separator />
              <div className="flex justify-end">
                <Button onClick={() => save('Account details')}>
                  <Check data-icon="inline-start" />
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutor preferences */}
        <TabsContent value="preferences" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>How your tutor teaches</CardTitle>
              <CardDescription>
                Fine-tune the AI tutor&apos;s teaching style to match how you learn best.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="daily-target">Daily practice target</FieldLabel>
                  <span className="text-sm font-medium tabular-nums text-primary">
                    {dailyTarget} min
                  </span>
                </div>
                <Slider
                  id="daily-target"
                  min={15}
                  max={120}
                  step={15}
                  value={[dailyTarget]}
                  onValueChange={(v) => setDailyTarget((Array.isArray(v) ? v[0] : v) as number)}
                />
                <FieldDescription>
                  We&apos;ll pace your lessons and reminders around this goal.
                </FieldDescription>
              </Field>

              <Separator />

              <div className="flex flex-col gap-1">
                {(
                  [
                    { key: 'hints', title: 'Progressive hints', desc: 'Reveal hints step by step instead of the full answer.' },
                    { key: 'autoReview', title: 'Auto code review', desc: 'Automatically analyze your code after each submission.' },
                    { key: 'lineByLine', title: 'Line-by-line explanations', desc: 'Break down solutions one line at a time.' },
                    { key: 'encouragement', title: 'Encouraging tone', desc: 'Get motivational feedback along with corrections.' },
                  ] as const
                ).map((item, i, arr) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.desc}</span>
                      </div>
                      <Switch
                        checked={prefs[item.key]}
                        onCheckedChange={(checked) =>
                          setPrefs((p) => ({ ...p, [item.key]: checked }))
                        }
                      />
                    </div>
                    {i < arr.length - 1 && <Separator />}
                  </div>
                ))}
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button onClick={() => save('Tutor preferences')}>
                  <Check data-icon="inline-start" />
                  Save preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what you want to hear about and when.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                {(
                  [
                    { key: 'dailyReminder', title: 'Daily practice reminder', desc: "A nudge when you haven't hit your daily target." },
                    { key: 'streakAlerts', title: 'Streak alerts', desc: 'Warn me before I lose my streak.' },
                    { key: 'recommendations', title: 'New recommendations', desc: 'Notify me when the tutor suggests new problems.' },
                    { key: 'weeklyReport', title: 'Weekly progress report', desc: 'A summary of my progress every Sunday.' },
                  ] as const
                ).map((item, i, arr) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.desc}</span>
                      </div>
                      <Switch
                        checked={notifs[item.key]}
                        onCheckedChange={(checked) =>
                          setNotifs((n) => ({ ...n, [item.key]: checked }))
                        }
                      />
                    </div>
                    {i < arr.length - 1 && <Separator />}
                  </div>
                ))}
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button onClick={() => save('Notification settings')}>
                  <Check data-icon="inline-start" />
                  Save settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
