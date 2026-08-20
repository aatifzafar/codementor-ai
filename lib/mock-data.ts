export type SkillKey =
  | 'variables'
  | 'loops'
  | 'functions'
  | 'oop'
  | 'data-structures'
  | 'algorithms'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export const user = {
  name: 'Aatif',
  fullName: 'Aatif Rahman',
  email: 'aatif@codementor.ai',
  avatar: '/student-avatar.png',
  experience: 'Intermediate',
  preferredLanguage: 'Python',
  joinedAt: 'March 2025',
  dailyTargetMinutes: 45,
  learningGoals: 'Master OOP and Data Structures to prepare for technical interviews.',
}

export const streak = {
  current: 12,
  longest: 28,
  weeklyGoal: 5,
  daysThisWeek: 4,
  // last 7 days activity, most recent last
  activeDays: [true, true, false, true, true, true, false],
}

export const overallProgress = {
  percent: 68,
  level: 7,
  xp: 3420,
  xpToNext: 4000,
  problemsSolved: 214,
  accuracy: 87,
  avgSolveTimeMin: 9.4,
}

export type Skill = {
  key: SkillKey
  name: string
  mastery: number
  lessonsCompleted: number
  totalLessons: number
  trend: number
  color: string
}

export const skills: Skill[] = [
  { key: 'variables', name: 'Variables', mastery: 94, lessonsCompleted: 12, totalLessons: 12, trend: 3, color: 'var(--chart-4)' },
  { key: 'loops', name: 'Loops', mastery: 88, lessonsCompleted: 10, totalLessons: 11, trend: 14, color: 'var(--chart-2)' },
  { key: 'functions', name: 'Functions', mastery: 91, lessonsCompleted: 14, totalLessons: 15, trend: 6, color: 'var(--chart-1)' },
  { key: 'oop', name: 'OOP', mastery: 48, lessonsCompleted: 6, totalLessons: 16, trend: 9, color: 'var(--chart-5)' },
  { key: 'data-structures', name: 'Data Structures', mastery: 62, lessonsCompleted: 8, totalLessons: 18, trend: 5, color: 'var(--chart-3)' },
  { key: 'algorithms', name: 'Algorithms', mastery: 54, lessonsCompleted: 7, totalLessons: 20, trend: 4, color: 'var(--chart-2)' },
]

export const radarData = skills.map((s) => ({
  skill: s.name,
  mastery: s.mastery,
}))

export const weeklyActivity = [
  { day: 'Mon', minutes: 52, problems: 6 },
  { day: 'Tue', minutes: 38, problems: 4 },
  { day: 'Wed', minutes: 0, problems: 0 },
  { day: 'Thu', minutes: 64, problems: 8 },
  { day: 'Fri', minutes: 45, problems: 5 },
  { day: 'Sat', minutes: 71, problems: 9 },
  { day: 'Sun', minutes: 0, problems: 0 },
]

export const masteryTrend = [
  { week: 'W1', mastery: 41 },
  { week: 'W2', mastery: 47 },
  { week: 'W3', mastery: 52 },
  { week: 'W4', mastery: 58 },
  { week: 'W5', mastery: 61 },
  { week: 'W6', mastery: 68 },
]

export const aiInsight =
  "You've improved significantly in loops (+14% this week), but you're still struggling with inheritance in OOP. Focus your next few sessions on how child classes call parent constructors."

export const continueLearning = {
  title: 'Inheritance & Polymorphism',
  topic: 'Object-Oriented Programming',
  lesson: 'Lesson 7 of 16',
  progress: 42,
  estimatedMin: 15,
}

export type Recommendation = {
  id: string
  title: string
  reason: string
  type: 'Lesson' | 'Practice' | 'Review'
  skill: string
  difficulty: Difficulty
  estimatedMin: number
}

export const recommendations: Recommendation[] = [
  { id: 'r1', title: 'Calling super() in Child Classes', reason: 'Based on 7 recent mistakes in OOP', type: 'Lesson', skill: 'OOP', difficulty: 'Medium', estimatedMin: 12 },
  { id: 'r2', title: 'Build a Linked List from Scratch', reason: 'Strengthens Data Structures (62%)', type: 'Practice', skill: 'Data Structures', difficulty: 'Medium', estimatedMin: 25 },
  { id: 'r3', title: 'Loop Conditions Refresher', reason: 'Quick review to lock in your gains', type: 'Review', skill: 'Loops', difficulty: 'Easy', estimatedMin: 8 },
]

export type Activity = {
  id: string
  action: string
  detail: string
  time: string
  status: 'success' | 'info' | 'warning'
}

export const recentActivity: Activity[] = [
  { id: 'a1', action: 'Solved', detail: 'Reverse a String (Easy)', time: '2h ago', status: 'success' },
  { id: 'a2', action: 'Completed lesson', detail: 'Introduction to Classes', time: '5h ago', status: 'info' },
  { id: 'a3', action: 'Struggled with', detail: 'Fibonacci with Recursion', time: 'Yesterday', status: 'warning' },
  { id: 'a4', action: 'Solved', detail: 'FizzBuzz (Easy)', time: 'Yesterday', status: 'success' },
  { id: 'a5', action: 'Earned badge', detail: '7-Day Streak', time: '2 days ago', status: 'info' },
]

export type Problem = {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  skill: string
  language: string
  estimatedMin: number
  recommended?: boolean
  acceptance: number
  tags: string[]
}

export const problems: Problem[] = [
  {
    id: 'p1',
    title: 'Student Class',
    description: "Create a Python class called Student that stores a student's name and marks, with a method to compute their average.",
    difficulty: 'Easy',
    skill: 'Classes & Objects',
    language: 'Python',
    estimatedMin: 10,
    recommended: true,
    acceptance: 78,
    tags: ['OOP', 'Classes'],
  },
  {
    id: 'p2',
    title: 'Inheritance: Vehicle Hierarchy',
    description: 'Model a Vehicle base class and a Car subclass that correctly calls the parent constructor using super().',
    difficulty: 'Medium',
    skill: 'Inheritance',
    language: 'Python',
    estimatedMin: 18,
    recommended: true,
    acceptance: 61,
    tags: ['OOP', 'Inheritance'],
  },
  {
    id: 'p3',
    title: 'Two Sum',
    description: 'Given an array of integers and a target, return indices of the two numbers that add up to the target.',
    difficulty: 'Easy',
    skill: 'Arrays & Hashing',
    language: 'Python',
    estimatedMin: 15,
    acceptance: 72,
    tags: ['Data Structures', 'Hashing'],
  },
  {
    id: 'p4',
    title: 'Implement a Stack',
    description: 'Build a Stack class supporting push, pop, peek, and is_empty operations with O(1) complexity.',
    difficulty: 'Medium',
    skill: 'Data Structures',
    language: 'Python',
    estimatedMin: 22,
    recommended: true,
    acceptance: 66,
    tags: ['Data Structures', 'Stack'],
  },
  {
    id: 'p5',
    title: 'Binary Search',
    description: 'Implement binary search on a sorted list and return the index of the target, or -1 if not found.',
    difficulty: 'Medium',
    skill: 'Algorithms',
    language: 'Python',
    estimatedMin: 20,
    acceptance: 58,
    tags: ['Algorithms', 'Searching'],
  },
  {
    id: 'p6',
    title: 'Merge Sort',
    description: 'Implement the merge sort algorithm recursively and analyze its time complexity.',
    difficulty: 'Hard',
    skill: 'Algorithms',
    language: 'Python',
    estimatedMin: 35,
    acceptance: 44,
    tags: ['Algorithms', 'Recursion'],
  },
  {
    id: 'p7',
    title: 'Word Frequency Counter',
    description: 'Read a paragraph and return a dictionary of each word and how many times it appears.',
    difficulty: 'Easy',
    skill: 'Dictionaries',
    language: 'Python',
    estimatedMin: 12,
    acceptance: 81,
    tags: ['Data Structures'],
  },
  {
    id: 'p8',
    title: 'Polymorphism: Shape Areas',
    description: 'Create a Shape base class and Circle/Rectangle subclasses that each override an area() method.',
    difficulty: 'Medium',
    skill: 'Polymorphism',
    language: 'Python',
    estimatedMin: 20,
    acceptance: 63,
    tags: ['OOP', 'Polymorphism'],
  },
]

export type PathNode = {
  id: string
  title: string
  description: string
  lessons: number
  problems: number
  completion: number
  mastery: 'Locked' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastered'
  status: 'completed' | 'in-progress' | 'locked'
}

export const learningPath: PathNode[] = [
  { id: 'n1', title: 'Python Fundamentals', description: 'Syntax, variables, data types, and I/O.', lessons: 12, problems: 24, completion: 100, mastery: 'Mastered', status: 'completed' },
  { id: 'n2', title: 'Control Flow', description: 'Conditionals, loops, and iteration patterns.', lessons: 11, problems: 22, completion: 100, mastery: 'Advanced', status: 'completed' },
  { id: 'n3', title: 'Functions', description: 'Parameters, scope, recursion, and lambdas.', lessons: 15, problems: 30, completion: 93, mastery: 'Advanced', status: 'in-progress' },
  { id: 'n4', title: 'Object-Oriented Programming', description: 'Classes, inheritance, and polymorphism.', lessons: 16, problems: 32, completion: 38, mastery: 'Beginner', status: 'in-progress' },
  { id: 'n5', title: 'Data Structures', description: 'Lists, stacks, queues, trees, and graphs.', lessons: 18, problems: 40, completion: 12, mastery: 'Beginner', status: 'locked' },
  { id: 'n6', title: 'Algorithms', description: 'Searching, sorting, and complexity analysis.', lessons: 20, problems: 44, completion: 0, mastery: 'Locked', status: 'locked' },
  { id: 'n7', title: 'Advanced Python', description: 'Decorators, generators, and concurrency.', lessons: 14, problems: 28, completion: 0, mastery: 'Locked', status: 'locked' },
]

export type Mistake = {
  id: string
  title: string
  occurrences: number
  lastSeen: string
  concept: string
  severity: 'high' | 'medium' | 'low'
  example: string
}

export const mistakes: Mistake[] = [
  {
    id: 'm1',
    title: 'Forgetting self in Python classes',
    occurrences: 7,
    lastSeen: 'Today',
    concept: 'OOP',
    severity: 'high',
    example: 'def get_average(marks): → def get_average(self):',
  },
  {
    id: 'm2',
    title: 'Incorrect loop conditions',
    occurrences: 4,
    lastSeen: 'Yesterday',
    concept: 'Loops',
    severity: 'medium',
    example: 'for i in range(1, len(arr) - 1): skips the last element',
  },
  {
    id: 'm3',
    title: 'Confusing == and =',
    occurrences: 3,
    lastSeen: '3 days ago',
    concept: 'Operators',
    severity: 'medium',
    example: 'if x = 5: → if x == 5:',
  },
  {
    id: 'm4',
    title: 'Not calling super() in subclass constructor',
    occurrences: 3,
    lastSeen: '4 days ago',
    concept: 'OOP',
    severity: 'high',
    example: 'Child.__init__ never calls super().__init__()',
  },
  {
    id: 'm5',
    title: 'Off-by-one index errors',
    occurrences: 2,
    lastSeen: '5 days ago',
    concept: 'Data Structures',
    severity: 'low',
    example: 'arr[len(arr)] raises IndexError',
  },
]

export const strengths = [
  { skill: 'Variables', mastery: 94 },
  { skill: 'Functions', mastery: 91 },
  { skill: 'Loops', mastery: 88 },
]

export const weaknesses = [
  { skill: 'Object-Oriented Programming', mastery: 48 },
  { skill: 'Algorithms', mastery: 54 },
  { skill: 'Data Structures', mastery: 62 },
]

export const aiRecommendations = [
  'Practice inheritance and polymorphism for the next 3 sessions.',
  'Review the difference between instance and class methods.',
  'Attempt 2 medium-difficulty Data Structures problems this week.',
]

export const notifications = [
  { id: 'nt1', title: 'Daily goal almost there', body: 'Just 12 minutes left to hit your 45-min target.', time: '10m ago', unread: true },
  { id: 'nt2', title: 'New recommended problem', body: 'Inheritance: Vehicle Hierarchy is ready for you.', time: '1h ago', unread: true },
  { id: 'nt3', title: 'Streak milestone', body: 'You reached a 12-day streak. Keep it going!', time: '3h ago', unread: false },
]
