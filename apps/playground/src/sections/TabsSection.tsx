import { useState } from 'react'
import { Button, Card, Tabs, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

type Variant = 'tab' | 'line' | 'subtle'
type Orientation = 'horizontal' | 'vertical'
type Theme = 'primary' | 'secondary' | 'neutral'

export function TabsSection({ sectionRef }: SectionProps) {
  const [value, setValue] = useState('account')
  const [variant, setVariant] = useState<Variant>('tab')
  const [orientation, setOrientation] = useState<Orientation>('horizontal')
  const [theme, setTheme] = useState<Theme>('primary')

  return (
    <Card ref={sectionRef} data-section="Tabs">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Tabs</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[variant]}
            onValueChange={v => v[0] && setVariant(v[0] as Variant)}
            aria-label="Variant"
          >
            {(['tab', 'line', 'subtle'] as Variant[]).map(v => (
              <Button key={v} value={v} size="md" variant="outline" theme="neutral">{v}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[orientation]}
            onValueChange={v => v[0] && setOrientation(v[0] as Orientation)}
            aria-label="Orientation"
          >
            <Button value="horizontal" size="md" variant="outline" theme="neutral">horizontal</Button>
            <Button value="vertical" size="md" variant="outline" theme="neutral">vertical</Button>
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[theme]}
            onValueChange={v => v[0] && setTheme(v[0] as Theme)}
            aria-label="Theme"
          >
            {(['primary', 'secondary', 'neutral'] as Theme[]).map(t => (
              <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
            ))}
          </ToggleGroup>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Controlled</SectionTitle>
          <Tabs.Root
            value={value}
            onValueChange={setValue}
            variant={variant}
            orientation={orientation}
            theme={theme}
          >
            <Tabs.List>
              <Tabs.Trigger value="account">Account</Tabs.Trigger>
              <Tabs.Trigger value="password">Password</Tabs.Trigger>
              <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
              <Tabs.Trigger value="billing" disabled>Billing</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
              Manage your account settings, display name, and profile information.
            </Tabs.Content>
            <Tabs.Content value="password">
              Change your password and configure two-factor authentication.
            </Tabs.Content>
            <Tabs.Content value="notifications">
              Choose which notifications you receive and how they are delivered.
            </Tabs.Content>
            <Tabs.Content value="billing">
              View invoices and manage payment methods.
            </Tabs.Content>
          </Tabs.Root>
          <StatusLabel>value: "{value}"</StatusLabel>

          <SectionTitle stl={{ mt: '$24' }}>Uncontrolled</SectionTitle>
          <Tabs.Root
            defaultValue="general"
            variant={variant}
            orientation={orientation}
            theme={theme}
          >
            <Tabs.List>
              <Tabs.Trigger value="general">General</Tabs.Trigger>
              <Tabs.Trigger value="editor">Editor</Tabs.Trigger>
              <Tabs.Trigger value="keybindings">Keybindings</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="general">
              Application language, theme, and startup preferences.
            </Tabs.Content>
            <Tabs.Content value="editor">
              Font size, tab width, word wrap, and minimap settings.
            </Tabs.Content>
            <Tabs.Content value="keybindings">
              Customize keyboard shortcuts for common actions.
            </Tabs.Content>
          </Tabs.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
