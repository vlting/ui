import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { Input, Separator, Spinner, Text, TextArea, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// DatingProfileEditor — controlled form for editing a dating profile
//
// Simplified version: handles Name (text input), Bio (TextArea), and displays
// current Interests and Location Radius. PhotoGalleryUploader,
// InterestSelector, and LocationRadiusSelector are composed by consuming apps.
// Inline validation errors per field, onSave button at bottom.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type DatingProfileValue = {
  name: string
  bio: string
  interests: string[]
  locationRadius: number
}

export type DatingProfileEditorProps = {
  value: DatingProfileValue
  onChange: (value: DatingProfileValue) => void
  onSave?: () => void
  isSaving?: boolean
  errors?: Partial<Record<keyof DatingProfileValue, string>>
  testID?: string
}

// ---------------------------------------------------------------------------
// Internal helper: field error display
// ---------------------------------------------------------------------------

type FieldErrorProps = {
  error?: string
  id: string
}

const FieldError = React.memo(function FieldError(props: FieldErrorProps) {
  const { error, id } = props

  if (!error) return null

  return (
    <Text
      id={id}
      fontSize="$2"
      color="$red10"
      fontFamily="$body"
      role="alert"
    >
      {error}
    </Text>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const DatingProfileEditor = React.memo(function DatingProfileEditor(
  props: DatingProfileEditorProps,
) {
  const {
    value,
    onChange,
    onSave,
    isSaving = false,
    errors = {},
    testID,
  } = props

  const hasErrors = Object.values(errors).some((e) => e != null && e !== '')

  const handleNameChange = useCallback(
    (text: string) => {
      onChange({ ...value, name: text })
    },
    [onChange, value],
  )

  const handleBioChange = useCallback(
    (text: string) => {
      onChange({ ...value, bio: text })
    },
    [onChange, value],
  )

  const handleSave = useCallback(() => {
    if (!isSaving && !hasErrors && onSave) {
      onSave()
    }
  }, [isSaving, hasErrors, onSave])

  const canSave = !isSaving && !hasErrors && onSave != null

  return (
    <YStack
      testID={testID}
      role="form"
      aria-label="Dating profile editor"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$4"
    >
      {/* Error announcement region */}
      <View aria-live="polite" aria-atomic={true}>
        {hasErrors ? (
          <Text
            fontSize="$2"
            color="$red10"
            fontFamily="$body"
          >
            Please fix the errors below
          </Text>
        ) : null}
      </View>

      {/* Name field */}
      <YStack gap="$1">
        <Text
          fontSize="$2"
          fontWeight="600"
          color="$color2"
          fontFamily="$body"
          id="name-label"
        >
          Name
        </Text>
        <Input
          value={value.name}
          onChangeText={handleNameChange}
          aria-label="Name"
          aria-labelledby="name-label"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={errors.name != null}
          disabled={isSaving}
          fontSize="$3"
          fontFamily="$body"
          borderRadius="$3"
          borderWidth={1}
          borderColor={errors.name ? '$red10' : '$borderColor'}
          padding="$2"
        />
        <FieldError error={errors.name} id="name-error" />
      </YStack>

      <Separator />

      {/* Bio field */}
      <YStack gap="$1">
        <Text
          fontSize="$2"
          fontWeight="600"
          color="$color2"
          fontFamily="$body"
          id="bio-label"
        >
          Bio
        </Text>
        <TextArea
          value={value.bio}
          onChangeText={handleBioChange}
          aria-label="Bio"
          aria-labelledby="bio-label"
          aria-describedby={errors.bio ? 'bio-error' : undefined}
          aria-invalid={errors.bio != null}
          disabled={isSaving}
          placeholder="Tell others about yourself..."
          minHeight={100}
          borderWidth={1}
          borderColor={errors.bio ? '$red10' : '$borderColor'}
          borderRadius="$3"
          padding="$2"
          fontFamily="$body"
          fontSize="$3"
        />
        <FieldError error={errors.bio} id="bio-error" />
      </YStack>

      <Separator />

      {/* Interests display */}
      <YStack gap="$1">
        <Text
          fontSize="$2"
          fontWeight="600"
          color="$color2"
          fontFamily="$body"
        >
          Interests
        </Text>
        {value.interests.length > 0 ? (
          <XStack flexWrap="wrap" gap="$2" role="list" aria-label="Current interests">
            {value.interests.map((interest) => (
              <View
                key={interest}
                role="listitem"
                backgroundColor="$gray3"
                paddingVertical="$1"
                paddingHorizontal="$2"
                borderRadius="$2"
              >
                <Text
                  fontSize="$2"
                  color="$color"
                  fontFamily="$body"
                >
                  {interest}
                </Text>
              </View>
            ))}
          </XStack>
        ) : (
          <Text
            fontSize="$2"
            color="$color2"
            fontFamily="$body"
          >
            No interests added
          </Text>
        )}
        <FieldError error={errors.interests} id="interests-error" />
      </YStack>

      <Separator />

      {/* Location radius display */}
      <YStack gap="$1">
        <Text
          fontSize="$2"
          fontWeight="600"
          color="$color2"
          fontFamily="$body"
        >
          Location Radius
        </Text>
        <Text
          fontSize="$3"
          color="$color"
          fontFamily="$body"
        >
          {value.locationRadius} miles
        </Text>
        <FieldError error={errors.locationRadius} id="location-error" />
      </YStack>

      <Separator />

      {/* Save button */}
      {onSave ? (
        <XStack justifyContent="flex-end">
          <Pressable
            onPress={handleSave}
            disabled={!canSave}
            role="button"
            aria-label="Save profile"
            aria-disabled={!canSave}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSave }}
            accessibilityLabel="Save profile"
            data-testid={testID ? `${testID}-save` : undefined}
          >
            <XStack
              paddingVertical="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              backgroundColor={canSave ? '$color10' : '$gray6'}
              minHeight={40}
              alignItems="center"
              justifyContent="center"
              gap="$2"
              cursor={canSave ? 'pointer' : 'not-allowed'}
              opacity={!canSave ? 0.5 : 1}
            >
              {isSaving ? (
                <Spinner size="small" color="white" />
              ) : null}
              <Text
                fontSize="$3"
                fontWeight="600"
                color="white"
                fontFamily="$body"
              >
                Save
              </Text>
            </XStack>
          </Pressable>
        </XStack>
      ) : null}
    </YStack>
  )
})
