import { Heading } from '@vlting/ui'
import { useNavigate, useParams } from 'react-router-dom'
import { Text, XStack, YStack } from 'tamagui'

export function HomePage() {
  const navigate = useNavigate()
  const { brand = 'default' } = useParams()

  const sections = [
    {
      path: 'primitives',
      title: 'Primitives',
      description:
        'Box, Stack, Text, Heading, Label, Badge, Skeleton, Separator, Spinner, Kbd',
    },
    {
      path: 'components/buttons',
      title: 'Buttons & Actions',
      description: 'Button, ButtonGroup, Toggle, Pagination',
    },
    {
      path: 'components/forms',
      title: 'Forms & Inputs',
      description:
        'Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, DatePicker, Calendar, Combobox, Form',
    },
    {
      path: 'components/data',
      title: 'Data Display',
      description:
        'Card, Table, Avatar, Alert, Progress, Loader, Accordion, Collapsible, Carousel, Breadcrumb, Typography, Kbd',
    },
    {
      path: 'components/overlays',
      title: 'Overlays',
      description: 'Dialog, AlertDialog, Drawer, HoverCard, Tooltip',
    },
    {
      path: 'components/menus',
      title: 'Menus & Navigation',
      description:
        'DropdownMenu, ContextMenu, Menubar, NavigationMenu, Command, Tabs, ScrollArea, Sidebar, Resizable',
    },
    {
      path: 'composed',
      title: 'Composed',
      description: 'Higher-level composed examples and patterns',
    },
    {
      path: 'hooks',
      title: 'Hooks',
      description: 'useControllableState, useFocusTrap, useKeyboardNavigation',
    },
  ]

  return (
    <YStack padding="$6" gap="$5" maxWidth={900} marginHorizontal="auto" width="100%">
      <YStack gap="$2">
        <Heading level={1}>Kitchen Sink</Heading>
        <Text fontFamily="$body" fontSize="$5" color="$colorSubtitle">
          Every component in @vlting/ui, organized by layer.
        </Text>
      </YStack>

      <XStack flexWrap="wrap" gap="$4">
        {sections.map((s) => (
          <YStack
            key={s.path}
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            padding="$4"
            gap="$2"
            flex={1}
            minWidth={260}
            cursor="pointer"
            hoverStyle={{ backgroundColor: '$backgroundHover' }}
            pressStyle={{ backgroundColor: '$backgroundPress', scale: 0.99 }}
            animation="fast"
            onPress={() => navigate(`/${brand}/${s.path}`)}
          >
            <Text fontFamily="$heading" fontWeight="$4" fontSize="$5">
              {s.title}
            </Text>
            <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
              {s.description}
            </Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}
