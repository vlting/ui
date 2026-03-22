import { useState } from 'react'
import { Card, Tabs } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

export function TabsSection({ sectionRef }: SectionProps) {
  const [value, setValue] = useState('account')

  return (
    <Card ref={sectionRef} data-section="Tabs">
      <Card.Header>
        <Card.Title>Tabs</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Horizontal</SectionTitle>
          <Tabs.Root value={value} onValueChange={setValue}>
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

          <SectionTitle stl={{ mt: '$24' }}>Vertical</SectionTitle>
          <Tabs.Root defaultValue="general" orientation="vertical">
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
