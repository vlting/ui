import { Tabs } from '@vlting/ui/components'
import { DemoCard, Section } from '../../components/Section'

export function TabsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Tabs</h1>

      <Section title="Default">
        <DemoCard label="Tabs with content panels" testId="tabs-default">
          <Tabs.Root defaultValue="account">
            <Tabs.List>
              <Tabs.Trigger value="account">Account</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
              Manage your account details and preferences.
            </Tabs.Content>
            <Tabs.Content value="settings">
              Configure application settings and notifications.
            </Tabs.Content>
            <Tabs.Content value="billing">
              View invoices and update payment methods.
            </Tabs.Content>
          </Tabs.Root>
        </DemoCard>
      </Section>
    </div>
  )
}
