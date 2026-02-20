import { createBrowserRouter } from 'react-router-dom'
import { Text, YStack } from 'tamagui'

function Placeholder({ name }: { name: string }) {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
      <Text fontSize={20} fontWeight="600">{name}</Text>
    </YStack>
  )
}

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <Placeholder name="Onboarding" />,
  },
  {
    path: '/',
    element: <Placeholder name="Home" />,
  },
  {
    path: '/pod',
    element: <Placeholder name="Pod Detail" />,
  },
  {
    path: '/pod/icebreaker',
    element: <Placeholder name="Ice-Breaker" />,
  },
  {
    path: '/pod/quiz',
    element: <Placeholder name="Quiz" />,
  },
  {
    path: '/pod/member/:id',
    element: <Placeholder name="Pod Member Profile" />,
  },
  {
    path: '/messages',
    element: <Placeholder name="Messages" />,
  },
  {
    path: '/messages/:id',
    element: <Placeholder name="DM Thread" />,
  },
  {
    path: '/connections',
    element: <Placeholder name="Connections" />,
  },
  {
    path: '/connections/:id',
    element: <Placeholder name="Connection Profile" />,
  },
  {
    path: '/week-review',
    element: <Placeholder name="Week Review" />,
  },
  {
    path: '/profile',
    element: <Placeholder name="Profile Editor" />,
  },
  {
    path: '/preferences',
    element: <Placeholder name="Preferences" />,
  },
])
