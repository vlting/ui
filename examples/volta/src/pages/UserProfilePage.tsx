import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Accordion, Breadcrumbs, Card, PageHeader, Section, Tabs } from '@vlting/ui/layout'
import { Avatar, Button, Checkbox, RadioGroup, Switch } from '@vlting/ui/primitives'
import {
  DatePicker,
  FieldWrapper,
  FormContainer,
  HelperText,
  InlineError,
  Label,
  MultiImageUploader,
  PasswordStrengthMeter,
  Select,
  TagInput,
  TextArea,
  ValidationMessage,
} from '@vlting/ui/forms'
import { mockUsers } from '../data/mock'

const ROLES = ['Admin', 'Engineer', 'Designer', 'Product', 'Marketing', 'Sales', 'Finance', 'Legal', 'Support']

export function UserProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = mockUsers.find((u) => u.id === id) ?? mockUsers[0]!

  // Profile tab state
  const [name, setName]         = useState(user.name)
  const [bio, setBio]           = useState(user.bio)
  const [role, setRole]         = useState(user.role)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [tags, setTags]         = useState<string[]>(user.tags)
  const [profileSaved, setProfileSaved] = useState(false)

  // Security tab state
  const [currentPw, setCurrentPw]   = useState('')
  const [newPw, setNewPw]           = useState('')
  const [confirmPw, setConfirmPw]   = useState('')
  const [twoFaEnabled, setTwoFaEnabled] = useState(false)
  const [twoFaMethod, setTwoFaMethod]   = useState('email')

  // Preferences tab state
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifySlack, setNotifySlack] = useState(false)
  const [privateProfile, setPrivateProfile] = useState(false)
  const [darkMode, setDarkMode]       = useState(false)

  const pwMismatch = confirmPw.length > 0 && newPw !== confirmPw

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home',  onPress: () => navigate('/') },
          { label: 'Users', onPress: () => navigate('/users') },
          { label: user.name },
        ]}
      />

      <PageHeader>
        <PageHeader.Leading>
          <Avatar name={user.name} size="xl" />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>{user.name}</PageHeader.Title>
          <PageHeader.Subtitle>{user.role} · {user.email}</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      <Tabs defaultValue="profile" style={{ flex: 1 }}>
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
          <Tabs.Tab value="preferences">Preferences</Tabs.Tab>
        </Tabs.List>

        {/* ── Profile tab ─────────────────────────────── */}
        <Tabs.Panel value="profile">
          <FormContainer padding="$4" gap="$4">
            <FieldWrapper>
              <Label htmlFor="profile-name">Full Name</Label>
              <input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label htmlFor="profile-bio">Bio</Label>
              <TextArea
                id="profile-bio"
                value={bio}
                onChangeText={setBio}
                rows={3}
                placeholder="Tell us about yourself"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label htmlFor="profile-role">Role</Label>
              <Select id="profile-role" value={role} onValueChange={setRole}>
                {ROLES.map((r) => (
                  <Select.Item key={r} value={r}>{r}</Select.Item>
                ))}
              </Select>
            </FieldWrapper>

            <FieldWrapper>
              <Label>Start Date</Label>
              <DatePicker
                value={startDate}
                onValueChange={setStartDate}
                placeholder="Select start date"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label>Skills & Interests</Label>
              <TagInput
                tags={tags}
                onTagsChange={setTags}
                placeholder="Add a skill"
              />
            </FieldWrapper>

            <FieldWrapper>
              <Label>Profile Photos</Label>
              <MultiImageUploader
                maxImages={3}
                onImagesChange={() => {}}
              />
            </FieldWrapper>

            {profileSaved && (
              <ValidationMessage variant="success">
                Profile saved successfully.
              </ValidationMessage>
            )}

            <Button onPress={() => setProfileSaved(true)}>
              <Button.Text>Save Profile</Button.Text>
            </Button>
          </FormContainer>
        </Tabs.Panel>

        {/* ── Security tab ─────────────────────────────── */}
        <Tabs.Panel value="security">
          <Section title="Change Password" padding="$4" gap="$3">
            <FormContainer gap="$3">
              <FieldWrapper>
                <Label htmlFor="current-pw">Current Password</Label>
                <input
                  id="current-pw"
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
                />
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="new-pw">New Password</Label>
                <input
                  id="new-pw"
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
                />
                <PasswordStrengthMeter password={newPw} />
                <HelperText>At least 12 characters, including uppercase, number, and symbol.</HelperText>
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="confirm-pw">Confirm New Password</Label>
                <input
                  id="confirm-pw"
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
                />
                {pwMismatch && <InlineError>Passwords do not match.</InlineError>}
              </FieldWrapper>

              <Button disabled={pwMismatch || !newPw || !currentPw}>
                <Button.Text>Update Password</Button.Text>
              </Button>
            </FormContainer>
          </Section>

          <Section title="Two-Factor Authentication" padding="$4" gap="$3">
            <Switch.Row>
              <Switch.LabelGroup>
                <Switch.Label>Enable 2FA</Switch.Label>
                <Switch.Description>Require a second factor when signing in.</Switch.Description>
              </Switch.LabelGroup>
              <Switch
                checked={twoFaEnabled}
                onCheckedChange={setTwoFaEnabled}
                aria-label="Enable two-factor authentication"
              >
                <Switch.Thumb />
              </Switch>
            </Switch.Row>

            {twoFaEnabled && (
              <>
                <Label>Verification Method</Label>
                <RadioGroup value={twoFaMethod} onValueChange={setTwoFaMethod}>
                  <RadioGroup.Item value="sms">SMS</RadioGroup.Item>
                  <RadioGroup.Item value="email">Email</RadioGroup.Item>
                  <RadioGroup.Item value="app">Authenticator App</RadioGroup.Item>
                </RadioGroup>
              </>
            )}

            <Button disabled={!twoFaEnabled}>
              <Button.Text>Save 2FA Settings</Button.Text>
            </Button>
          </Section>
        </Tabs.Panel>

        {/* ── Preferences tab ──────────────────────────── */}
        <Tabs.Panel value="preferences">
          <Section padding="$4">
            <Accordion defaultValue="notifications">
              <Accordion.Item value="notifications">
                <Accordion.Trigger>
                  <Accordion.Title>Notifications</Accordion.Title>
                </Accordion.Trigger>
                <Accordion.Content gap="$3">
                  <Switch.Row>
                    <Switch.LabelGroup>
                      <Switch.Label>Email notifications</Switch.Label>
                    </Switch.LabelGroup>
                    <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} aria-label="Email notifications">
                      <Switch.Thumb />
                    </Switch>
                  </Switch.Row>
                  <Switch.Row>
                    <Switch.LabelGroup>
                      <Switch.Label>Slack notifications</Switch.Label>
                    </Switch.LabelGroup>
                    <Switch checked={notifySlack} onCheckedChange={setNotifySlack} aria-label="Slack notifications">
                      <Switch.Thumb />
                    </Switch>
                  </Switch.Row>
                  <Checkbox
                    checked={notifyEmail}
                    onCheckedChange={(v) => setNotifyEmail(Boolean(v))}
                    label="Notify me about @mentions"
                  />
                  <Checkbox
                    checked={notifySlack}
                    onCheckedChange={(v) => setNotifySlack(Boolean(v))}
                    label="Weekly digest"
                  />
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="privacy">
                <Accordion.Trigger>
                  <Accordion.Title>Privacy</Accordion.Title>
                </Accordion.Trigger>
                <Accordion.Content gap="$3">
                  <Switch.Row>
                    <Switch.LabelGroup>
                      <Switch.Label>Private profile</Switch.Label>
                      <Switch.Description>Only team members can view your profile.</Switch.Description>
                    </Switch.LabelGroup>
                    <Switch checked={privateProfile} onCheckedChange={setPrivateProfile} aria-label="Private profile">
                      <Switch.Thumb />
                    </Switch>
                  </Switch.Row>
                  <Checkbox
                    checked={privateProfile}
                    onCheckedChange={(v) => setPrivateProfile(Boolean(v))}
                    label="Hide last active time"
                  />
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="appearance">
                <Accordion.Trigger>
                  <Accordion.Title>Appearance</Accordion.Title>
                </Accordion.Trigger>
                <Accordion.Content gap="$3">
                  <Switch.Row>
                    <Switch.LabelGroup>
                      <Switch.Label>Dark mode</Switch.Label>
                    </Switch.LabelGroup>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Dark mode">
                      <Switch.Thumb />
                    </Switch>
                  </Switch.Row>
                  <Checkbox
                    checked={darkMode}
                    onCheckedChange={(v) => setDarkMode(Boolean(v))}
                    label="Use system preference"
                  />
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Section>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}
