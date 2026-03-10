import { Heading, HStack, Text, VStack } from '@vlting/ui'
import { useNavigate, useParams } from 'react-router-dom'

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
    <VStack style={{ padding: 24, gap: 20, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <VStack style={{ gap: 8 }}>
        <Heading level={1}>Kitchen Sink</Heading>
        <Text size="lg" tone="muted">
          Every component in @vlting/ui, organized by layer.
        </Text>
      </VStack>

      <HStack style={{ flexWrap: 'wrap', gap: 16 }}>
        {sections.map((s) => (
          <div
            key={s.path}
            onClick={() => navigate(`/${brand}/${s.path}`)}
            className="home-card"
            style={{
              backgroundColor: 'var(--vlt-color-1)',
              borderRadius: 8,
              border: '1px solid var(--vlt-color-5)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              flex: 1,
              minWidth: 260,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            <Text weight="semibold" size="lg" style={{ fontFamily: 'var(--vlt-font-heading)' }}>
              {s.title}
            </Text>
            <Text size="sm" tone="muted">
              {s.description}
            </Text>
          </div>
        ))}
      </HStack>
    </VStack>
  )
}
