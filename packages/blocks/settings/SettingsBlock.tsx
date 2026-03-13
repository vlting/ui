import type { ComponentType } from 'react'
import { useState } from 'react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Switch } from '../../components/Switch'
import { Textarea } from '../../components/Textarea'
import { Separator } from '../../primitives/Separator'
import { styled } from '../../stl-react/src/config'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const CardJsx = Card as AnyFC
const CardHeaderJsx = Card.Header as AnyFC
const CardTitleJsx = Card.Title as AnyFC
const CardDescriptionJsx = Card.Description as AnyFC
const CardContentJsx = Card.Content as AnyFC
const CardFooterJsx = Card.Footer as AnyFC
const ButtonJsx = Button as AnyFC
const InputJsx = Input as AnyFC
const TextareaJsx = Textarea as AnyFC
const SeparatorJsx = Separator as AnyFC
const SwitchJsx = Switch as AnyFC
const AvatarJsx = Avatar as AnyFC
const SelectJsx = Select as unknown as AnyFC
const SelectItemJsx = Select.Item as unknown as AnyFC

const FormElement = styled(
  'form',
  {
    stl: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: '100%',
    },
    styleName: 'SettingsForm',
  },
)

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
    <CardJsx style={{ width: '100%', maxWidth: 600 }}>
      <CardHeaderJsx>
        <CardTitleJsx>{title}</CardTitleJsx>
        <CardDescriptionJsx>{description}</CardDescriptionJsx>
      </CardHeaderJsx>
      <CardContentJsx>
        <FormElement
          onSubmit={(e: Event) => {
            e.preventDefault()
            onSave?.({ name, email, bio })
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              paddingBottom: 8,
            }}
          >
            <AvatarJsx
              size="lg"
              src={user.avatar}
              fallback={name
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            />
          </div>

          <InputJsx
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
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
            Save changes
          </ButtonJsx>
        </FormElement>
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
    <CardJsx style={{ width: '100%', maxWidth: 600 }}>
      <CardHeaderJsx>
        <CardTitleJsx>{title}</CardTitleJsx>
        <CardDescriptionJsx>{description}</CardDescriptionJsx>
      </CardHeaderJsx>
      <CardContentJsx>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {preferences.map((pref, i) => (
            <div key={`pref-${i}`}>
              {i > 0 && <SeparatorJsx />}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 12,
                  paddingBottom: 12,
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flex: 1,
                    paddingRight: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color)',
                    }}
                  >
                    {pref.label}
                  </span>
                  {pref.description && (
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: 'var(--font-body)',
                        color: 'var(--secondaryText12)',
                      }}
                    >
                      {pref.description}
                    </span>
                  )}
                </div>

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
              </div>
            </div>
          ))}
        </div>
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
        maxWidth: 600,
      }}
    >
      <CardJsx>
        <CardHeaderJsx>
          <CardTitleJsx>{title}</CardTitleJsx>
          <CardDescriptionJsx>{description}</CardDescriptionJsx>
        </CardHeaderJsx>
        <CardContentJsx>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color)',
                  }}
                >
                  Password
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: 'var(--font-body)',
                    color: 'var(--secondaryText12)',
                  }}
                >
                  Change your account password
                </span>
              </div>
              <ButtonJsx variant="outline" onPress={onChangePassword} disabled={loading}>
                Change password
              </ButtonJsx>
            </div>
          </div>
        </CardContentJsx>
      </CardJsx>

      {onDeleteAccount && (
        <CardJsx style={{ borderColor: 'var(--red6)' }}>
          <CardHeaderJsx>
            <CardTitleJsx>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--red10)',
                }}
              >
                Danger Zone
              </span>
            </CardTitleJsx>
            <CardDescriptionJsx>
              Permanently delete your account and all associated data.
            </CardDescriptionJsx>
          </CardHeaderJsx>
          <CardFooterJsx>
            <ButtonJsx variant="destructive" onPress={onDeleteAccount} disabled={loading}>
              Delete account
            </ButtonJsx>
          </CardFooterJsx>
        </CardJsx>
      )}
    </div>
  )
}
