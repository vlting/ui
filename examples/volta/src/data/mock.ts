// ---------------------------------------------------------------------------
// Mock Users
// ---------------------------------------------------------------------------

export interface MockUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastActive: string
  initials: string
  bio: string
  startDate: string
  tags: string[]
}

export const mockUsers: MockUser[] = [
  { id: '1',  name: 'Aria Chen',       email: 'aria@volta.dev',     role: 'Admin',     status: 'active',   lastActive: '2026-02-20', initials: 'AC', bio: 'Founder & CEO. Loves product and people.',                      startDate: '2023-01-15', tags: ['leadership', 'product', 'strategy'] },
  { id: '2',  name: 'Marcus Webb',     email: 'marcus@volta.dev',   role: 'Engineer',  status: 'active',   lastActive: '2026-02-20', initials: 'MW', bio: 'Full-stack engineer focused on infrastructure.',                  startDate: '2023-03-01', tags: ['typescript', 'infrastructure', 'devops'] },
  { id: '3',  name: 'Priya Nair',      email: 'priya@volta.dev',    role: 'Designer',  status: 'active',   lastActive: '2026-02-19', initials: 'PN', bio: 'Product designer with a systems thinking approach.',              startDate: '2023-04-10', tags: ['design', 'figma', 'accessibility'] },
  { id: '4',  name: 'James Okafor',    email: 'james@volta.dev',    role: 'Engineer',  status: 'active',   lastActive: '2026-02-18', initials: 'JO', bio: 'Backend engineer specialising in distributed systems.',           startDate: '2023-06-05', tags: ['rust', 'backend', 'databases'] },
  { id: '5',  name: 'Sophie Laurent',  email: 'sophie@volta.dev',   role: 'Marketing', status: 'active',   lastActive: '2026-02-20', initials: 'SL', bio: 'Growth marketer and brand storyteller.',                         startDate: '2023-07-20', tags: ['growth', 'content', 'brand'] },
  { id: '6',  name: 'Ethan Park',      email: 'ethan@volta.dev',    role: 'Engineer',  status: 'inactive', lastActive: '2026-02-01', initials: 'EP', bio: 'Mobile engineer building cross-platform experiences.',            startDate: '2023-09-12', tags: ['react-native', 'mobile', 'ios'] },
  { id: '7',  name: 'Lena Fischer',    email: 'lena@volta.dev',     role: 'Product',   status: 'active',   lastActive: '2026-02-20', initials: 'LF', bio: 'Product manager connecting dots across teams.',                   startDate: '2023-10-01', tags: ['product', 'roadmap', 'metrics'] },
  { id: '8',  name: 'David Kim',       email: 'david@volta.dev',    role: 'Engineer',  status: 'active',   lastActive: '2026-02-19', initials: 'DK', bio: 'Frontend engineer obsessed with performance.',                   startDate: '2023-11-15', tags: ['react', 'performance', 'web'] },
  { id: '9',  name: 'Amara Diallo',    email: 'amara@volta.dev',    role: 'Design',    status: 'active',   lastActive: '2026-02-18', initials: 'AD', bio: 'Motion designer and creative lead.',                             startDate: '2024-01-08', tags: ['motion', 'animation', 'creative'] },
  { id: '10', name: 'Noah Brooks',     email: 'noah@volta.dev',     role: 'Sales',     status: 'active',   lastActive: '2026-02-17', initials: 'NB', bio: 'Enterprise account executive and team lead.',                    startDate: '2024-02-01', tags: ['sales', 'enterprise', 'growth'] },
  { id: '11', name: 'Yuki Tanaka',     email: 'yuki@volta.dev',     role: 'Engineer',  status: 'active',   lastActive: '2026-02-20', initials: 'YT', bio: 'Platform engineer building the foundation.',                     startDate: '2024-03-15', tags: ['platform', 'kubernetes', 'cloud'] },
  { id: '12', name: 'Isabella Torres', email: 'isabella@volta.dev', role: 'Support',   status: 'inactive', lastActive: '2026-01-30', initials: 'IT', bio: 'Customer success and support specialist.',                       startDate: '2024-04-01', tags: ['support', 'customers', 'success'] },
  { id: '13', name: 'Finn Larsson',    email: 'finn@volta.dev',     role: 'Engineer',  status: 'active',   lastActive: '2026-02-19', initials: 'FL', bio: 'Data engineer and analytics infrastructure.',                    startDate: '2024-05-20', tags: ['data', 'sql', 'analytics'] },
  { id: '14', name: 'Chloe Dubois',    email: 'chloe@volta.dev',    role: 'Marketing', status: 'active',   lastActive: '2026-02-18', initials: 'CD', bio: 'Content strategist and community builder.',                      startDate: '2024-06-10', tags: ['content', 'community', 'social'] },
  { id: '15', name: 'Omar Hassan',     email: 'omar@volta.dev',     role: 'Finance',   status: 'active',   lastActive: '2026-02-17', initials: 'OH', bio: 'CFO managing growth and operational finance.',                   startDate: '2024-07-01', tags: ['finance', 'strategy', 'operations'] },
  { id: '16', name: 'Maya Patel',      email: 'maya@volta.dev',     role: 'Engineer',  status: 'active',   lastActive: '2026-02-20', initials: 'MP', bio: 'Security engineer and compliance lead.',                         startDate: '2024-08-15', tags: ['security', 'compliance', 'cloud'] },
  { id: '17', name: 'Lucas Moreau',    email: 'lucas@volta.dev',    role: 'Design',    status: 'active',   lastActive: '2026-02-16', initials: 'LM', bio: 'UX researcher turning insights into decisions.',                 startDate: '2024-09-01', tags: ['research', 'ux', 'testing'] },
  { id: '18', name: 'Zoe Williams',    email: 'zoe@volta.dev',      role: 'Product',   status: 'inactive', lastActive: '2026-01-15', initials: 'ZW', bio: 'Senior PM focusing on core product experiences.',                startDate: '2024-10-10', tags: ['product', 'core', 'strategy'] },
  { id: '19', name: 'Ryu Nakamura',    email: 'ryu@volta.dev',      role: 'Engineer',  status: 'active',   lastActive: '2026-02-20', initials: 'RN', bio: 'AI/ML engineer building intelligent features.',                  startDate: '2024-11-05', tags: ['ai', 'ml', 'python'] },
  { id: '20', name: 'Fatima Al-Amin',  email: 'fatima@volta.dev',   role: 'Legal',     status: 'active',   lastActive: '2026-02-18', initials: 'FA', bio: 'General counsel and privacy advocate.',                          startDate: '2025-01-10', tags: ['legal', 'privacy', 'gdpr'] },
]

// ---------------------------------------------------------------------------
// Mock Activity Log
// ---------------------------------------------------------------------------

export interface MockActivity {
  id: string
  user: string
  action: string
  project: string
  date: string
}

export const mockActivity: MockActivity[] = [
  { id: 'a1',  user: 'Aria Chen',      action: 'Created project',           project: 'Volta v2.0',       date: '2026-02-20 09:12' },
  { id: 'a2',  user: 'Marcus Webb',    action: 'Merged pull request',       project: 'API Gateway',      date: '2026-02-20 09:47' },
  { id: 'a3',  user: 'Priya Nair',     action: 'Updated design spec',       project: 'Dashboard',        date: '2026-02-20 10:05' },
  { id: 'a4',  user: 'David Kim',      action: 'Closed issue #412',         project: 'Web App',          date: '2026-02-20 10:33' },
  { id: 'a5',  user: 'Sophie Laurent', action: 'Published blog post',       project: 'Marketing Site',   date: '2026-02-20 11:00' },
  { id: 'a6',  user: 'Lena Fischer',   action: 'Updated roadmap',           project: 'Product Q2',       date: '2026-02-20 11:22' },
  { id: 'a7',  user: 'James Okafor',   action: 'Deployed to staging',       project: 'API Gateway',      date: '2026-02-20 11:45' },
  { id: 'a8',  user: 'Yuki Tanaka',    action: 'Configured CI pipeline',    project: 'Platform',         date: '2026-02-20 12:10' },
  { id: 'a9',  user: 'Amara Diallo',   action: 'Uploaded brand assets',     project: 'Design System',    date: '2026-02-20 12:30' },
  { id: 'a10', user: 'Noah Brooks',    action: 'Closed deal',               project: 'Enterprise Sales', date: '2026-02-20 13:00' },
  { id: 'a11', user: 'Maya Patel',     action: 'Ran security audit',        project: 'Platform',         date: '2026-02-20 13:15' },
  { id: 'a12', user: 'Finn Larsson',   action: 'Updated ETL pipeline',      project: 'Data Warehouse',   date: '2026-02-20 13:40' },
  { id: 'a13', user: 'Ryu Nakamura',   action: 'Shipped model v1.2',        project: 'AI Features',      date: '2026-02-20 14:05' },
  { id: 'a14', user: 'Chloe Dubois',   action: 'Published newsletter',      project: 'Marketing Site',   date: '2026-02-20 14:20' },
  { id: 'a15', user: 'Omar Hassan',    action: 'Submitted Q1 report',       project: 'Finance',          date: '2026-02-20 14:45' },
  { id: 'a16', user: 'Aria Chen',      action: 'Updated team goals',        project: 'OKRs',             date: '2026-02-20 15:00' },
  { id: 'a17', user: 'Marcus Webb',    action: 'Resolved incident #77',     project: 'API Gateway',      date: '2026-02-20 15:30' },
  { id: 'a18', user: 'David Kim',      action: 'Released v2.4.1',           project: 'Web App',          date: '2026-02-20 16:00' },
  { id: 'a19', user: 'Priya Nair',     action: 'Completed a11y audit',      project: 'Design System',    date: '2026-02-20 16:30' },
  { id: 'a20', user: 'Lena Fischer',   action: 'Ran user research session', project: 'Dashboard',        date: '2026-02-20 17:00' },
]

// ---------------------------------------------------------------------------
// Mock Projects
// ---------------------------------------------------------------------------

export interface MockProject {
  id: string
  name: string
  status: 'todo' | 'in-progress' | 'done'
  owner: string
  dueDate: string
  progress: number
}

export const mockProjects: MockProject[] = [
  { id: 'p1', name: 'Volta v2.0 Launch',       status: 'in-progress', owner: 'Aria Chen',    dueDate: '2026-03-31', progress: 68  },
  { id: 'p2', name: 'API Gateway Rewrite',      status: 'in-progress', owner: 'Marcus Webb',  dueDate: '2026-03-15', progress: 45  },
  { id: 'p3', name: 'Mobile App Beta',          status: 'todo',        owner: 'Ethan Park',   dueDate: '2026-04-30', progress: 10  },
  { id: 'p4', name: 'Design System v3',         status: 'in-progress', owner: 'Priya Nair',   dueDate: '2026-03-20', progress: 55  },
  { id: 'p5', name: 'Customer Portal',          status: 'done',        owner: 'David Kim',    dueDate: '2026-02-01', progress: 100 },
  { id: 'p6', name: 'Data Platform Migration',  status: 'todo',        owner: 'Finn Larsson', dueDate: '2026-05-15', progress: 0   },
]

// ---------------------------------------------------------------------------
// Mock Announcements
// ---------------------------------------------------------------------------

export interface MockAnnouncement {
  id: string
  title: string
  body: string
  author: string
  date: string
}

export const mockAnnouncements: MockAnnouncement[] = [
  { id: 'ann1', title: 'Q1 All-Hands — March 5',       author: 'Aria Chen',    date: '2026-02-18', body: 'Join us for our quarterly all-hands. We will share progress on key initiatives, celebrate wins, and preview Q2.' },
  { id: 'ann2', title: 'New Oncall Rotation Starts Monday', author: 'Marcus Webb', date: '2026-02-15', body: 'The updated oncall schedule goes live Monday. Check PagerDuty for your shifts and review the updated runbooks.' },
  { id: 'ann3', title: 'Office Closed — March 3',       author: 'Omar Hassan',  date: '2026-02-10', body: 'The office will be closed on March 3rd (statutory holiday). On-call engineers should coordinate coverage in advance.' },
  { id: 'ann4', title: 'Updated Travel Policy',         author: 'Fatima Al-Amin', date: '2026-02-05', body: 'We have updated our travel & expenses policy with new per-diem rates and a simplified approval flow for trips under $2k.' },
  { id: 'ann5', title: 'Volta v2 Beta — Call for Testers', author: 'Lena Fischer', date: '2026-02-01', body: 'The Volta v2 beta is open internally. Sign up in #v2-beta on Slack to help test the new onboarding flow and dashboard.' },
]

// ---------------------------------------------------------------------------
// Kanban board
// ---------------------------------------------------------------------------

export interface KanbanCard {
  id: string
  title: string
  assignee: string
  priority: 'low' | 'medium' | 'high'
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export const kanbanColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: 'k1', title: 'Set up E2E test suite',          assignee: 'Marcus Webb',  priority: 'high'   },
      { id: 'k2', title: 'Define Q2 OKRs',                 assignee: 'Lena Fischer', priority: 'high'   },
      { id: 'k3', title: 'Update API documentation',       assignee: 'James Okafor', priority: 'medium' },
      { id: 'k4', title: 'Security audit — auth service',  assignee: 'Maya Patel',   priority: 'high'   },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      { id: 'k5', title: 'Redesign dashboard header',      assignee: 'Priya Nair',   priority: 'medium' },
      { id: 'k6', title: 'Migrate legacy billing service', assignee: 'Yuki Tanaka',  priority: 'high'   },
      { id: 'k7', title: 'Build search indexing pipeline', assignee: 'Finn Larsson', priority: 'medium' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'k8',  title: 'Launch customer portal',        assignee: 'David Kim',    priority: 'high'   },
      { id: 'k9',  title: 'Publish brand guidelines v2',   assignee: 'Amara Diallo', priority: 'low'    },
      { id: 'k10', title: 'Automate release notes',        assignee: 'Marcus Webb',  priority: 'medium' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Dashboard stats and metrics
// ---------------------------------------------------------------------------

export const dashboardStats = [
  { label: 'Active Projects', value: '6',      trend: '+2',    up: true  },
  { label: 'Team Members',    value: '20',     trend: '+3',    up: true  },
  { label: 'Tasks Completed', value: '147',    trend: '+12%',  up: true  },
  { label: 'Revenue MTD',     value: '$84k',   trend: '+8.4%', up: true  },
]

export const metricTiles = [
  { label: 'Open Issues',    value: '23',    trend: '-4',    up: false },
  { label: 'PRs Merged',     value: '41',    trend: '+7',    up: true  },
  { label: 'Deployments',    value: '18',    trend: '+3',    up: true  },
  { label: 'Uptime',         value: '99.98%', trend: '',     up: true  },
  { label: 'Avg Cycle Time', value: '2.4d',  trend: '-0.3d', up: true  },
  { label: 'NPS Score',      value: '72',    trend: '+5',    up: true  },
]
