import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Heart, Image, Text, User, View, XStack, YStack } from '../_jsx-compat'
import { MatchRequestBadge } from '../MatchRequestBadge/MatchRequestBadge'

// ---------------------------------------------------------------------------
// PodMemberCard — card for a member within a dating pod
//
// Displays avatar, name, bio (truncated 1 line), match status badge.
// Compound component with sub-components for flexible composition.
// Pressable card with keyboard support.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type PodMemberCardProps = {
  name: string
  photoSrc?: string
  bio?: string
  matchStatus?: 'none' | 'pending' | 'mutual'
  onPress?: () => void
  onMatchRequest?: () => void
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type PodMemberCardPhotoProps = {
  src?: string
  name?: string
  size?: number
}

const PodMemberCardPhoto = React.memo(function PodMemberCardPhoto(
  props: PodMemberCardPhotoProps,
) {
  const { src, name, size = 56 } = props
  const radius = size / 2

  if (src) {
    return (
      <Image
        source={{ uri: src }}
        width={size}
        height={size}
        borderRadius={radius}
        alt={name ?? 'Pod member photo'}
      />
    )
  }

  return (
    <View
      width={size}
      height={size}
      borderRadius={radius}
      backgroundColor="$gray4"
      alignItems="center"
      justifyContent="center"
    >
      <User size={size * 0.5} color="$color2" aria-hidden />
    </View>
  )
})

type PodMemberCardNameProps = {
  children: string
}

const PodMemberCardName = React.memo(function PodMemberCardName(
  props: PodMemberCardNameProps,
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

type PodMemberCardBioProps = {
  children: string
}

const PodMemberCardBio = React.memo(function PodMemberCardBio(
  props: PodMemberCardBioProps,
) {
  return (
    <Text
      fontSize="$2"
      color="$color2"
      fontFamily="$body"
      numberOfLines={1}
    >
      {props.children}
    </Text>
  )
})

type PodMemberCardMatchButtonProps = {
  onPress?: () => void
}

const PodMemberCardMatchButton = React.memo(function PodMemberCardMatchButton(
  props: PodMemberCardMatchButtonProps,
) {
  const { onPress } = props

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  return (
    <Pressable
      onPress={handlePress}
      role="button"
      aria-label="Send match request"
      accessibilityRole="button"
      accessibilityLabel="Send match request"
    >
      <View
        padding="$2"
        borderRadius="$2"
        backgroundColor="$pink6"
        alignItems="center"
        justifyContent="center"
      >
        <Heart size={16} color="$color" aria-hidden />
      </View>
    </Pressable>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const PodMemberCardBase = React.memo(function PodMemberCardBase(
  props: PodMemberCardProps,
) {
  const {
    name,
    photoSrc,
    bio,
    matchStatus = 'none',
    onPress,
    onMatchRequest,
    testID,
  } = props

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  const content = (
    <YStack
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$3"
      gap="$2"
    >
      {/* Top row: photo + info */}
      <XStack alignItems="center" gap="$3">
        <PodMemberCardPhoto src={photoSrc} name={name} />

        <YStack flex={1} gap="$1">
          <XStack alignItems="center" gap="$2">
            <Text
              fontSize="$4"
              fontWeight="700"
              color="$color"
              fontFamily="$body"
              numberOfLines={1}
              flex={1}
            >
              {name}
            </Text>
            <MatchRequestBadge status={matchStatus} />
          </XStack>

          {bio ? (
            <Text
              fontSize="$2"
              color="$color2"
              fontFamily="$body"
              numberOfLines={1}
            >
              {bio}
            </Text>
          ) : null}
        </YStack>
      </XStack>

      {/* Match request button */}
      {onMatchRequest ? (
        <XStack justifyContent="flex-end">
          <PodMemberCardMatchButton onPress={onMatchRequest} />
        </XStack>
      ) : null}
    </YStack>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        role="button"
        aria-label={`Pod member ${name}`}
        accessibilityRole="button"
        accessibilityLabel={`Pod member ${name}`}
        data-testid={testID}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View testID={testID} aria-label={`Pod member ${name}`}>
      {content}
    </View>
  )
})

export const PodMemberCard = withStaticProperties(PodMemberCardBase, {
  Photo: PodMemberCardPhoto,
  Name: PodMemberCardName,
  Bio: PodMemberCardBio,
  MatchButton: PodMemberCardMatchButton,
})
