import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Input, MessageCircle, Send, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// IceBreakerCard — card displaying an ice-breaker prompt with responses
//
// Shows a prompt at top, list of responses, and an input for new responses.
// Compound component with sub-components for flexible composition.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type IceBreakerResponse = {
  id: string
  authorName: string
  content: string
  timestamp: string
}

export type IceBreakerCardProps = {
  prompt: string
  responses?: IceBreakerResponse[]
  onSubmitResponse?: (content: string) => void
  hasResponded?: boolean
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type IceBreakerCardPromptProps = {
  children: string
}

const IceBreakerCardPrompt = React.memo(function IceBreakerCardPrompt(
  props: IceBreakerCardPromptProps,
) {
  return (
    <XStack alignItems="center" gap="$2">
      <MessageCircle size={20} color="$color" aria-hidden />
      <Text
        fontSize="$5"
        fontWeight="700"
        color="$color"
        fontFamily="$body"
        flex={1}
      >
        {props.children}
      </Text>
    </XStack>
  )
})

type ResponseItemProps = {
  response: IceBreakerResponse
}

const ResponseItem = React.memo(function ResponseItem(
  props: ResponseItemProps,
) {
  const { response } = props

  return (
    <YStack
      padding="$2"
      backgroundColor="$gray3"
      borderRadius="$3"
      gap="$1"
    >
      <XStack alignItems="center" gap="$2">
        <Text
          fontSize="$2"
          fontWeight="700"
          color="$color"
          fontFamily="$body"
        >
          {response.authorName}
        </Text>
        <Text
          fontSize="$1"
          color="$color2"
          fontFamily="$body"
        >
          {response.timestamp}
        </Text>
      </XStack>
      <Text
        fontSize="$3"
        color="$color"
        fontFamily="$body"
      >
        {response.content}
      </Text>
    </YStack>
  )
})

type IceBreakerCardResponseListProps = {
  responses: IceBreakerResponse[]
}

const IceBreakerCardResponseList = React.memo(function IceBreakerCardResponseList(
  props: IceBreakerCardResponseListProps,
) {
  const { responses } = props

  if (responses.length === 0) return null

  return (
    <YStack gap="$2" role="list" aria-label="Responses">
      {responses.map((response) => (
        <View key={response.id} role="listitem">
          <ResponseItem response={response} />
        </View>
      ))}
    </YStack>
  )
})

type IceBreakerCardInputProps = {
  onSubmit?: (content: string) => void
}

const IceBreakerCardInput = React.memo(function IceBreakerCardInput(
  props: IceBreakerCardInputProps,
) {
  const { onSubmit } = props
  const [text, setText] = useState('')

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim()
    if (trimmed && onSubmit) {
      onSubmit(trimmed)
      setText('')
    }
  }, [text, onSubmit])

  return (
    <XStack
      gap="$2"
      alignItems="center"
      borderTopWidth={1}
      borderTopColor="$borderColor"
      paddingTop="$2"
    >
      <Input
        flex={1}
        value={text}
        onChangeText={setText}
        placeholder="Your response..."
        aria-label="Response input"
        fontSize="$3"
        fontFamily="$body"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$borderColor"
        padding="$2"
      />
      <Pressable
        onPress={handleSubmit}
        role="button"
        aria-label="Submit response"
        accessibilityRole="button"
        accessibilityLabel="Submit response"
        disabled={text.trim().length === 0}
      >
        <View
          padding="$2"
          borderRadius="$2"
          backgroundColor={text.trim().length > 0 ? '$color10' : '$gray4'}
          alignItems="center"
          justifyContent="center"
        >
          <Send size={18} color="white" aria-hidden />
        </View>
      </Pressable>
    </XStack>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const truncatePrompt = (prompt: string, maxLen = 50): string =>
  prompt.length > maxLen ? `${prompt.slice(0, maxLen)}...` : prompt

const IceBreakerCardBase = React.memo(function IceBreakerCardBase(
  props: IceBreakerCardProps,
) {
  const {
    prompt,
    responses = [],
    onSubmitResponse,
    hasResponded = false,
    testID,
  } = props

  return (
    <YStack
      testID={testID}
      role="article"
      aria-label={`Ice-breaker: ${truncatePrompt(prompt)}`}
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$3"
      gap="$3"
    >
      {/* Prompt */}
      <IceBreakerCardPrompt>{prompt}</IceBreakerCardPrompt>

      {/* Responses */}
      <IceBreakerCardResponseList responses={responses} />

      {/* Input (hidden if already responded) */}
      {!hasResponded && onSubmitResponse ? (
        <IceBreakerCardInput onSubmit={onSubmitResponse} />
      ) : null}
    </YStack>
  )
})

export const IceBreakerCard = withStaticProperties(IceBreakerCardBase, {
  Prompt: IceBreakerCardPrompt,
  ResponseList: IceBreakerCardResponseList,
  Input: IceBreakerCardInput,
})
