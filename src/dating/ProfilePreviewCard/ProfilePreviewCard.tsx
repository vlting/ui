import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Image, Text, User, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// ProfilePreviewCard — read-only profile card
//
// Displays a large photo, name + age, bio (truncated 3 lines), and interests
// as non-interactive chips. Pressable if onPress is provided.
// Compound component with sub-components for flexible composition.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type ProfilePreviewCardProps = {
  name: string
  age?: number
  photoSrc: string
  bio?: string
  interests?: string[]
  onPress?: () => void
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type ProfilePreviewCardPhotoProps = {
  src: string
  alt?: string
}

const ProfilePreviewCardPhoto = React.memo(function ProfilePreviewCardPhoto(
  props: ProfilePreviewCardPhotoProps,
) {
  const { src, alt } = props

  if (src) {
    return (
      <Image
        source={{ uri: src }}
        width="100%"
        aspectRatio={4 / 5}
        alt={alt ?? 'Profile photo'}
        resizeMode="cover"
      />
    )
  }

  return (
    <View
      width="100%"
      aspectRatio={4 / 5}
      backgroundColor="$gray4"
      alignItems="center"
      justifyContent="center"
    >
      <User size={48} color="$color2" aria-hidden />
    </View>
  )
})

type ProfilePreviewCardNameProps = {
  children: React.ReactNode
}

const ProfilePreviewCardName = React.memo(function ProfilePreviewCardName(
  props: ProfilePreviewCardNameProps,
) {
  return (
    <Text
      fontSize="$5"
      fontWeight="700"
      color="$color"
      fontFamily="$body"
      numberOfLines={1}
    >
      {props.children}
    </Text>
  )
})

type ProfilePreviewCardBioProps = {
  children: string
}

const ProfilePreviewCardBio = React.memo(function ProfilePreviewCardBio(
  props: ProfilePreviewCardBioProps,
) {
  return (
    <Text
      fontSize="$3"
      color="$color2"
      fontFamily="$body"
      numberOfLines={3}
    >
      {props.children}
    </Text>
  )
})

type ProfilePreviewCardInterestsProps = {
  interests: string[]
}

const ProfilePreviewCardInterests = React.memo(function ProfilePreviewCardInterests(
  props: ProfilePreviewCardInterestsProps,
) {
  const { interests } = props

  if (interests.length === 0) return null

  return (
    <XStack flexWrap="wrap" gap="$2" role="list" aria-label="Interests">
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
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ProfilePreviewCardBase = React.memo(function ProfilePreviewCardBase(
  props: ProfilePreviewCardProps,
) {
  const {
    name,
    age,
    photoSrc,
    bio,
    interests = [],
    onPress,
    testID,
  } = props

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  const cardLabel = age
    ? `View profile of ${name}, ${age}`
    : `View profile of ${name}`

  const content = (
    <YStack
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
    >
      {/* Photo */}
      <ProfilePreviewCardPhoto src={photoSrc} alt={name} />

      {/* Info */}
      <YStack padding="$3" gap="$2">
        <XStack alignItems="baseline" gap="$2">
          <Text
            fontSize="$5"
            fontWeight="700"
            color="$color"
            fontFamily="$body"
            numberOfLines={1}
          >
            {name}
          </Text>
          {age != null ? (
            <Text
              fontSize="$4"
              color="$color2"
              fontFamily="$body"
            >
              {age}
            </Text>
          ) : null}
        </XStack>

        {bio ? (
          <Text
            fontSize="$3"
            color="$color2"
            fontFamily="$body"
            numberOfLines={3}
          >
            {bio}
          </Text>
        ) : null}

        {interests.length > 0 ? (
          <ProfilePreviewCardInterests interests={interests} />
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

export const ProfilePreviewCard = withStaticProperties(ProfilePreviewCardBase, {
  Photo: ProfilePreviewCardPhoto,
  Name: ProfilePreviewCardName,
  Bio: ProfilePreviewCardBio,
  Interests: ProfilePreviewCardInterests,
})
