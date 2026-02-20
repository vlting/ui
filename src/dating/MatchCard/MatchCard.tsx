import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Heart, Image, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// MatchCard — card for a matched connection
//
// Displays a photo (top), name + age, and bio (truncated 2 lines).
// Compound component with sub-components for flexible composition.
// Pressable whole card with keyboard support (Enter/Space).
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type MatchCardProps = {
  /** Display name of the match */
  name: string
  /** Age of the match */
  age: number
  /** Photo source URI */
  photoSrc: string
  /** Short bio text */
  bio?: string
  /** Whether this is a new match */
  isNew?: boolean
  /** Callback when the card is pressed */
  onPress?: () => void
  /** Optional test ID for testing */
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type MatchCardPhotoProps = {
  src: string
  alt?: string
}

const MatchCardPhoto = React.memo(function MatchCardPhoto(
  props: MatchCardPhotoProps,
) {
  const { src, alt } = props

  return (
    <Image
      source={{ uri: src }}
      width="100%"
      aspectRatio={4 / 5}
      alt={alt ?? 'Match photo'}
      resizeMode="cover"
    />
  )
})

type MatchCardNameProps = {
  children: string
}

const MatchCardName = React.memo(function MatchCardName(
  props: MatchCardNameProps,
) {
  return (
    <Text
      fontSize="$4"
      fontWeight="700"
      color="$color"
      fontFamily="$body"
      numberOfLines={1}
    >
      {props.children}
    </Text>
  )
})

type MatchCardAgeProps = {
  children: number
}

const MatchCardAge = React.memo(function MatchCardAge(
  props: MatchCardAgeProps,
) {
  return (
    <Text
      fontSize="$3"
      color="$color2"
      fontFamily="$body"
    >
      {props.children}
    </Text>
  )
})

type MatchCardBioProps = {
  children: string
}

const MatchCardBio = React.memo(function MatchCardBio(
  props: MatchCardBioProps,
) {
  return (
    <Text
      fontSize="$2"
      color="$color2"
      fontFamily="$body"
      numberOfLines={2}
    >
      {props.children}
    </Text>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const MatchCardBase = React.memo(function MatchCardBase(
  props: MatchCardProps,
) {
  const {
    name,
    age,
    photoSrc,
    bio,
    isNew = false,
    onPress,
    testID,
  } = props

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  const cardLabel = `Match with ${name}, ${age}`

  const content = (
    <YStack
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
    >
      {/* Photo */}
      <View position="relative">
        <Image
          source={{ uri: photoSrc }}
          width="100%"
          aspectRatio={4 / 5}
          alt={name}
          resizeMode="cover"
        />

        {/* New badge */}
        {isNew ? (
          <XStack
            position="absolute"
            top="$2"
            left="$2"
            backgroundColor="$blue10"
            paddingVertical="$1"
            paddingHorizontal="$2"
            borderRadius="$2"
            alignItems="center"
            gap="$1"
            aria-label="New match"
          >
            <Heart size={12} color="white" aria-hidden />
            <Text
              fontSize="$1"
              fontWeight="700"
              color="white"
              fontFamily="$body"
            >
              New
            </Text>
          </XStack>
        ) : null}
      </View>

      {/* Info */}
      <YStack padding="$3" gap="$1">
        <XStack alignItems="baseline" gap="$2">
          <Text
            fontSize="$4"
            fontWeight="700"
            color="$color"
            fontFamily="$body"
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            fontSize="$3"
            color="$color2"
            fontFamily="$body"
          >
            {age}
          </Text>
        </XStack>

        {bio ? (
          <Text
            fontSize="$2"
            color="$color2"
            fontFamily="$body"
            numberOfLines={2}
          >
            {bio}
          </Text>
        ) : null}
      </YStack>
    </YStack>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        role="button"
        aria-label={cardLabel}
        accessibilityRole="button"
        accessibilityLabel={cardLabel}
        data-testid={testID}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View testID={testID} aria-label={cardLabel}>
      {content}
    </View>
  )
})

export const MatchCard = withStaticProperties(MatchCardBase, {
  Photo: MatchCardPhoto,
  Name: MatchCardName,
  Age: MatchCardAge,
  Bio: MatchCardBio,
})
