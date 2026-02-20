import { createBrowserRouter } from 'react-router-dom'
import { AppShellLayout } from './layouts/AppShellLayout'
import { DashboardPage } from './pages/DashboardPage'
import { UsersPage } from './pages/UsersPage'
import { UserProfilePage } from './pages/UserProfilePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { SettingsPage } from './pages/SettingsPage'
import { ComposePage } from './pages/ComposePage'

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    element: <AppShellLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/users/:id', element: <UserProfilePage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/compose', element: <ComposePage /> },
    ],
  },
])
