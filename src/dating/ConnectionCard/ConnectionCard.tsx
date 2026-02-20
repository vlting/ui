import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Image, Text, User, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// ConnectionCard — card for a persistent matched connection
//
// Displays an avatar, name, last message preview, time, and unread indicator.
// Compound component with sub-components for flexible composition.
// Pressable if onPress is provided.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type ConnectionCardProps = {
  /** Display name of the connection */
  name: string
  /** Avatar photo source URI */
  photoSrc?: string
  /** Preview of the last message */
  lastMessage?: string
  /** Timestamp of the last message */
  lastMessageTime?: string
  /** Whether there are unread messages */
  unread?: boolean
  /** Callback when the card is pressed */
  onPress?: () => void
  /** Optional test ID for testing */
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type ConnectionCardPhotoProps = {
  src?: string
  name?: string
  size?: number
}

const ConnectionCardPhoto = React.memo(function ConnectionCardPhoto(
  props: ConnectionCardPhotoProps,
) {
  const { src, name, size = 48 } = props
  const radius = size / 2

  if (src) {
    return (
      <Image
        source={{ uri: src }}
        width={size}
        height={size}
        borderRadius={radius}
        alt={name ?? 'Connection photo'}
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

type ConnectionCardNameProps = {
  children: string
  bold?: boolean
}

const ConnectionCardName = React.memo(function ConnectionCardName(
  props: ConnectionCardNameProps,
) {
  const { children, bold = false } = props

  return (
    <Text
      fontSize="$3"
      fontWeight={bold ? '700' : '400'}
      color="$color"
      fontFamily="$body"
      numberOfLines={1}
    >
      {children}
    </Text>
  )
})

type ConnectionCardLastMessageProps = {
  children: string
}

const ConnectionCardLastMessage = React.memo(function ConnectionCardLastMessage(
  props: ConnectionCardLastMessageProps,
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

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ConnectionCardBase = React.memo(function ConnectionCardBase(
  props: ConnectionCardProps,
) {
  const {
    name,
    photoSrc,
    lastMessage,
    lastMessageTime,
    unread = false,
    onPress,
    testID,
  } = props

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  const content = (
    <XStack
      alignItems="center"
      gap="$3"
      padding="$3"
      backgroundColor="$background"
      borderRadius="$3"
      borderWidth={1}
      borderColor="$borderColor"
    >
      {/* Avatar */}
      <ConnectionCardPhoto src={photoSrc} name={name} />

      {/* Content */}
      <YStack flex={1} gap="$1">
        <XStack alignItems="center" gap="$2">
          <Text
            fontSize="$3"
            fontWeight={unread ? '700' : '400'}
            color="$color"
            fontFamily="$body"
            numberOfLines={1}
            flex={1}
          >
            {name}
          </Text>
          {lastMessageTime ? (
            <Text
              fontSize="$1"
              color="$color2"
              fontFamily="$body"
            >
              {lastMessageTime}
            </Text>
          ) : null}
        </XStack>
        {lastMessage ? (
          <Text
            fontSize="$2"
            color="$color2"
            fontFamily="$body"
            numberOfLines={1}
          >
            {lastMessage}
          </Text>
        ) : null}
      </YStack>

      {/* Unread indicator */}
      {unread ? (
        <View
          width={10}
          height={10}
          borderRadius={5}
          backgroundColor="$blue10"
          aria-label="Unread"
        />
      ) : null}
    </XStack>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        role="button"
        aria-label={`Connection with ${name}`}
        accessibilityRole="button"
        accessibilityLabel={`Connection with ${name}`}
        data-testid={testID}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View testID={testID} aria-label={`Connection with ${name}`}>
      {content}
    </View>
  )
})

export const ConnectionCard = withStaticProperties(ConnectionCardBase, {
  Photo: ConnectionCardPhoto,
  Name: ConnectionCardName,
  LastMessage: ConnectionCardLastMessage,
})
