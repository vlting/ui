import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import { useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Separator } from '../../primitives/Separator'
import { Switch } from '../../components/Switch'
import { Textarea } from '../../components/Textarea'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const XStackJsx = XStack as AnyFC
const YStackJsx = YStack as AnyFC
const CardJsx = Card as AnyFC
const CardHeaderJsx = Card.Header as AnyFC
const CardTitleJsx = Card.Title as AnyFC
const CardDescriptionJsx = Card.Description as AnyFC
const CardContentJsx = Card.Content as AnyFC
const CardFooterJsx = Card.Footer as AnyFC
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const InputJsx = Input as AnyFC
const TextareaJsx = Textarea as AnyFC
const SeparatorJsx = Separator as AnyFC
const SwitchJsx = Switch as AnyFC
const AvatarJsx = Avatar as AnyFC
const SelectJsx = Select as unknown as AnyFC
const SelectItemJsx = Select.Item as unknown as AnyFC

const FormElement = styledHtml('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
} as any)
const FormJsx = FormElement as AnyFC

// -- Types --

export type SettingsBlockVariant = 'profile' | 'preferences' | 'account'

export interface PreferenceItem {
  label: string
  description?: string
  type: 'toggle' | 'select'
  value: boolean | string
  options?: string[]
  onChange: (value: boolean | string) => void
}

export interface SettingsBlockProps extends BlockProps {
  variant: SettingsBlockVariant
  title?: string
  description?: string
  onSave?: (data: Record<string, unknown>) => void
  loading?: boolean
  user?: { name?: string; email?: string; avatar?: string; bio?: string }
  preferences?: PreferenceItem[]
  onChangePassword?: () => void
  onDeleteAccount?: () => void
}

// -- Main component --

export function SettingsBlock(props: SettingsBlockProps) {
  switch (props.variant) {
    case 'profile':
      return <ProfileSettings {...props} />
    case 'preferences':
      return <PreferencesSettings {...props} />
    case 'account':
      return <AccountSettings {...props} />
  }
}

// -- Profile variant --

function ProfileSettings({
  title = 'Profile',
  description = 'Manage your profile information',
  user = {},
  onSave,
  loading = false,
}: SettingsBlockProps) {
  const [name, setName] = useState(user.name ?? '')
  const [email, setEmail] = useState(user.email ?? '')
  const [bio, setBio] = useState(user.bio ?? '')

  return (
    <CardJsx width="100%" style={{ maxWidth: 600 }}>
      <CardHeaderJsx>
        <CardTitleJsx>{title}</CardTitleJsx>
        <CardDescriptionJsx>{description}</CardDescriptionJsx>
      </CardHeaderJsx>
      <CardContentJsx>
        <FormJsx
          onSubmit={(e: Event) => {
            e.preventDefault()
            onSave?.({ name, email, bio })
          }}
        >
          <YStackJsx alignItems="center" gap="$3" paddingBottom="$2">
            <AvatarJsx size="lg" src={user.avatar} fallback={name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)} />
          </YStackJsx>

          <InputJsx label="Name" value={name} onChangeText={setName} placeholder="Your name" />
          <InputJsx
            label="Email"
            type="email"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
          />
          <TextareaJsx
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
          />

          <ButtonJsx
            variant="default"
            width="100%"
            onPress={() => onSave?.({ name, email, bio })}
            disabled={loading}
            loading={loading}
          >
            <ButtonTextJsx>Save changes</ButtonTextJsx>
          </ButtonJsx>
        </FormJsx>
      </CardContentJsx>
    </CardJsx>
  )
}

// -- Preferences variant --

function PreferencesSettings({
  title = 'Preferences',
  description = 'Manage your notification and display preferences',
  preferences = [],
}: SettingsBlockProps) {
  return (
    <CardJsx width="100%" style={{ maxWidth: 600 }}>
      <CardHeaderJsx>
        <CardTitleJsx>{title}</CardTitleJsx>
        <CardDescriptionJsx>{description}</CardDescriptionJsx>
      </CardHeaderJsx>
      <CardContentJsx>
        <YStackJsx gap="$0" width="100%">
          {preferences.map((pref, i) => (
            <ViewJsx key={`pref-${i}`}>
              {i > 0 && <SeparatorJsx />}
              <XStackJsx
                justifyContent="space-between"
                alignItems="center"
                paddingVertical="$3"
                width="100%"
              >
                <YStackJsx gap="$0.5" flex={1} paddingRight="$3">
                  <TextJsx fontSize="$4" fontWeight="$3" fontFamily="$body" color="$color">
                    {pref.label}
                  </TextJsx>
                  {pref.description && (
                    <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle">
                      {pref.description}
                    </TextJsx>
                  )}
                </YStackJsx>

                {pref.type === 'toggle' ? (
                  <SwitchJsx
                    checked={pref.value === true}
                    onCheckedChange={(checked: boolean) => pref.onChange(checked)}
                  />
                ) : pref.options ? (
                  <SelectJsx
                    value={String(pref.value)}
                    onValueChange={(val: string) => pref.onChange(val)}
                    placeholder="Select..."
                  >
                    {pref.options.map((opt) => (
                      <SelectItemJsx key={opt} value={opt}>
                        {opt}
                      </SelectItemJsx>
                    ))}
                  </SelectJsx>
                ) : null}
              </XStackJsx>
            </ViewJsx>
          ))}
        </YStackJsx>
      </CardContentJsx>
    </CardJsx>
  )
}

// -- Account variant --

function AccountSettings({
  title = 'Account',
  description = 'Manage your account security and settings',
  onChangePassword,
  onDeleteAccount,
  loading = false,
}: SettingsBlockProps) {
  return (
    <YStackJsx gap="$4" width="100%" style={{ maxWidth: 600 }}>
      <CardJsx>
        <CardHeaderJsx>
          <CardTitleJsx>{title}</CardTitleJsx>
          <CardDescriptionJsx>{description}</CardDescriptionJsx>
        </CardHeaderJsx>
        <CardContentJsx>
          <YStackJsx gap="$4">
            <XStackJsx justifyContent="space-between" alignItems="center">
              <YStackJsx gap="$0.5">
                <TextJsx fontSize="$4" fontWeight="$3" fontFamily="$body" color="$color">
                  Password
                </TextJsx>
                <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle">
                  Change your account password
                </TextJsx>
              </YStackJsx>
              <ButtonJsx variant="outline" onPress={onChangePassword} disabled={loading}>
                <ButtonTextJsx>Change password</ButtonTextJsx>
              </ButtonJsx>
            </XStackJsx>
          </YStackJsx>
        </CardContentJsx>
      </CardJsx>

      {onDeleteAccount && (
        <CardJsx borderColor="$red6">
          <CardHeaderJsx>
            <CardTitleJsx>
              <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$red10">
                Danger Zone
              </TextJsx>
            </CardTitleJsx>
            <CardDescriptionJsx>
              Permanently delete your account and all associated data.
            </CardDescriptionJsx>
          </CardHeaderJsx>
          <CardFooterJsx>
            <ButtonJsx variant="destructive" onPress={onDeleteAccount} disabled={loading}>
              <ButtonTextJsx>Delete account</ButtonTextJsx>
            </ButtonJsx>
          </CardFooterJsx>
        </CardJsx>
      )}
    </YStackJsx>
  )
}
