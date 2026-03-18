import { useState } from 'react'
import { Button, Item } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

const ITEM_VARIANTS = ['default', 'subtle', 'outline'] as const
const ITEM_SIZES = ['sm', 'md', 'lg'] as const
const ITEM_THEMES = ['primary', 'secondary', 'neutral'] as const

const TrailingLabel = styled('span', {
  fontSize: '$small',
  color: 'inherit',
  opacity: '0.5',
}, { name: 'TrailingLabel' })

const themeItems: Record<typeof ITEM_THEMES[number], { title: string; description: string; leading: string; trailing: string }[]> = {
  primary: [
    { title: 'Account settings', description: 'Manage your account preferences', leading: '⚙️', trailing: '→' },
    { title: 'Notifications', description: 'Configure alerts and updates', leading: '🔔', trailing: '→' },
    { title: 'Billing', description: 'View plans and payment methods', leading: '💳', trailing: '→' },
  ],
  secondary: [
    { title: 'Two-factor authentication', description: 'Add an extra layer of security', leading: '🔒', trailing: '→' },
    { title: 'Password', description: 'Last changed 3 months ago', leading: '🔑', trailing: '→' },
    { title: 'Sessions', description: 'Manage active sessions', leading: '📱', trailing: '→' },
  ],
  neutral: [
    { title: 'Deployment', description: 'Production — us-east-1', leading: '📦', trailing: 'Live' },
    { title: 'Analytics', description: 'Monthly usage report', leading: '📊', trailing: '12.4k' },
    { title: 'Last backup', description: 'Automated daily snapshot', leading: '🕐', trailing: '2h ago' },
  ],
}

export function ItemSection({ sectionRef }: SectionProps) {
  const [variant, setVariant] = useState<typeof ITEM_VARIANTS[number]>('subtle')
  const [size, setSize] = useState<typeof ITEM_SIZES[number]>('md')
  const [interactive, setInteractive] = useState(false)

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
        <Button
          size="xs"
          theme="neutral"
          variant={interactive ? 'subtle' : 'ghost'}
          onClick={() => setInteractive((i) => !i)}
          aria-pressed={interactive}
        >
          interactive
        </Button>
      </ButtonRow>
      <StackY stl={{ maxWidth: '480px' }}>
        {ITEM_THEMES.map((theme) => (
          <div key={theme}>
            <SectionTitle>{theme}</SectionTitle>
            <StackY>
              {themeItems[theme].map((item) => (
                <Item
                  key={item.title}
                  theme={theme}
                  variant={variant}
                  size={size}
                  interactive={interactive || undefined}
                >
                  <Item.Leading>{item.leading}</Item.Leading>
                  <Item.Content>
                    <Item.Title>{item.title}</Item.Title>
                    <Item.Description>{item.description}</Item.Description>
                  </Item.Content>
                  <Item.Trailing>
                    <TrailingLabel>{item.trailing}</TrailingLabel>
                  </Item.Trailing>
                </Item>
              ))}
            </StackY>
          </div>
        ))}
      </StackY>
    </DemoCard>
  )
}
