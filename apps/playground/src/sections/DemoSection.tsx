import type React from 'react'
import { useState } from 'react'
import { styled, Spinner } from '@vlting/stl-react'
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Collapsible,
  Drawer,
  Empty,
  Field,
  Form,
  Heading,
  Input,
  InputGroup,
  InputOTP,
  Item,
  Loader,
  NativeSelect,
  Progress,
  RadioGroup,
  Separator,
  Slider,
  Switch,
  Text,
  Textarea,
  Toggle,
  ToggleGroup,
} from '@vlting/ui'

// ─── Constants ──────────────────────────────────────────────────────────────

export const DEMO_SCENES = ['Settings', 'Activity', 'Dashboard', 'Media'] as const
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
  z: '$1',
  width: '100%',
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

const DrawerFilterList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
  p: '$16',
  flex: '1',
}, { name: 'DemoDrawerFilterList' })

// ─── Scene 1: Settings ──────────────────────────────────────────────────────

function SettingsScene() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [emailChecked, setEmailChecked] = useState(true)
  const [pushChecked, setPushChecked] = useState(true)
  const [displayName, setDisplayName] = useState('Maya Chen')
  const displayNameEmpty = displayName.trim() === ''
  const [smsChecked, setSmsChecked] = useState(false)
  const [language, setLanguage] = useState('en')
  const [deleteOpen, setDeleteOpen] = useState(false)

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
          <Text>Manage your account preferences and notifications.</Text>
        </div>

        <Card>
          <Card.Header>
            <Card.Title>Profile</Card.Title>
          </Card.Header>
          <Card.Content>
            <Form.Root onSubmit={(e: React.FormEvent) => e.preventDefault()} stl={{ display: 'flex', flexDirection: 'column', gap: '$16' }}>
              <Field.Root required error={displayNameEmpty}>
                <Field.Label>Display name</Field.Label>
                <Field.Control>
                  <Input placeholder="Enter your name" value={displayName} onChangeText={setDisplayName} />
                </Field.Control>
                <Field.Description>Visible to other members.</Field.Description>
                <Field.Error>Display name is required.</Field.Error>
              </Field.Root>
              <Field.Root>
                <Field.Label>Bio</Field.Label>
                <Field.Control>
                  <Textarea placeholder="Tell us about yourself" defaultValue="Coffee lover, part-time traveler exploring the world one city at a time." />
                </Field.Control>
                <Field.Description>Max 280 characters.</Field.Description>
              </Field.Root>
            </Form.Root>
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
            <Field.Root>
              <Field.Label>Timezone</Field.Label>
              <Field.Control>
                <NativeSelect.Root defaultValue="utc-8">
                  <NativeSelect.Option value="utc-5">Eastern (UTC-5)</NativeSelect.Option>
                  <NativeSelect.Option value="utc-6">Central (UTC-6)</NativeSelect.Option>
                  <NativeSelect.Option value="utc-7">Mountain (UTC-7)</NativeSelect.Option>
                  <NativeSelect.Option value="utc-8">Pacific (UTC-8)</NativeSelect.Option>
                </NativeSelect.Root>
              </Field.Control>
            </Field.Root>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Help &amp; FAQ</Card.Title>
          </Card.Header>
          <Card.Content>
            <Accordion type="single" defaultValue={['data-export']}>
              <Accordion.Item value="data-export">
                <Accordion.Trigger>How do I export my data?</Accordion.Trigger>
                <Accordion.Content>
                  Go to Settings → Data &amp; Privacy → Export. You can download a full archive of your account data in JSON or CSV format. Exports typically complete within a few minutes.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="two-factor">
                <Accordion.Trigger>How do I enable two-factor authentication?</Accordion.Trigger>
                <Accordion.Content>
                  Navigate to Security → Two-Factor Auth and scan the QR code with your authenticator app. You'll need to verify with a one-time code before it's active.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="delete-account">
                <Accordion.Trigger>Can I delete my account?</Accordion.Trigger>
                <Accordion.Content>
                  Yes. Under Data &amp; Privacy → Danger Zone, select "Delete account." This action is irreversible and removes all associated data after a 30-day grace period.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Card.Content>
        </Card>

        <Row>
          <Button theme="primary" variant="solid">Save changes</Button>
          <Button theme="primary" variant="outline">Cancel</Button>
          <AlertDialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
            <Button theme="destructive" variant="outline" onClick={() => setDeleteOpen(true)}>Delete account</Button>
            <AlertDialog.Content size="sm">
              <AlertDialog.Title>Delete account?</AlertDialog.Title>
              <AlertDialog.Description>
                This will permanently remove your account, projects, and all associated data. This action cannot be undone.
              </AlertDialog.Description>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>
                  <Button theme="neutral" variant="outline">Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button theme="destructive" variant="solid">Delete</Button>
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Row>
      </SceneInner>
    </Scene>
  )
}

// ─── Scene 2: Activity Feed ─────────────────────────────────────────────────

function ActivityScene() {
  return (
    <Scene stl={{ bg: '$surface2' }}>
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
          <Text>Recent updates and notifications from your team.</Text>
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
  const [filterOpen, setFilterOpen] = useState(false)

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
          <Text>Team metrics and project overview at a glance.</Text>
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
            <Drawer.Root direction="right" open={filterOpen} onOpenChange={setFilterOpen}>
              <Button size="sm" theme="neutral" variant="outline" onClick={() => setFilterOpen(true)}>Filter</Button>
              <Drawer.Content>
                <Drawer.Close />
                <Drawer.Header>
                  <Drawer.Title>Filters</Drawer.Title>
                  <Drawer.Description>Narrow down your dashboard view.</Drawer.Description>
                </Drawer.Header>
                <DrawerFilterList>
                  <Item theme="neutral" variant="ghost">
                    <Item.Content><Item.Title>Active</Item.Title></Item.Content>
                  </Item>
                  <Separator />
                  <Item theme="neutral" variant="ghost">
                    <Item.Content><Item.Title>Archived</Item.Title></Item.Content>
                  </Item>
                  <Separator />
                  <Item theme="neutral" variant="ghost">
                    <Item.Content><Item.Title>Critical only</Item.Title></Item.Content>
                  </Item>
                </DrawerFilterList>
                <Drawer.Footer>
                  <Button theme="neutral" variant="outline">Reset</Button>
                  <Button theme="primary" variant="solid">Apply</Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
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

        <Card>
          <Card.Content>
            <Collapsible.Root>
              <Collapsible.Trigger>Advanced metrics</Collapsible.Trigger>
              <Collapsible.Content>
                <StatsGrid>
                  <div>
                    <Text size="sm" tone="muted">P50 latency</Text>
                    <Heading.H3 stl={{ mt: '$4' }}>42ms</Heading.H3>
                  </div>
                  <div>
                    <Text size="sm" tone="muted">P99 latency</Text>
                    <Heading.H3 stl={{ mt: '$4' }}>380ms</Heading.H3>
                  </div>
                  <div>
                    <Text size="sm" tone="muted">Error rate</Text>
                    <Heading.H3 stl={{ mt: '$4' }}>0.03%</Heading.H3>
                  </div>
                </StatsGrid>
              </Collapsible.Content>
            </Collapsible.Root>
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

// ─── Scene 4: Media Player ──────────────────────────────────────────────────

const AlbumArt = styled('div', {
  width: '100%',
  maxWidth: '320px',
  height: '0',
  pb: '320px',
  borderRadius: '$card',
  overflow: 'hidden',
  position: 'relative',
  flexShrink: '0',
  mx: 'auto',
}, { name: 'DemoAlbumArt' })

const TrackInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',
}, { name: 'DemoTrackInfo' })

const PlaybackControls = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$24',
}, { name: 'DemoPlaybackControls' })

const SeekArea = styled('div', {
  width: '100%',
  maxWidth: '320px',
  mx: 'auto',
}, { name: 'DemoSeekArea' })

const SeekTimes = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  mt: '$8',
}, { name: 'DemoSeekTimes' })

const VolumeRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$12',
  maxWidth: '320px',
  mx: 'auto',
  width: '100%',
}, { name: 'DemoVolumeRow' })

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function MediaScene() {
  const [seek, setSeek] = useState(35)
  const [volume, setVolume] = useState(72)

  return (
    <Scene stl={{ bg: '$surface2' }}>
      <Orb
        aria-hidden="true"
        stl={{ width: '420px', height: '420px', top: '-120px', right: '-80px', bg: '$primaryAlpha3' }}
      />
      <Orb
        aria-hidden="true"
        stl={{ width: '300px', height: '300px', bottom: '-60px', left: '-60px', bg: '$secondaryAlpha3' }}
      />

      <SceneInner>
        <div>
          <Heading stl={{ mb: '$8' }}>Now Playing</Heading>
          <Text>Your music, your way.</Text>
        </div>

        <Card>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$20', alignItems: 'center' }}>
            {/* Album art */}
            <AlbumArt>
              <div
                data-decorative="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, var(--stl-color-primary5, hsl(320,85%,50%)), var(--stl-color-secondary6, hsl(345,80%,40%)))',
                }}
              />
              <Badge
                size="sm" theme="primary" variant="solid"
                stl={{ position: 'absolute', bottom: '$12', left: '$12' }}
              >
                Lossless
              </Badge>
            </AlbumArt>

            {/* Track info */}
            <TrackInfo>
              <Heading.H3>Midnight Drive</Heading.H3>
              <Text tone="muted">Glass Echoes</Text>
            </TrackInfo>

            {/* Seek slider */}
            <SeekArea>
              <Slider
                value={seek}
                onValueChange={setSeek}
                max={100}
                step={1}
                aria-label="Track progress"
              />
              <SeekTimes>
                <Text size="xs" tone="muted">{formatTime(Math.round(270 * seek / 100))}</Text>
                <Text size="xs" tone="muted">{formatTime(270 - Math.round(270 * seek / 100))}</Text>
              </SeekTimes>
            </SeekArea>

            {/* Playback controls */}
            <PlaybackControls>
              <Button pill square size="lg" theme="neutral" variant="ghost" aria-label="Previous track"><PrevIcon /></Button>
              <Button pill square size="xl" theme="primary" variant="solid" aria-label="Play"><PlayIcon /></Button>
              <Button pill square size="lg" theme="neutral" variant="ghost" aria-label="Next track"><NextIcon /></Button>
            </PlaybackControls>

            {/* Volume */}
            <VolumeRow>
              <Button pill square size="sm" theme="neutral" variant="ghost" aria-label="Volume down" onClick={() => setVolume((v) => Math.max(0, v - 10))}><VolumeLowIcon /></Button>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                aria-label="Volume"
                stl={{ flex: '1' }}
              />
              <Button pill square size="sm" theme="neutral" variant="ghost" aria-label="Volume up" onClick={() => setVolume((v) => Math.min(100, v + 10))}><VolumeHighIcon /></Button>
            </VolumeRow>
          </Card.Content>
        </Card>

        {/* Share link */}
        <Card>
          <Card.Header>
            <Card.Title>Share track</Card.Title>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$16' }}>
            <InputGroup size="md">
              <InputGroup.Addon><LinkIcon /></InputGroup.Addon>
              <InputGroup.Input>
                <Input
                  readOnly
                  defaultValue="https://play.vlt/t/midnight-drive"
                  aria-label="Share URL"
                />
              </InputGroup.Input>
              <InputGroup.ButtonAddon>
                <Button variant="outline" theme="neutral">Copy</Button>
              </InputGroup.ButtonAddon>
            </InputGroup>
          </Card.Content>
        </Card>

        {/* Share code */}
        <Card>
          <Card.Header>
            <Card.Title>Enter share code</Card.Title>
          </Card.Header>
          <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$8' }}>
            <Text size="sm" tone="muted">Paste the 6-digit code to access a shared playlist</Text>
            <InputOTP.Root maxLength={6} aria-label="Share code">
              <InputOTP.Group>
                <InputOTP.Slot index={0} />
                <InputOTP.Slot index={1} />
                <InputOTP.Slot index={2} />
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                <InputOTP.Slot index={3} />
                <InputOTP.Slot index={4} />
                <InputOTP.Slot index={5} />
              </InputOTP.Group>
            </InputOTP.Root>
          </Card.Content>
        </Card>

        <Row>
          <Button theme="primary" variant="solid">Join playlist</Button>
          <Button theme="neutral" variant="outline">Share new link</Button>
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

const PlayIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z" />
  </svg>
)

const PrevIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 18V6L2 12L8 18ZM22 18L12 12L22 6V18Z" />
  </svg>
)

const NextIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 6V18L22 12L16 6ZM2 6L12 12L2 18V6Z" />
  </svg>
)

const VolumeLowIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" opacity={0.5}>
    <path d="M8.88889 16H5C4.44772 16 4 15.5523 4 15V9C4 8.44772 4.44772 8 5 8H8.88889L14.1834 3.66815C14.3971 3.49329 14.7121 3.52479 14.887 3.73851C14.9601 3.82784 15 3.93971 15 4.05513V19.9449C15 20.2211 14.7761 20.4449 14.5 20.4449C14.3846 20.4449 14.2727 20.405 14.1834 20.3319L8.88889 16Z" />
  </svg>
)

const VolumeHighIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" opacity={0.5}>
    <path d="M8.88889 16H5C4.44772 16 4 15.5523 4 15V9C4 8.44772 4.44772 8 5 8H8.88889L14.1834 3.66815C14.3971 3.49329 14.7121 3.52479 14.887 3.73851C14.9601 3.82784 15 3.93971 15 4.05513V19.9449C15 20.2211 14.7761 20.4449 14.5 20.4449C14.3846 20.4449 14.2727 20.405 14.1834 20.3319L8.88889 16ZM18.8631 16.5911C20.0476 15.3966 20.7778 13.7835 20.7778 12C20.7778 10.2165 20.0476 8.60336 18.8631 7.40889L17.4411 8.83086C18.2841 9.68394 18.7778 10.8305 18.7778 12C18.7778 13.1695 18.2841 14.3161 17.4411 15.1691L18.8631 16.5911Z" />
  </svg>
)

const LinkIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.3643 15.5353L16.9501 14.1211L18.3643 12.7069C20.3169 10.7543 20.3169 7.58847 18.3643 5.63585C16.4116 3.68323 13.2458 3.68323 11.2932 5.63585L9.87898 7.05007L8.46477 5.63585L9.87898 4.22164C12.6127 1.48797 17.0448 1.48797 19.7785 4.22164C22.5121 6.95531 22.5121 11.3874 19.7785 14.1211L18.3643 15.5353ZM15.5358 18.3638L14.1216 19.778C11.388 22.5117 6.9558 22.5117 4.22213 19.778C1.48846 17.0443 1.48846 12.6122 4.22213 9.87856L5.63634 8.46434L7.05055 9.87856L5.63634 11.2928C3.68372 13.2454 3.68372 16.4112 5.63634 18.3638C7.58896 20.3164 10.7548 20.3164 12.7074 18.3638L14.1216 16.9496L15.5358 18.3638ZM14.8287 7.75717L16.2429 9.17139L9.17187 16.2424L7.75765 14.8282L14.8287 7.75717Z" />
  </svg>
)

// ─── Scene Map ──────────────────────────────────────────────────────────────

const SCENE_COMPONENTS: Record<DemoScene, React.ComponentType> = {
  Settings: SettingsScene,
  Activity: ActivityScene,
  Dashboard: DashboardScene,
  Media: MediaScene,
}

// ─── Export ─────────────────────────────────────────────────────────────────

export function DemoSection({ activeScene = 'Settings' }: { activeScene?: DemoScene }) {
  const SceneComponent = SCENE_COMPONENTS[activeScene]
  return <SceneComponent />
}
