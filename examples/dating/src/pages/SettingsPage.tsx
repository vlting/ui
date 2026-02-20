import React, { useContext, useState } from 'react'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Button, Switch } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  AlertTriangle as _AlertTriangle,
  ChevronRight as _ChevronRight,
  Eye as _Eye,
  Info as _Info,
  Lock as _Lock,
  Mail as _Mail,
  Moon as _Moon,
  Phone as _Phone,
  Settings as _Settings,
  Shield as _Shield,
  Sun as _Sun,
  Trash2 as _Trash2,
  User as _User,
} from '@tamagui/lucide-icons'

import { ThemeContext } from '../main'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const AlertTriangle = _AlertTriangle as IconFC
const ChevronRight  = _ChevronRight as IconFC
const Eye           = _Eye as IconFC
const Info          = _Info as IconFC
const Lock          = _Lock as IconFC
const Mail          = _Mail as IconFC
const Moon          = _Moon as IconFC
const Phone         = _Phone as IconFC
const SettingsIcon  = _Settings as IconFC
const Shield        = _Shield as IconFC
const Sun           = _Sun as IconFC
const Trash2        = _Trash2 as IconFC
const UserIcon      = _User as IconFC

// ---------------------------------------------------------------------------
// Theme options
// ---------------------------------------------------------------------------

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark',  label: 'Dark',  Icon: Moon },
] as const

// ---------------------------------------------------------------------------
// SettingsPage
// ---------------------------------------------------------------------------

export function SettingsPage() {
  const { theme, setTheme } = useContext(ThemeContext)

  // Notification toggles
  const [pushEnabled, setPushEnabled]         = useState(true)
  const [matchAlerts, setMatchAlerts]         = useState(true)
  const [messageNotifs, setMessageNotifs]     = useState(true)
  const [podUpdates, setPodUpdates]           = useState(false)

  // Privacy toggles
  const [showOnline, setShowOnline]           = useState(true)
  const [showDistance, setShowDistance]        = useState(true)

  // Danger zone confirmations
  const [showPauseConfirm, setShowPauseConfirm]   = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [accountPaused, setAccountPaused]         = useState(false)

  return (
    <>
      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <SettingsIcon size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Settings</PageHeader.Title>
          <PageHeader.Subtitle>Manage your account</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Account ──────────────────────────────────────── */}
      <Section title="Account" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$2">
          <Card.Content gap="$3">
            {/* Email */}
            <XStack alignItems="center" gap="$3">
              <Mail size={16} color="$gray9" aria-hidden />
              <YStack flex={1}>
                <Text fontSize="$1" color="$gray8">Email</Text>
                <Text fontSize="$3" color="$gray12">jamie.rivera@email.com</Text>
              </YStack>
            </XStack>

            {/* Divider */}
            <YStack height={1} backgroundColor="$gray4" />

            {/* Phone */}
            <XStack alignItems="center" gap="$3">
              <Phone size={16} color="$gray9" aria-hidden />
              <YStack flex={1}>
                <Text fontSize="$1" color="$gray8">Phone</Text>
                <Text fontSize="$3" color="$gray12">+1 (718) 555-0142</Text>
              </YStack>
            </XStack>

            {/* Divider */}
            <YStack height={1} backgroundColor="$gray4" />

            {/* Change password */}
            <XStack
              alignItems="center"
              gap="$3"
              paddingVertical="$1"
              accessible
              role="button"
              aria-label="Change password"
              cursor="pointer"
              pressStyle={{ opacity: 0.7 }}
            >
              <Lock size={16} color="$gray9" aria-hidden />
              <Text fontSize="$3" color="$gray12" flex={1}>Change Password</Text>
              <ChevronRight size={16} color="$gray8" aria-hidden />
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Notifications ────────────────────────────────── */}
      <Section title="Notifications" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$1">
          <Card.Content gap="$1">
            <SettingsToggle
              label="Push Notifications"
              description="Receive push notifications on your device"
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
            />
            <YStack height={1} backgroundColor="$gray4" />
            <SettingsToggle
              label="Match Alerts"
              description="Get notified when someone wants to match"
              checked={matchAlerts}
              onCheckedChange={setMatchAlerts}
            />
            <YStack height={1} backgroundColor="$gray4" />
            <SettingsToggle
              label="Messages"
              description="Notify for new messages"
              checked={messageNotifs}
              onCheckedChange={setMessageNotifs}
            />
            <YStack height={1} backgroundColor="$gray4" />
            <SettingsToggle
              label="Pod Updates"
              description="Daily pod activity summaries"
              checked={podUpdates}
              onCheckedChange={setPodUpdates}
            />
          </Card.Content>
        </Card>
      </Section>

      {/* ── Privacy ──────────────────────────────────────── */}
      <Section title="Privacy" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$1">
          <Card.Content gap="$1">
            <SettingsToggle
              label="Show Online Status"
              description="Let others see when you are active"
              checked={showOnline}
              onCheckedChange={setShowOnline}
            />
            <YStack height={1} backgroundColor="$gray4" />
            <SettingsToggle
              label="Show Distance"
              description="Display how far you are from others"
              checked={showDistance}
              onCheckedChange={setShowDistance}
            />
          </Card.Content>
        </Card>
      </Section>

      {/* ── Appearance ───────────────────────────────────── */}
      <Section title="Appearance" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$2">
          <Card.Content gap="$2">
            <Text fontSize="$3" fontWeight="500" color="$gray12">Theme</Text>
            <XStack gap="$2">
              {THEME_OPTIONS.map(({ value, label, Icon }) => {
                const isActive = theme === value
                return (
                  <XStack
                    key={value}
                    flex={1}
                    paddingVertical="$3"
                    borderRadius="$3"
                    borderWidth={2}
                    borderColor={isActive ? '$purple7' : '$gray5'}
                    backgroundColor={isActive ? '$purple1' : undefined}
                    alignItems="center"
                    justifyContent="center"
                    gap="$2"
                    onPress={() => setTheme(value as 'light' | 'dark')}
                    pressStyle={{ scale: 0.97, opacity: 0.9 }}
                    accessible
                    role="radio"
                    aria-checked={isActive}
                    aria-label={`${label} theme`}
                    cursor="pointer"
                  >
                    <Icon size={16} color={isActive ? '$purple9' : '$gray9'} aria-hidden />
                    <Text
                      fontSize="$3"
                      fontWeight={isActive ? '600' : '400'}
                      color={isActive ? '$purple11' : '$gray11'}
                    >
                      {label}
                    </Text>
                  </XStack>
                )
              })}
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Safety ───────────────────────────────────────── */}
      <Section title="Safety" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$1">
          <Card.Content gap="$1">
            <XStack
              alignItems="center"
              gap="$3"
              paddingVertical="$2"
              accessible
              role="button"
              aria-label="Blocked users"
              cursor="pointer"
              pressStyle={{ opacity: 0.7 }}
            >
              <Shield size={16} color="$gray9" aria-hidden />
              <Text fontSize="$3" color="$gray12" flex={1}>Blocked Users</Text>
              <ChevronRight size={16} color="$gray8" aria-hidden />
            </XStack>

            <YStack height={1} backgroundColor="$gray4" />

            <XStack
              alignItems="center"
              gap="$3"
              paddingVertical="$2"
              accessible
              role="button"
              aria-label="Report history"
              cursor="pointer"
              pressStyle={{ opacity: 0.7 }}
            >
              <AlertTriangle size={16} color="$gray9" aria-hidden />
              <Text fontSize="$3" color="$gray12" flex={1}>Report History</Text>
              <ChevronRight size={16} color="$gray8" aria-hidden />
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── About ────────────────────────────────────────── */}
      <Section title="About" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$1">
          <Card.Content gap="$1">
            <XStack alignItems="center" gap="$3" paddingVertical="$2">
              <Info size={16} color="$gray9" aria-hidden />
              <Text fontSize="$3" color="$gray12" flex={1}>App Version</Text>
              <Text fontSize="$3" color="$gray8">1.0.0</Text>
            </XStack>

            <YStack height={1} backgroundColor="$gray4" />

            <XStack
              alignItems="center"
              gap="$3"
              paddingVertical="$2"
              accessible
              role="button"
              aria-label="Terms of Service"
              cursor="pointer"
              pressStyle={{ opacity: 0.7 }}
            >
              <Text fontSize="$3" color="$purple9" flex={1}>Terms of Service</Text>
              <ChevronRight size={16} color="$gray8" aria-hidden />
            </XStack>

            <YStack height={1} backgroundColor="$gray4" />

            <XStack
              alignItems="center"
              gap="$3"
              paddingVertical="$2"
              accessible
              role="button"
              aria-label="Privacy Policy"
              cursor="pointer"
              pressStyle={{ opacity: 0.7 }}
            >
              <Text fontSize="$3" color="$purple9" flex={1}>Privacy Policy</Text>
              <ChevronRight size={16} color="$gray8" aria-hidden />
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Danger Zone ──────────────────────────────────── */}
      <Section title="Danger Zone" padding="$4" gap="$3">
        <Card padding="$3" bordered borderColor="$red5" gap="$3">
          <Card.Content gap="$3">
            {/* Pause account */}
            <YStack gap="$2">
              <Button
                variant="secondary"
                onPress={() => setShowPauseConfirm(!showPauseConfirm)}
                aria-label="Pause account"
              >
                <Button.Icon>
                  <Eye size={16} aria-hidden />
                </Button.Icon>
                <Button.Text variant="secondary">
                  {accountPaused ? 'Account Paused' : 'Pause Account'}
                </Button.Text>
              </Button>

              {showPauseConfirm && !accountPaused && (
                <Card padding="$3" backgroundColor="$orange2" bordered borderColor="$orange5">
                  <Card.Content gap="$2">
                    <Text fontSize="$2" color="$orange11" fontWeight="600">
                      Pause your account?
                    </Text>
                    <Text fontSize="$2" color="$orange9">
                      Your profile will be hidden and you will not be placed in pods until you unpause.
                    </Text>
                    <XStack gap="$2" marginTop="$1">
                      <Button
                        variant="destructive"
                        size="sm"
                        flex={1}
                        onPress={() => { setAccountPaused(true); setShowPauseConfirm(false) }}
                      >
                        <Button.Text>Yes, Pause</Button.Text>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        flex={1}
                        onPress={() => setShowPauseConfirm(false)}
                      >
                        <Button.Text variant="secondary">Cancel</Button.Text>
                      </Button>
                    </XStack>
                  </Card.Content>
                </Card>
              )}

              {accountPaused && (
                <Card padding="$3" backgroundColor="$orange1" bordered borderColor="$orange5">
                  <Card.Content gap="$2">
                    <Text fontSize="$2" color="$orange11" fontWeight="600">
                      Your account is paused
                    </Text>
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => setAccountPaused(false)}
                    >
                      <Button.Text variant="secondary">Unpause Account</Button.Text>
                    </Button>
                  </Card.Content>
                </Card>
              )}
            </YStack>

            {/* Delete account */}
            <YStack gap="$2">
              <Button
                variant="destructive"
                onPress={() => setShowDeleteConfirm(!showDeleteConfirm)}
                aria-label="Delete account"
              >
                <Button.Icon>
                  <Trash2 size={16} aria-hidden />
                </Button.Icon>
                <Button.Text>Delete Account</Button.Text>
              </Button>

              {showDeleteConfirm && (
                <Card padding="$3" backgroundColor="$red2" bordered borderColor="$red5">
                  <Card.Content gap="$2">
                    <Text fontSize="$2" color="$red11" fontWeight="600">
                      Delete your account permanently?
                    </Text>
                    <Text fontSize="$2" color="$red9">
                      This action cannot be undone. All your data, matches, and conversations will be permanently deleted.
                    </Text>
                    <XStack gap="$2" marginTop="$1">
                      <Button
                        variant="destructive"
                        size="sm"
                        flex={1}
                        onPress={() => setShowDeleteConfirm(false)}
                      >
                        <Button.Text>Yes, Delete Forever</Button.Text>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        flex={1}
                        onPress={() => setShowDeleteConfirm(false)}
                      >
                        <Button.Text variant="secondary">Cancel</Button.Text>
                      </Button>
                    </XStack>
                  </Card.Content>
                </Card>
              )}
            </YStack>
          </Card.Content>
        </Card>
      </Section>

      {/* Bottom padding */}
      <YStack height="$4" />
    </>
  )
}

// ---------------------------------------------------------------------------
// SettingsToggle — reusable row with label + Switch
// ---------------------------------------------------------------------------

interface SettingsToggleProps {
  label: string
  description: string
  checked: boolean
  onCheckedChange: (val: boolean) => void
}

function SettingsToggle({ label, description, checked, onCheckedChange }: SettingsToggleProps) {
  return (
    <XStack
      alignItems="center"
      gap="$3"
      paddingVertical="$2"
    >
      <YStack flex={1} gap="$0.5">
        <Text fontSize="$3" fontWeight="500" color="$gray12">{label}</Text>
        <Text fontSize="$1" color="$gray8">{description}</Text>
      </YStack>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      >
        <Switch.Thumb />
      </Switch>
    </XStack>
  )
}
