import { createBrowserRouter } from 'react-router-dom'

import { AppShellLayout } from './layouts/AppShellLayout'
import { HomePage } from './pages/HomePage'
import { PodPage } from './pages/PodPage'
import { IceBreakerPage } from './pages/IceBreakerPage'
import { QuizPage } from './pages/QuizPage'
import { PodMemberPage } from './pages/PodMemberPage'
import { MessagesPage } from './pages/MessagesPage'
import { DMThreadPage } from './pages/DMThreadPage'
import { ConnectionsPage } from './pages/ConnectionsPage'
import { ConnectionProfilePage } from './pages/ConnectionProfilePage'
import { WeekReviewPage } from './pages/WeekReviewPage'
import { ProfilePage } from './pages/ProfilePage'
import { PreferencesPage } from './pages/PreferencesPage'
import { SettingsPage } from './pages/SettingsPage'
import { OnboardingPage } from './pages/OnboardingPage'

export const router = createBrowserRouter([
  // Onboarding lives outside the AppShell layout
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  // All other routes are wrapped in the AppShell layout
  {
    element: <AppShellLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/pod',
        element: <PodPage />,
      },
      {
        path: '/pod/icebreaker',
        element: <IceBreakerPage />,
      },
      {
        path: '/pod/quiz',
        element: <QuizPage />,
      },
      {
        path: '/pod/member/:id',
        element: <PodMemberPage />,
      },
      {
        path: '/messages',
        element: <MessagesPage />,
      },
      {
        path: '/messages/:id',
        element: <DMThreadPage />,
      },
      {
        path: '/connections',
        element: <ConnectionsPage />,
      },
      {
        path: '/connections/:id',
        element: <ConnectionProfilePage />,
      },
      {
        path: '/week-review',
        element: <WeekReviewPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/preferences',
        element: <PreferencesPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
])
