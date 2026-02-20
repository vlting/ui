import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Accordion,
  Breadcrumbs,
  Card,
  PageHeader,
  Section,
  SplitView,
  Tabs,
} from '@vlting/ui/layout'
import { Button, Checkbox, RadioGroup, Switch } from '@vlting/ui/primitives'
import {
  Combobox,
  DatePicker,
  DateRangePicker,
  FieldWrapper,
  FormContainer,
  HelperText,
  Label,
  MultiSelect,
  Select,
  TimePicker,
} from '@vlting/ui/forms'

import type { DateRange } from '@vlting/ui/forms'
import type { MultiSelectOption } from '@vlting/ui/forms'

const TIMEZONES: { value: string; label: string }[] = [
  { value: 'UTC',          label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago',  label: 'Central Time (CT)' },
  { value: 'America/Denver',   label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London',    label: 'London (GMT/BST)' },
  { value: 'Europe/Paris',     label: 'Paris (CET/CEST)' },
  { value: 'Asia/Tokyo',       label: 'Tokyo (JST)' },
  { value: 'Asia/Singapore',   label: 'Singapore (SGT)' },
]

const LANGUAGES = ['English', 'French', 'German', 'Spanish', 'Japanese', 'Portuguese']

const NOTIFICATION_CHANNELS: MultiSelectOption[] = [
  { value: 'email', label: 'Email' },
  { value: 'slack', label: 'Slack' },
  { value: 'sms',   label: 'SMS'   },
  { value: 'push',  label: 'Push'  },
]

const SETTINGS_SECTIONS = ['General', 'Notifications', 'Schedule', 'Billing']

export function SettingsPage() {
  const navigate = useNavigate()

  // General
  const [workspaceName, setWorkspaceName] = useState('Volta Workspace')
  const [timezone, setTimezone]           = useState('UTC')
  const [language, setLanguage]           = useState('English')
  const [dateFormat, setDateFormat]       = useState('mdy')

  // Notifications
  const [projNotify, setProjNotify]   = useState(true)
  const [memberNotify, setMemberNotify] = useState(false)
  const [billNotify, setBillNotify]   = useState(true)
  const [notifyChannels, setNotifyChannels] = useState<string[]>(['email'])

  // Schedule
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime]     = useState<Date | null>(null)
  const [blackout, setBlackout]   = useState<DateRange | null>(null)
  const [meetingDuration, setMeetingDuration] = useState('30')

  // Billing
  const [plan, setPlan] = useState<'free' | 'pro' | 'enterprise'>('pro')
  const [nextBilling, setNextBilling] = useState<Date | null>(null)

  const [activeSection, setActiveSection] = useState('General')

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home',     onPress: () => navigate('/') },
          { label: 'Settings', onPress: () => navigate('/settings') },
        ]}
      />

      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title>Settings</PageHeader.Title>
          <PageHeader.Subtitle>Manage your workspace preferences</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      <SplitView defaultSize={22} minSize={16} maxSize={30} style={{ flex: 1 }}>
        {/* Left — category nav */}
        <SplitView.First padding="$3" gap="$1">
          {SETTINGS_SECTIONS.map((s) => (
            <Button
              key={s}
              variant="tertiary"
              size="sm"
              onPress={() => setActiveSection(s)}
              backgroundColor={activeSection === s ? '$cobalt1' : undefined}
              borderLeftWidth={activeSection === s ? 3 : 0}
              borderLeftColor={activeSection === s ? '$cobalt7' : 'transparent'}
              justifyContent="flex-start"
            >
              <Button.Text
                variant="tertiary"
                style={{ color: activeSection === s ? '#2554e8' : undefined }}
              >
                {s}
              </Button.Text>
            </Button>
          ))}
        </SplitView.First>

        {/* Right — content */}
        <SplitView.Second padding="$4">
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <Tabs.List>
              {SETTINGS_SECTIONS.map((s) => (
                <Tabs.Tab key={s} value={s}>{s}</Tabs.Tab>
              ))}
            </Tabs.List>

            {/* ── General ─────────────────────────────── */}
            <Tabs.Panel value="General">
              <FormContainer padding="$4" gap="$4">
                <FieldWrapper>
                  <Label htmlFor="ws-name">Workspace Name</Label>
                  <input
                    id="ws-name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Timezone</Label>
                  <Combobox
                    label="Timezone"
                    options={TIMEZONES}
                    value={timezone}
                    onValueChange={setTimezone}
                    placeholder="Search timezone…"
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <Label htmlFor="ws-lang">Language</Label>
                  <Select id="ws-lang" value={language} onValueChange={setLanguage}>
                    {LANGUAGES.map((l) => (
                      <Select.Item key={l} value={l}>{l}</Select.Item>
                    ))}
                  </Select>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Date Format</Label>
                  <RadioGroup value={dateFormat} onValueChange={setDateFormat}>
                    <RadioGroup.Item value="mdy">MM/DD/YYYY</RadioGroup.Item>
                    <RadioGroup.Item value="dmy">DD/MM/YYYY</RadioGroup.Item>
                    <RadioGroup.Item value="ymd">YYYY-MM-DD</RadioGroup.Item>
                  </RadioGroup>
                </FieldWrapper>

                <Button onPress={() => {}}>
                  <Button.Text>Save General Settings</Button.Text>
                </Button>
              </FormContainer>
            </Tabs.Panel>

            {/* ── Notifications ───────────────────────── */}
            <Tabs.Panel value="Notifications">
              <Section padding="$4">
                <FieldWrapper>
                  <Label>Notify via</Label>
                  <MultiSelect
                    label="Channels"
                    options={NOTIFICATION_CHANNELS}
                    values={notifyChannels}
                    onValuesChange={setNotifyChannels}
                  />
                </FieldWrapper>

                <Accordion defaultValue="projects">
                  <Accordion.Item value="projects">
                    <Accordion.Trigger>
                      <Accordion.Title>Projects</Accordion.Title>
                    </Accordion.Trigger>
                    <Accordion.Content gap="$2">
                      <Switch.Row>
                        <Switch.LabelGroup><Switch.Label>New project created</Switch.Label></Switch.LabelGroup>
                        <Switch checked={projNotify} onCheckedChange={setProjNotify} aria-label="Project notifications"><Switch.Thumb /></Switch>
                      </Switch.Row>
                      <Checkbox checked={projNotify} onCheckedChange={(v) => setProjNotify(Boolean(v))} label="Milestone reached" />
                      <Checkbox checked={false} onCheckedChange={() => {}} label="Project overdue" />
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="members">
                    <Accordion.Trigger>
                      <Accordion.Title>Members</Accordion.Title>
                    </Accordion.Trigger>
                    <Accordion.Content gap="$2">
                      <Switch.Row>
                        <Switch.LabelGroup><Switch.Label>New member joined</Switch.Label></Switch.LabelGroup>
                        <Switch checked={memberNotify} onCheckedChange={setMemberNotify} aria-label="Member notifications"><Switch.Thumb /></Switch>
                      </Switch.Row>
                      <Checkbox checked={memberNotify} onCheckedChange={(v) => setMemberNotify(Boolean(v))} label="Role changed" />
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="billing">
                    <Accordion.Trigger>
                      <Accordion.Title>Billing</Accordion.Title>
                    </Accordion.Trigger>
                    <Accordion.Content gap="$2">
                      <Switch.Row>
                        <Switch.LabelGroup><Switch.Label>Payment failed</Switch.Label></Switch.LabelGroup>
                        <Switch checked={billNotify} onCheckedChange={setBillNotify} aria-label="Billing notifications"><Switch.Thumb /></Switch>
                      </Switch.Row>
                      <Checkbox checked={billNotify} onCheckedChange={(v) => setBillNotify(Boolean(v))} label="Invoice available" />
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </Section>
            </Tabs.Panel>

            {/* ── Schedule ────────────────────────────── */}
            <Tabs.Panel value="Schedule">
              <FormContainer padding="$4" gap="$4">
                <Section.Content flexDirection="row" gap="$3" flexWrap="wrap">
                  <FieldWrapper flex={1} minWidth={160}>
                    <Label>Working Hours Start</Label>
                    <TimePicker value={startTime} onValueChange={setStartTime} />
                  </FieldWrapper>
                  <FieldWrapper flex={1} minWidth={160}>
                    <Label>Working Hours End</Label>
                    <TimePicker value={endTime} onValueChange={setEndTime} />
                  </FieldWrapper>
                </Section.Content>

                <FieldWrapper>
                  <Label>Blackout Period</Label>
                  <HelperText>No meetings scheduled during this range.</HelperText>
                  <DateRangePicker
                    value={blackout}
                    onValueChange={setBlackout}
                    placeholder="Select date range"
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <Label htmlFor="meeting-dur">Default Meeting Duration</Label>
                  <Select id="meeting-dur" value={meetingDuration} onValueChange={setMeetingDuration}>
                    <Select.Item value="15">15 minutes</Select.Item>
                    <Select.Item value="30">30 minutes</Select.Item>
                    <Select.Item value="45">45 minutes</Select.Item>
                    <Select.Item value="60">1 hour</Select.Item>
                    <Select.Item value="90">90 minutes</Select.Item>
                  </Select>
                </FieldWrapper>

                <Button onPress={() => {}}>
                  <Button.Text>Save Schedule</Button.Text>
                </Button>
              </FormContainer>
            </Tabs.Panel>

            {/* ── Billing ─────────────────────────────── */}
            <Tabs.Panel value="Billing">
              <Section padding="$4" gap="$3">
                <Section.Content flexDirection="row" gap="$3" flexWrap="wrap">
                  {(['free', 'pro', 'enterprise'] as const).map((p) => (
                    <Card
                      key={p}
                      flex={1}
                      minWidth={160}
                      padding="$4"
                      bordered={plan === p}
                      borderColor={plan === p ? '$cobalt7' : '$borderColor'}
                      gap="$2"
                    >
                      <Card.Title style={{ textTransform: 'capitalize' }}>{p}</Card.Title>
                      <Card.Description>
                        {p === 'free' ? 'Up to 5 members · Free forever' :
                         p === 'pro'  ? '$12/seat/month · Up to 100 members' :
                                        'Custom pricing · Unlimited members'}
                      </Card.Description>
                      <Button
                        variant={plan === p ? 'secondary' : 'primary'}
                        size="sm"
                        disabled={plan === p}
                        onPress={() => setPlan(p)}
                      >
                        <Button.Text variant={plan === p ? 'secondary' : 'primary'}>
                          {plan === p ? 'Current plan' : 'Upgrade'}
                        </Button.Text>
                      </Button>
                    </Card>
                  ))}
                </Section.Content>

                <FieldWrapper>
                  <Label>Next Billing Date</Label>
                  <DatePicker
                    value={nextBilling}
                    onValueChange={setNextBilling}
                    placeholder="March 1, 2026"
                  />
                </FieldWrapper>
              </Section>
            </Tabs.Panel>
          </Tabs>
        </SplitView.Second>
      </SplitView>
    </>
  )
}
