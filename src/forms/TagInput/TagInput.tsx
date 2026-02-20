import { X } from '../_jsx-compat'
import React, { useCallback, useRef, useState } from 'react'
import { Pressable } from 'react-native'
import { Input, Text, XStack, YStack } from '../_jsx-compat'

export type TagInputProps = {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  testID?: string
}

export function TagInput({
  value = [],
  onChange,
  placeholder = 'Add a tag…',
  disabled = false,
  maxTags,
  testID,
}: TagInputProps) {
  const [inputText, setInputText] = useState('')
  const inputRef = useRef<{ focus: () => void } | null>(null)

  const addTag = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      if (value.includes(trimmed)) return
      if (maxTags !== undefined && value.length >= maxTags) return
      onChange?.([...value, trimmed])
      setInputText('')
    },
    [value, maxTags, onChange],
  )

  const removeTag = useCallback(
    (tag: string) => {
      onChange?.(value.filter((t) => t !== tag))
    },
    [value, onChange],
  )

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === 'Enter' || key === ',') {
        addTag(inputText)
      } else if (key === 'Backspace' && inputText === '' && value.length > 0) {
        removeTag(value[value.length - 1])
      }
    },
    [inputText, value, addTag, removeTag],
  )

  return (
    <XStack
      flexWrap="wrap"
      gap="$1"
      padding="$2"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$3"
      backgroundColor="$background"
      alignItems="center"
      testID={testID}
      role="group"
      aria-label="Tag input"
    >
      {value.map((tag) => (
        <XStack
          key={tag}
          alignItems="center"
          gap="$1"
          paddingHorizontal="$2"
          paddingVertical="$1"
          borderRadius="$2"
          backgroundColor="$color3"
        >
          <Text fontSize="$3" color="$color">
            {tag}
          </Text>
          <Pressable
            onPress={() => removeTag(tag)}
            disabled={disabled}
            aria-label={`Remove ${tag}`}
          >
            <X size={12} color="$color2" />
          </Pressable>
        </XStack>
      ))}
      <Input
        ref={inputRef as never}
        value={inputText}
        onChangeText={setInputText}
        placeholder={value.length === 0 ? placeholder : undefined}
        disabled={disabled}
        flex={1}
        minWidth={80}
        height="$4"
        borderWidth={0}
        backgroundColor="transparent"
        paddingHorizontal="$1"
        fontSize="$4"
        color="$color"
        onKeyPress={({ nativeEvent }: { nativeEvent: { key: string } }) =>
          handleKeyPress(nativeEvent.key)
        }
        returnKeyType="done"
        onSubmitEditing={() => addTag(inputText)}
      />
      {/* Invisible to prevent layout issues with empty state */}
      {value.length === 0 && disabled && (
        <YStack>
          <Text fontSize="$3" color="$placeholderColor" />
        </YStack>
      )}
    </XStack>
  )
}
