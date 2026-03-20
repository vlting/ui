import { styled } from '@vlting/stl-react'
import { StackY } from './shared'
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

// ─── Scene Infrastructure ──────────────────────────────────────────────────

const SceneSection = styled('section', {
  position: 'relative',
  overflow: 'hidden',
  py: '$48',
  px: '$24',
}, { name: 'SceneSection' })

const SceneHeader = styled('div', {
  textAlign: 'center',
  mb: '$32',
  position: 'relative',
  zIndex: '$1',
}, { name: 'SceneHeader' })

const GradientOrb = styled('div', {
  position: 'absolute',
  borderRadius: '$full',
  filter: 'blur(80px)',
  pointerEvents: 'none',
}, { name: 'GradientOrb' })

const SceneContent = styled('div', {
  position: 'relative',
  zIndex: '$1',
  maxWidth: '720px',
  mx: 'auto',
}, { name: 'SceneContent' })

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$12',
}, { name: 'FormGroup' })

const FormRow = styled('div', {
  display: 'flex',
  gap: '$12',
  alignItems: 'center',
  justifyContent: 'end',
}, { name: 'FormRow' })

const StatsRow = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$16',
}, { name: 'StatsRow' })

const ControlsRow = styled('div', {
  display: 'flex',
  gap: '$16',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
}, { name: 'ControlsRow' })

const TeamRow = styled('div', {
  display: 'flex',
  gap: '$12',
  alignItems: 'center',
  flexWrap: 'wrap',
}, { name: 'TeamRow' })

const FilterRow = styled('div', {
  display: 'flex',
  gap: '$8',
  flexWrap: 'wrap',
}, { name: 'FilterRow' })

// ─── Scene 1: Settings — Preferences Panel ─────────────────────────────────

function SettingsScene() {
  return (
    <SceneSection stl={{ bg: '$surface2' }}>
      <GradientOrb
        aria-hidden="true"
        stl={{
          width: '400px',
          height: '400px',
          top: '-100px',
          right: '-100px',
          bg: 'radial-gradient(circle, $primaryAlpha3, transparent)',
        }}
      />
      <GradientOrb
        aria-hidden="true"
        stl={{
          width: '300px',
          height: '300px',
          bottom: '-80px',
          left: '-60px',
          bg: 'radial-gradient(circle, $secondaryAlpha4, transparent)',
        }}
      />

      <SceneHeader>
        <Heading as="h2" stl={{ mb: '$8' }}>Settings</Heading>
        <Text stl={{ color: '$neutralText4' }}>Manage your account preferences and notifications</Text>
      </SceneHeader>

      <SceneContent>
        <Card>
          <Card.Content>
            <StackY stl={{ gap: '$24' }}>
              {/* Profile */}
              <FormGroup>
                <Heading as="h3" stl={{ fontSize: '$p', fontWeight: '$600' }}>Profile</Heading>
                <Input placeholder="Display name" aria-label="Display name" />
                <Textarea placeholder="Write a short bio..." aria-label="Bio" />
              </FormGroup>

              <Separator />

              {/* Preferences */}
              <FormGroup>
                <Heading as="h3" stl={{ fontSize: '$p', fontWeight: '$600' }}>Preferences</Heading>
                <Item theme="neutral" variant="ghost">
                  <Item.Content>
                    <Item.Title>Push notifications</Item.Title>
                    <Item.Description>Receive alerts on your device</Item.Description>
                  </Item.Content>
                  <Item.Trailing>
                    <Switch defaultChecked aria-label="Push notifications" />
                  </Item.Trailing>
                </Item>
                <Item theme="neutral" variant="ghost">
                  <Item.Content>
                    <Item.Title>Auto-save drafts</Item.Title>
                    <Item.Description>Save work automatically every minute</Item.Description>
                  </Item.Content>
                  <Item.Trailing>
                    <Switch aria-label="Auto-save drafts" />
                  </Item.Trailing>
                </Item>
                <Item theme="neutral" variant="ghost">
                  <Item.Content>
                    <Item.Title>Dark mode</Item.Title>
                    <Item.Description>Use dark color scheme</Item.Description>
                  </Item.Content>
                  <Item.Trailing>
                    <Switch aria-label="Dark mode" />
                  </Item.Trailing>
                </Item>
              </FormGroup>

              <Separator />

              {/* Notification channels */}
              <FormGroup>
                <Heading as="h3" stl={{ fontSize: '$p', fontWeight: '$600' }}>Notification channels</Heading>
                <Checkbox.Root defaultChecked>Email</Checkbox.Root>
                <Checkbox.Root>Push</Checkbox.Root>
                <Checkbox.Root>SMS</Checkbox.Root>
              </FormGroup>

              <Separator />

              {/* Language */}
              <FormGroup>
                <Heading as="h3" stl={{ fontSize: '$p', fontWeight: '$600' }}>Language</Heading>
                <RadioGroup.Root defaultValue="en" aria-label="Language">
                  <RadioGroup.Item value="en">English</RadioGroup.Item>
                  <RadioGroup.Item value="es">Spanish</RadioGroup.Item>
                  <RadioGroup.Item value="fr">French</RadioGroup.Item>
                </RadioGroup.Root>
              </FormGroup>

              <Separator />

              {/* Timezone */}
              <FormGroup>
                <Heading as="h3" stl={{ fontSize: '$p', fontWeight: '$600' }}>Timezone</Heading>
                <NativeSelect.Root aria-label="Timezone">
                  <NativeSelect.Option value="utc-8">Pacific Time (UTC-8)</NativeSelect.Option>
                  <NativeSelect.Option value="utc-5">Eastern Time (UTC-5)</NativeSelect.Option>
                  <NativeSelect.Option value="utc+0">UTC</NativeSelect.Option>
                  <NativeSelect.Option value="utc+1">Central European (UTC+1)</NativeSelect.Option>
                </NativeSelect.Root>
              </FormGroup>

              <Separator />

              {/* Actions */}
              <FormRow>
                <Button theme="neutral" variant="outline">Cancel</Button>
                <Button theme="primary" variant="solid">Save changes</Button>
              </FormRow>
            </StackY>
          </Card.Content>
        </Card>
      </SceneContent>
    </SceneSection>
  )
}

// ─── Scene 2: Activity — Feed ───────────────────────────────────────────────

function ActivityScene() {
  return (
    <SceneSection stl={{ bg: '$surface3' }}>
      <GradientOrb
        aria-hidden="true"
        stl={{
          width: '350px',
          height: '350px',
          top: '-80px',
          left: '-80px',
          bg: 'radial-gradient(circle, $secondaryAlpha4, transparent)',
        }}
      />
      <GradientOrb
        aria-hidden="true"
        stl={{
          width: '280px',
          height: '280px',
          bottom: '-60px',
          right: '-40px',
          bg: 'radial-gradient(circle, $primaryAlpha3, transparent)',
        }}
      />

      <SceneHeader>
        <Heading as="h2" stl={{ mb: '$8' }}>Activity</Heading>
        <Text stl={{ color: '$neutralText4' }}>Recent notifications and task progress</Text>
      </SceneHeader>

      <SceneContent>
        <StackY stl={{ gap: '$24' }}>
          {/* Feed items */}
          <Card>
            <Card.Content>
              <StackY stl={{ gap: '$0' }}>
                <Item theme="neutral" variant="ghost">
                  <Item.Leading>
                    <Avatar size="sm" fallback="DK" />
                  </Item.Leading>
                  <Item.Content>
                    <Item.Title>Deploy failed on staging</Item.Title>
                    <Item.Description>David Kim triggered a rollback</Item.Description>
                  </Item.Content>
                  <Item.Trailing>
                    <Badge theme="tomato" variant="subtle" size="sm">Urgent</Badge>
                  </Item.Trailing>
                </Item>

                <Separator />

                <Item theme="neutral" variant="ghost">
                  <Item.Leading>
                    <Avatar size="sm" fallback="SL" />
                  </Item.Leading>
                  <Item.Content>
                    <Item.Title>PR review requested</Item.Title>
                    <Item.Description>Sara Lee needs approval on #482</Item.Description>
                  </Item.Content>
                  <Item.Trailing>
                    <Badge theme="amber" variant="subtle" size="sm">Pending</Badge>
                  </Item.Trailing>
                </Item>

                <Separator />

                <Item theme="neutral" variant="ghost">
                  <Item.Leading>
                    <Avatar size="sm" fallback="MR" />
                  </Item.Leading>
                  <Item.Content>
                    <Item.Title>Tests passing on main</Item.Title>
                    <Item.Description>Marco Rivera merged the fix</Item.Description>
                  </Item.Content>
                  <Item.Trailing>
                    <Badge theme="grass" variant="subtle" size="sm">Done</Badge>
                  </Item.Trailing>
                </Item>
              </StackY>
            </Card.Content>
          </Card>

          {/* Alerts */}
          <Alert.Root theme="success">
            <Alert.Title>Build complete</Alert.Title>
            <Alert.Description>All 142 tests passed successfully.</Alert.Description>
          </Alert.Root>

          <Alert.Root theme="warning">
            <Alert.Title>Disk usage high</Alert.Title>
            <Alert.Description>Storage is at 87% capacity. Consider cleanup.</Alert.Description>
          </Alert.Root>

          <Alert.Root theme="info">
            <Alert.Title>Scheduled maintenance</Alert.Title>
            <Alert.Description>Downtime window: Saturday 2am–4am UTC.</Alert.Description>
          </Alert.Root>

          {/* Progress */}
          <Card>
            <Card.Content>
              <FormGroup>
                <Text stl={{ fontWeight: '$600' }}>Sprint progress — 3 of 5 tasks complete</Text>
                <Progress value={60} aria-label="Sprint progress" />
              </FormGroup>
            </Card.Content>
          </Card>

          {/* Empty state */}
          <Empty.Root>
            <Empty.Title>All caught up</Empty.Title>
            <Empty.Description>No new notifications. Check back later.</Empty.Description>
          </Empty.Root>

          {/* Loading indicator */}
          <Loader aria-label="Loading activity" />
        </StackY>
      </SceneContent>
    </SceneSection>
  )
}

// ─── Scene 3: Dashboard — Overview ──────────────────────────────────────────

function DashboardScene() {
  return (
    <SceneSection stl={{ bg: '$surface2' }}>
      <GradientOrb
        aria-hidden="true"
        stl={{
          width: '420px',
          height: '420px',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          bg: 'radial-gradient(circle, $primaryAlpha3, transparent)',
        }}
      />
      <GradientOrb
        aria-hidden="true"
        stl={{
          width: '300px',
          height: '300px',
          bottom: '-100px',
          right: '-60px',
          bg: 'radial-gradient(circle, $secondaryAlpha4, transparent)',
        }}
      />

      <SceneHeader>
        <Heading as="h2" stl={{ mb: '$8' }}>Dashboard</Heading>
        <Text stl={{ color: '$neutralText4' }}>Team metrics and quick actions</Text>
      </SceneHeader>

      <SceneContent>
        <StackY stl={{ gap: '$24' }}>
          {/* Stats row */}
          <StatsRow>
            <Card elevation="raised">
              <Card.Content>
                <FormGroup stl={{ gap: '$8' }}>
                  <Text stl={{ color: '$neutralText4', fontSize: '$small' }}>Revenue</Text>
                  <Heading as="h3" stl={{ fontSize: '$h3' }}>$48.2k</Heading>
                  <Progress value={72} aria-label="Revenue progress" />
                </FormGroup>
              </Card.Content>
            </Card>

            <Card elevation="raised">
              <Card.Content>
                <FormGroup stl={{ gap: '$8' }}>
                  <Text stl={{ color: '$neutralText4', fontSize: '$small' }}>Users</Text>
                  <Heading as="h3" stl={{ fontSize: '$h3' }}>1,204</Heading>
                  <Progress value={45} aria-label="User growth" />
                </FormGroup>
              </Card.Content>
            </Card>

            <Card elevation="raised">
              <Card.Content>
                <FormGroup stl={{ gap: '$8' }}>
                  <Text stl={{ color: '$neutralText4', fontSize: '$small' }}>Uptime</Text>
                  <Heading as="h3" stl={{ fontSize: '$h3' }}>99.9%</Heading>
                  <Progress value={99} aria-label="Uptime" />
                </FormGroup>
              </Card.Content>
            </Card>
          </StatsRow>

          {/* Controls row */}
          <ControlsRow>
            <ButtonGroup.Root>
              <Button theme="neutral" variant="outline">Export</Button>
              <Button theme="neutral" variant="outline">Share</Button>
            </ButtonGroup.Root>
            <ToggleGroup type="exclusive" defaultValue={['week']} aria-label="Time range">
              <Button value="day" theme="neutral" variant="outline">Day</Button>
              <Button value="week" theme="neutral" variant="outline">Week</Button>
              <Button value="month" theme="neutral" variant="outline">Month</Button>
            </ToggleGroup>
          </ControlsRow>

          {/* Team row */}
          <Card>
            <Card.Content>
              <FormGroup>
                <Heading as="h3" stl={{ fontSize: '$p', fontWeight: '$600' }}>Team</Heading>
                <TeamRow>
                  <Avatar size="md" fallback="AW" />
                  <Badge theme="grass" variant="subtle" size="sm">Online</Badge>
                  <Avatar size="sm" fallback="JT" />
                  <Badge theme="amber" variant="subtle" size="sm">Away</Badge>
                  <Avatar size="lg" fallback="KP" />
                  <Badge theme="grass" variant="subtle" size="sm">Online</Badge>
                  <Avatar size="sm" fallback="LN" />
                  <Badge theme="tomato" variant="subtle" size="sm">Busy</Badge>
                </TeamRow>
              </FormGroup>
            </Card.Content>
          </Card>

          {/* Filters */}
          <FilterRow>
            <Toggle theme="neutral" variant="outline" aria-label="Active filter">Active</Toggle>
            <Toggle theme="neutral" variant="outline" aria-label="Archived filter">Archived</Toggle>
            <Toggle theme="neutral" variant="outline" pressed aria-label="Starred filter">Starred</Toggle>
            <Toggle theme="neutral" variant="outline" aria-label="Draft filter">Draft</Toggle>
          </FilterRow>
        </StackY>
      </SceneContent>
    </SceneSection>
  )
}

// ─── Export ─────────────────────────────────────────────────────────────────

export function DemoSection() {
  return (
    <div>
      <SettingsScene />
      <ActivityScene />
      <DashboardScene />
    </div>
  )
}
