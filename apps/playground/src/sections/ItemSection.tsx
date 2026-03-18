import { type ReactNode, useState } from 'react'
import { Avatar, Badge, Button, Item } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

const ITEM_VARIANTS = ['ghost', 'subtle', 'outline'] as const
const ITEM_SIZES = ['sm', 'md', 'lg'] as const
const ITEM_THEMES = ['primary', 'secondary', 'neutral'] as const
const ITEM_ALIGNS = ['center'] as const

const TrailingLabel = styled('span', {
  fontSize: '$small',
  color: 'inherit',
  opacity: '0.5',
}, { name: 'TrailingLabel' })

const ThemeRow = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$16',
}, { name: 'ThemeRow' })

const ThemeGroup = styled('div', {
  flex: '1',
  minWidth: '280px',
}, { name: 'ThemeGroup' })

const ColorDot = styled('span', {
  display: 'inline-block',
  width: '$8',
  height: '$8',
  radius: '$badge',
}, { name: 'ColorDot' })

type DemoItem = {
  title: string
  description: string
  media: ReactNode
  action: ReactNode
}

const themeItems: Record<typeof ITEM_THEMES[number], DemoItem[]> = {
  primary: [
    { title: 'Account settings', description: 'Manage your account preferences', media: '⚙️', action: <Button size="xs" theme="primary" variant="outline">Edit</Button> },
    { title: 'Notifications', description: 'Configure alerts and updates', media: '🔔', action: <Button size="xs" theme="primary" variant="outline">Configure</Button> },
    { title: 'Billing', description: 'View plans and payment methods', media: '💳', action: <Button size="xs" theme="primary" variant="outline">Manage</Button> },
  ],
  secondary: [
    { title: 'Alice Chen', description: 'Engineering lead', media: <Avatar size="xs" fallback="AC" />, action: <TrailingLabel>→</TrailingLabel> },
    { title: 'Bob Martinez', description: 'Product designer', media: <Avatar size="xs" fallback="BM" />, action: <TrailingLabel>→</TrailingLabel> },
    { title: 'Carol Singh', description: 'DevOps engineer', media: <Avatar size="xs" fallback="CS" />, action: <TrailingLabel>→</TrailingLabel> },
  ],
  neutral: [
    { title: 'Production', description: 'us-east-1 — 3 replicas', media: <ColorDot stl={{ bg: '$success9' }} />, action: <Badge theme="success" variant="subtle" size="sm">Live</Badge> },
    { title: 'Staging', description: 'eu-west-1 — 1 replica', media: <ColorDot stl={{ bg: '$warning9' }} />, action: <Badge theme="warning" variant="subtle" size="sm">Deploying</Badge> },
    { title: 'Preview', description: 'auto — on demand', media: <ColorDot stl={{ bg: '$neutral9' }} />, action: <Badge theme="neutral" variant="subtle" size="sm">Idle</Badge> },
  ],
}

export function ItemSection({ sectionRef }: SectionProps) {
  const [variant, setVariant] = useState<typeof ITEM_VARIANTS[number]>('outline')
  const [size, setSize] = useState<typeof ITEM_SIZES[number]>('md')
  const [align, setAlign] = useState<typeof ITEM_ALIGNS[number]>('center')
  const [interactive, setInteractive] = useState(false)
  const [showMedia, setShowMedia] = useState(true)
  const [showDescription, setShowDescription] = useState(true)
  const [showActions, setShowActions] = useState(true)

  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Item">
      <SectionHeading>Item</SectionHeading>
      <ButtonRow stl={{ mb: '$16' }}>
        {ITEM_VARIANTS.map((v) => (
          <Button
            key={v}
            size="xs"
            theme="neutral"
            variant={variant === v ? 'subtle' : 'ghost'}
            onClick={() => setVariant(v)}
            aria-pressed={variant === v}
          >
            {v}
          </Button>
        ))}
        {ITEM_SIZES.map((s) => (
          <Button
            key={s}
            size="xs"
            theme="neutral"
            variant={size === s ? 'subtle' : 'ghost'}
            onClick={() => setSize(s)}
            aria-pressed={size === s}
          >
            {s}
          </Button>
        ))}
        {ITEM_ALIGNS.map((a) => (
          <Button
            key={a}
            size="xs"
            theme="neutral"
            variant={align === a ? 'subtle' : 'ghost'}
            onClick={() => setAlign(a)}
            aria-pressed={align === a}
          >
            {a}
          </Button>
        ))}
        <Button
          size="xs"
          theme="neutral"
          variant={interactive ? 'subtle' : 'ghost'}
          onClick={() => setInteractive((i) => !i)}
          aria-pressed={interactive}
        >
          interactive
        </Button>
        <Button
          size="xs"
          theme="neutral"
          variant={showMedia ? 'subtle' : 'ghost'}
          onClick={() => setShowMedia((m) => !m)}
          aria-pressed={showMedia}
        >
          media
        </Button>
        <Button
          size="xs"
          theme="neutral"
          variant={showDescription ? 'subtle' : 'ghost'}
          onClick={() => setShowDescription((d) => !d)}
          aria-pressed={showDescription}
        >
          description
        </Button>
        <Button
          size="xs"
          theme="neutral"
          variant={showActions ? 'subtle' : 'ghost'}
          onClick={() => setShowActions((a) => !a)}
          aria-pressed={showActions}
        >
          actions
        </Button>
      </ButtonRow>
      <ThemeRow>
        {ITEM_THEMES.map((theme) => (
          <ThemeGroup key={theme}>
            <SectionTitle>{theme}</SectionTitle>
            <StackY>
              {themeItems[theme].map((item) => (
                <Item
                  key={item.title}
                  theme={theme}
                  variant={variant}
                  size={size}
                  align={align}
                  interactive={interactive || undefined}
                >
                  {showMedia && (
                    <Item.Leading stl={showDescription ? { alignSelf: 'start' } : undefined}>
                      {item.media}
                    </Item.Leading>
                  )}
                  <Item.Content>
                    <Item.Title>{item.title}</Item.Title>
                    {showDescription && (
                      <Item.Description theme={theme}>{item.description}</Item.Description>
                    )}
                  </Item.Content>
                  {showActions && <Item.Trailing>{item.action}</Item.Trailing>}
                </Item>
              ))}
            </StackY>
          </ThemeGroup>
        ))}
      </ThemeRow>
    </DemoCard>
  )
}
