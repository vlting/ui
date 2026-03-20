import type React from 'react'
import { useState } from 'react'
import { styled, Spinner } from '@vlting/stl-react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Empty,
  Heading,
  Input,
  Item,
  Loader,
  NativeSelect,
  Progress,
  RadioGroup,
  Separator,
  Switch,
  Text,
  Textarea,
  Toggle,
  ToggleGroup,
} from '@vlting/ui'

// ─── Constants ──────────────────────────────────────────────────────────────

export const DEMO_SCENES = ['Settings', 'Activity', 'Dashboard'] as const
export type DemoScene = typeof DEMO_SCENES[number]

// ─── Layout Primitives ──────────────────────────────────────────────────────

const Scene = styled('section', {
  position: 'relative',
  overflow: 'hidden',
  py: '$48',
  px: '$24',
  minHeight: 'calc(100vh - 48px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}, { name: 'DemoScene' })

const SceneInner = styled('div', {
  position: 'relative',
  zIndex: '1',
  maxWidth: '800px',
  mx: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '$24',
}, { name: 'DemoSceneInner' })

const Orb = styled('div', {
  position: 'absolute',
  borderRadius: '$full',
  pointerEvents: 'none',
  filter: 'blur(80px)',
  opacity: '0.35',
}, { name: 'DemoOrb' })

const Row = styled('div', {
  display: 'flex',
  gap: '$12',
  alignItems: 'center',
  flexWrap: 'wrap',
}, { name: 'DemoRow' })

const FormField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
}, { name: 'DemoFormField' })

const FormLabel = styled('label', {
  fontSize: '$small',
  fontWeight: '$600',
  color: '$color12',
}, { name: 'DemoFormLabel' })

const StatsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '$16',
}, { name: 'DemoStatsGrid' })

const AvatarRow = styled('div', {
  display: 'flex',
  gap: '$8',
  alignItems: 'center',
  flexWrap: 'wrap',
}, { name: 'DemoAvatarRow' })

// ─── Scene 1: Settings ──────────────────────────────────────────────────────

function SettingsScene() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [emailChecked, setEmailChecked] = useState(true)
  const [pushChecked, setPushChecked] = useState(true)
  const [smsChecked, setSmsChecked] = useState(false)
  const [language, setLanguage] = useState('en')

  return (
    <Scene stl={{ bg: '$surface2' }}>
      <Orb
        aria-hidden="true"
        stl={{ width: '400px', height: '400px', top: '-100px', right: '-100px', bg: '$primaryAlpha3' }}
      />
      <Orb
        aria-hidden="true"
        stl={{ width: '300px', height: '300px', bottom: '-80px', left: '-60px', bg: '$secondaryAlpha3' }}
      />

      <SceneInner>
        <div>
          <Heading stl={{ mb: '$8' }}>Settings</Heading>
          <Text tone="muted">Manage your account preferences and notifications.</Text>
        </div>

        <Card>
          <Card.Header>
            <Card.Title>Profile</Card.Title>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$16' }}>
            <FormField>
              <FormLabel htmlFor="demo-name">Display name</FormLabel>
              <Input id="demo-name" placeholder="Enter your name" defaultValue="Maya Chen" />
            </FormField>
            <FormField>
              <FormLabel htmlFor="demo-bio">Bio</FormLabel>
              <Textarea id="demo-bio" placeholder="Tell us about yourself" defaultValue="Coffee lover, part-time traveler exploring the world one city at a time." />
            </FormField>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Preferences</Card.Title>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$0' }}>
            <Item theme="neutral" variant="ghost">
              <Item.Content>
                <Item.Title>Push notifications</Item.Title>
                <Item.Description>Receive alerts on your device</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Switch checked={notifications} onCheckedChange={setNotifications} aria-label="Push notifications" />
              </Item.Trailing>
            </Item>
            <Separator />
            <Item theme="neutral" variant="ghost">
              <Item.Content>
                <Item.Title>Auto-save drafts</Item.Title>
                <Item.Description>Save work automatically every minute</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} aria-label="Auto-save drafts" />
              </Item.Trailing>
            </Item>
            <Separator />
            <Item theme="neutral" variant="ghost">
              <Item.Content>
                <Item.Title>Dark mode</Item.Title>
                <Item.Description>Use dark color scheme</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Dark mode" />
              </Item.Trailing>
            </Item>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Notification channels</Card.Title>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$12' }}>
            <Checkbox.Root checked={emailChecked} onCheckedChange={setEmailChecked}>
              Email notifications
            </Checkbox.Root>
            <Checkbox.Root checked={pushChecked} onCheckedChange={setPushChecked}>
              Push notifications
            </Checkbox.Root>
            <Checkbox.Root checked={smsChecked} onCheckedChange={setSmsChecked}>
              SMS notifications
            </Checkbox.Root>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Language &amp; region</Card.Title>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$16' }}>
            <RadioGroup.Root
              value={language}
              onValueChange={setLanguage}
              orientation="horizontal"
              aria-label="Language"
            >
              <RadioGroup.Item value="en">English</RadioGroup.Item>
              <RadioGroup.Item value="es">Español</RadioGroup.Item>
              <RadioGroup.Item value="fr">Français</RadioGroup.Item>
            </RadioGroup.Root>
            <FormField>
              <FormLabel htmlFor="demo-tz">Timezone</FormLabel>
              <NativeSelect.Root id="demo-tz" defaultValue="utc-8">
                <NativeSelect.Option value="utc-5">Eastern (UTC-5)</NativeSelect.Option>
                <NativeSelect.Option value="utc-6">Central (UTC-6)</NativeSelect.Option>
                <NativeSelect.Option value="utc-7">Mountain (UTC-7)</NativeSelect.Option>
                <NativeSelect.Option value="utc-8">Pacific (UTC-8)</NativeSelect.Option>
              </NativeSelect.Root>
            </FormField>
          </Card.Content>
        </Card>

        <Row>
          <Button theme="primary" variant="solid">Save changes</Button>
          <Button theme="neutral" variant="outline">Cancel</Button>
        </Row>
      </SceneInner>
    </Scene>
  )
}

// ─── Scene 2: Activity Feed ─────────────────────────────────────────────────

function ActivityScene() {
  return (
    <Scene stl={{ bg: '$surface3' }}>
      <Orb
        aria-hidden="true"
        stl={{ width: '350px', height: '350px', top: '40px', left: '-80px', bg: '$secondaryAlpha3' }}
      />
      <Orb
        aria-hidden="true"
        stl={{ width: '280px', height: '280px', bottom: '-60px', right: '-40px', bg: '$primaryAlpha3' }}
      />

      <SceneInner>
        <div>
          <Heading stl={{ mb: '$8' }}>Activity</Heading>
          <Text tone="muted">Recent updates and notifications from your team.</Text>
        </div>

        <Alert.Root theme="success" variant="subtle">
          <Alert.Icon><CheckCircle /></Alert.Icon>
          <Alert.Content>
            <Alert.Title>Deployment successful</Alert.Title>
            <Alert.Description>Production build v2.4.1 deployed to us-east-1.</Alert.Description>
          </Alert.Content>
        </Alert.Root>

        <Alert.Root theme="warning" variant="subtle">
          <Alert.Icon><WarningTriangle /></Alert.Icon>
          <Alert.Content>
            <Alert.Title>High memory usage</Alert.Title>
            <Alert.Description>Worker pool averaging 87% — consider scaling.</Alert.Description>
          </Alert.Content>
        </Alert.Root>

        <Alert.Root theme="info" variant="subtle">
          <Alert.Icon><InfoCircle /></Alert.Icon>
          <Alert.Content>
            <Alert.Title>Scheduled maintenance</Alert.Title>
            <Alert.Description>Downtime window: Saturday 2am–4am UTC.</Alert.Description>
          </Alert.Content>
        </Alert.Root>

        <Card>
          <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Card.Title>Team activity</Card.Title>
            <Badge theme="primary" variant="subtle" size="sm">5 new</Badge>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$0' }}>
            <Item variant="ghost">
              <Item.Leading>
                <Avatar size="sm" fallback="DK" />
              </Item.Leading>
              <Item.Content>
                <Item.Title>Deploy failed on staging</Item.Title>
                <Item.Description>David Kim triggered a rollback</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Badge theme="tomato" variant="subtle" size="sm">urgent</Badge>
              </Item.Trailing>
            </Item>
            <Separator />
            <Item variant="ghost">
              <Item.Leading>
                <Avatar size="sm" fallback="SL" />
              </Item.Leading>
              <Item.Content>
                <Item.Title>PR review requested</Item.Title>
                <Item.Description>Sara Lee needs approval on #482</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Badge theme="amber" variant="subtle" size="sm">pending</Badge>
              </Item.Trailing>
            </Item>
            <Separator />
            <Item variant="ghost">
              <Item.Leading>
                <Avatar size="sm" fallback="MR" />
              </Item.Leading>
              <Item.Content>
                <Item.Title>Tests passing on main</Item.Title>
                <Item.Description>Marco Rivera merged the fix</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Badge theme="grass" variant="subtle" size="sm">done</Badge>
              </Item.Trailing>
            </Item>
            <Separator />
            <Item variant="ghost">
              <Item.Leading>
                <Avatar size="sm" fallback="AC" />
              </Item.Leading>
              <Item.Content>
                <Item.Title>New component shipped</Item.Title>
                <Item.Description>Alice Chen published DatePicker v1</Item.Description>
              </Item.Content>
              <Item.Trailing>
                <Badge theme="iris" variant="subtle" size="sm">shipped</Badge>
              </Item.Trailing>
            </Item>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Sprint progress</Card.Title>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$12' }}>
            <Row stl={{ justifyContent: 'space-between' }}>
              <Text size="sm">3 of 5 tasks complete</Text>
              <Text size="sm" tone="muted">60%</Text>
            </Row>
            <Progress value={60} theme="primary" size="md" />
          </Card.Content>
        </Card>

        <Row stl={{ justifyContent: 'center', gap: '$8' }}>
          <Spinner size="sm" theme="primary" />
          <Text size="sm" tone="muted">Loading older activity…</Text>
        </Row>

        <Empty.Root>
          <Empty.Media>
            <InboxIcon />
          </Empty.Media>
          <Empty.Title>All caught up</Empty.Title>
          <Empty.Description>No new notifications from the past week.</Empty.Description>
          <Empty.Action>
            <Button theme="neutral" variant="outline" size="sm">View archive</Button>
          </Empty.Action>
        </Empty.Root>
      </SceneInner>
    </Scene>
  )
}

// ─── Scene 3: Dashboard ─────────────────────────────────────────────────────

function DashboardScene() {
  const [period, setPeriod] = useState('week')
  const [compactView, setCompactView] = useState(false)

  return (
    <Scene stl={{ bg: '$surface2' }}>
      <Orb
        aria-hidden="true"
        stl={{ width: '500px', height: '500px', bottom: '-200px', right: '-150px', bg: '$primaryAlpha3' }}
      />
      <Orb
        aria-hidden="true"
        stl={{ width: '250px', height: '250px', top: '-50px', left: '30%', bg: '$secondaryAlpha3' }}
      />

      <SceneInner>
        <div>
          <Heading stl={{ mb: '$8' }}>Dashboard</Heading>
          <Text tone="muted">Team metrics and project overview at a glance.</Text>
        </div>

        <Row stl={{ justifyContent: 'space-between' }}>
          <ToggleGroup
            type="exclusive"
            value={[period]}
            onValueChange={(v) => v[0] && setPeriod(v[0])}
            aria-label="Time period"
          >
            <Button value="day" size="sm" variant="outline" theme="neutral">Day</Button>
            <Button value="week" size="sm" variant="outline" theme="neutral">Week</Button>
            <Button value="month" size="sm" variant="outline" theme="neutral">Month</Button>
          </ToggleGroup>
          <Row stl={{ gap: '$8' }}>
            <Toggle
              size="sm"
              variant="outline"
              theme="neutral"
              pressed={compactView}
              onPressedChange={setCompactView}
            >
              Compact
            </Toggle>
            <ButtonGroup.Root>
              <Button size="sm" theme="neutral" variant="outline">Export</Button>
              <Button size="sm" theme="neutral" variant="outline">Share</Button>
            </ButtonGroup.Root>
          </Row>
        </Row>

        <StatsGrid>
          <Card elevation="raised">
            <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$12' }}>
              <Text size="sm" tone="muted">Deployments</Text>
              <Heading.H3>128</Heading.H3>
              <Progress value={85} theme="primary" size="sm" />
              <Badge theme="grass" variant="subtle" size="sm">+12% from last {period}</Badge>
            </Card.Content>
          </Card>

          <Card elevation="raised">
            <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$12' }}>
              <Text size="sm" tone="muted">Uptime</Text>
              <Heading.H3>99.97%</Heading.H3>
              <Progress value={99} theme="secondary" size="sm" />
              <Badge theme="neutral" variant="subtle" size="sm">SLA target: 99.9%</Badge>
            </Card.Content>
          </Card>

          <Card elevation="raised">
            <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$12' }}>
              <Text size="sm" tone="muted">Open issues</Text>
              <Heading.H3>24</Heading.H3>
              <Progress value={35} theme="neutral" size="sm" />
              <Badge theme="amber" variant="subtle" size="sm">7 critical</Badge>
            </Card.Content>
          </Card>
        </StatsGrid>

        <Card>
          <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Card.Title>Team</Card.Title>
            <Badge theme="neutral" variant="outline" size="sm">8 members</Badge>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$16' }}>
            <AvatarRow>
              <Avatar size="md" fallback="AW" />
              <Avatar size="md" fallback="JT" />
              <Avatar size="md" fallback="KP" />
              <Avatar size="md" fallback="LN" />
              <Avatar size="md" fallback="DK" />
              <Avatar size="sm" fallback="+3" stl={{ bg: '$neutral6' }} />
            </AvatarRow>
            <Separator />
            <Row stl={{ justifyContent: 'space-between' }}>
              <Text size="sm" tone="muted">Active reviewers this {period}</Text>
              <Loader size="sm" aria-label="Loading reviewers" />
            </Row>
          </Card.Content>
        </Card>

        <Row stl={{ gap: '$8' }}>
          <Toggle theme="neutral" variant="outline" size="sm" pressed aria-label="Active filter">Active</Toggle>
          <Toggle theme="neutral" variant="outline" size="sm" aria-label="Archived filter">Archived</Toggle>
          <Toggle theme="neutral" variant="outline" size="sm" aria-label="Starred filter">Starred</Toggle>
          <Toggle theme="neutral" variant="outline" size="sm" aria-label="Draft filter">Draft</Toggle>
        </Row>
      </SceneInner>
    </Scene>
  )
}

// ─── Icons ──────────────────────────────────────────────────────────────────

const CheckCircle = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" />
  </svg>
)

const WarningTriangle = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.866 3L22.3923 19.5C22.5833 19.8094 22.5833 20.1906 22.3923 20.5C22.2013 20.8094 21.866 21 21.5263 21H2.47372C2.134 21 1.7987 20.8094 1.6077 20.5C1.4167 20.1906 1.4167 19.8094 1.6077 19.5L11.134 3C11.325 2.69064 11.6603 2.5 12 2.5C12.3397 2.5 12.675 2.69064 12.866 3ZM11 16V18H13V16H11ZM11 9V14H13V9H11Z" />
  </svg>
)

const InfoCircle = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" />
  </svg>
)

const InboxIcon = () => (
  <svg width={48} height={48} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" opacity={0.3}>
    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 15V19H20V15H16C16 16.6569 14.6569 18 13 18H11C9.34315 18 8 16.6569 8 15H4ZM4 5V13H9C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13H20V5H4Z" />
  </svg>
)

// ─── Scene Map ──────────────────────────────────────────────────────────────

const SCENE_COMPONENTS: Record<DemoScene, React.ComponentType> = {
  Settings: SettingsScene,
  Activity: ActivityScene,
  Dashboard: DashboardScene,
}

// ─── Export ─────────────────────────────────────────────────────────────────

export function DemoSection({ activeScene = 'Settings' }: { activeScene?: DemoScene }) {
  const SceneComponent = SCENE_COMPONENTS[activeScene]
  return <SceneComponent />
}
