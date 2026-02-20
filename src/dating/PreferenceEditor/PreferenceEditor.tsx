import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Separator, Spinner, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// PreferenceEditor — controlled preference display/container component
//
// Sections for age range, interests, location, and deal breakers with labels.
// This is a layout/container — AgeRangeSelector, InterestSelector,
// LocationRadiusSelector, DealBreakerSelector are composed by consuming apps.
// Provides save button at bottom.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type PreferenceValue = {
  ageRange: [number, number]
  interests: string[]
  locationRadius: number
  dealBreakers: string[]
}

export type PreferenceEditorProps = {
  value: PreferenceValue
  onChange: (value: PreferenceValue) => void
  onSave?: () => void
  isSaving?: boolean
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type PreferenceEditorAgeRangeProps = {
  ageRange: [number, number]
  children?: React.ReactNode
}

const PreferenceEditorAgeRange = React.memo(function PreferenceEditorAgeRange(
  props: PreferenceEditorAgeRangeProps,
) {
  const { ageRange, children } = props

  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Age Range
      </Text>
      <Text
        fontSize="$3"
        color="$color2"
        fontFamily="$body"
      >
        {ageRange[0]} - {ageRange[1]}
      </Text>
      {children}
    </YStack>
  )
})

type PreferenceEditorInterestsProps = {
  interests: string[]
  children?: React.ReactNode
}

const PreferenceEditorInterests = React.memo(function PreferenceEditorInterests(
  props: PreferenceEditorInterestsProps,
) {
  const { interests, children } = props

  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Interests
      </Text>
      {interests.length > 0 ? (
        <XStack flexWrap="wrap" gap="$2" role="list" aria-label="Preferred interests">
          {interests.map((interest) => (
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
          No interests selected
        </Text>
      )}
      {children}
    </YStack>
  )
})

type PreferenceEditorLocationProps = {
  locationRadius: number
  children?: React.ReactNode
}

const PreferenceEditorLocation = React.memo(function PreferenceEditorLocation(
  props: PreferenceEditorLocationProps,
) {
  const { locationRadius, children } = props

  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Location Radius
      </Text>
      <Text
        fontSize="$3"
        color="$color2"
        fontFamily="$body"
      >
        {locationRadius} miles
      </Text>
      {children}
    </YStack>
  )
})

type PreferenceEditorDealBreakersProps = {
  dealBreakers: string[]
  children?: React.ReactNode
}

const PreferenceEditorDealBreakers = React.memo(function PreferenceEditorDealBreakers(
  props: PreferenceEditorDealBreakersProps,
) {
  const { dealBreakers, children } = props

  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Deal Breakers
      </Text>
      {dealBreakers.length > 0 ? (
        <XStack flexWrap="wrap" gap="$2" role="list" aria-label="Deal breakers">
          {dealBreakers.map((item) => (
            <View
              key={item}
              role="listitem"
              backgroundColor="$red3"
              paddingVertical="$1"
              paddingHorizontal="$2"
              borderRadius="$2"
            >
              <Text
                fontSize="$2"
                color="$red10"
                fontFamily="$body"
              >
                {item}
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
          No deal breakers set
        </Text>
      )}
      {children}
    </YStack>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const PreferenceEditorBase = React.memo(function PreferenceEditorBase(
  props: PreferenceEditorProps,
) {
  const {
    value,
    // onChange is available for consuming apps to wire up selectors
    onChange: _onChange,
    onSave,
    isSaving = false,
    testID,
  } = props

  const handleSave = useCallback(() => {
    if (!isSaving && onSave) {
      onSave()
    }
  }, [isSaving, onSave])

  const canSave = !isSaving && onSave != null

  return (
    <YStack
      testID={testID}
      role="form"
      aria-label="Preference editor"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$4"
    >
      {/* Age Range */}
      <PreferenceEditorAgeRange ageRange={value.ageRange} />

      <Separator />

      {/* Interests */}
      <PreferenceEditorInterests interests={value.interests} />

      <Separator />

      {/* Location */}
      <PreferenceEditorLocation locationRadius={value.locationRadius} />

      <Separator />

      {/* Deal Breakers */}
      <PreferenceEditorDealBreakers dealBreakers={value.dealBreakers} />

      <Separator />

      {/* Save button */}
      {onSave ? (
        <XStack justifyContent="flex-end">
          <Pressable
            onPress={handleSave}
            disabled={!canSave}
            role="button"
            aria-label="Save preferences"
            aria-disabled={!canSave}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSave }}
            accessibilityLabel="Save preferences"
            data-testid={testID ? `${testID}-save` : undefined}
          >
            <XStack
              paddingVertical="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              backgroundColor={canSave ? '$blue10' : '$gray6'}
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

export const PreferenceEditor = withStaticProperties(PreferenceEditorBase, {
  AgeRange: PreferenceEditorAgeRange,
  Interests: PreferenceEditorInterests,
  Location: PreferenceEditorLocation,
  DealBreakers: PreferenceEditorDealBreakers,
})
