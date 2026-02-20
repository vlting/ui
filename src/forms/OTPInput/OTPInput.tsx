import React, { useCallback, useRef } from 'react'
import { Input, XStack } from '../_jsx-compat'

export type OTPInputProps = {
  length?: number
  value?: string
  onChange?: (val: string) => void
  onComplete?: (val: string) => void
  disabled?: boolean
  error?: boolean
  testID?: string
}

export const OTPInput = React.memo(function OTPInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = false,
  testID,
}: OTPInputProps) {
  const segments = Array.from({ length }, (_, i) => value[i] ?? '')
  const refs = useRef<Array<{ focus: () => void } | null>>([])

  const focusSegment = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        refs.current[index]?.focus()
      }
    },
    [length],
  )

  const handleChange = useCallback(
    (index: number, char: string) => {
      const newChar = char.slice(-1)
      const chars = value.split('')
      chars[index] = newChar
      const newValue = chars.join('').slice(0, length)
      onChange?.(newValue)
      if (newChar && index < length - 1) {
        focusSegment(index + 1)
      }
      if (newValue.length === length && !newValue.includes('')) {
        onComplete?.(newValue)
      }
    },
    [value, length, onChange, onComplete, focusSegment],
  )

  const handleKeyDown = useCallback(
    (index: number, key: string) => {
      if (key === 'Backspace') {
        if (!segments[index]) {
          focusSegment(index - 1)
        } else {
          const chars = value.split('')
          chars[index] = ''
          onChange?.(chars.join(''))
        }
      } else if (key === 'ArrowLeft') {
        focusSegment(index - 1)
      } else if (key === 'ArrowRight') {
        focusSegment(index + 1)
      }
    },
    [segments, value, onChange, focusSegment],
  )

  const handlePaste = useCallback(
    (pasteText: string) => {
      const chars = pasteText.replace(/\D/g, '').slice(0, length)
      onChange?.(chars)
      if (chars.length === length) {
        onComplete?.(chars)
        focusSegment(length - 1)
      } else {
        focusSegment(chars.length)
      }
    },
    [length, onChange, onComplete, focusSegment],
  )

  return (
    <XStack gap="$2" testID={testID} role="group" aria-label="Verification code">
      {segments.map((char, i) => (
        <Input
          key={i}
          value={char}
          maxLength={1}
          disabled={disabled}
          width="$6"
          height="$4"
          textAlign="center"
          fontSize="$5"
          fontWeight="600"
          borderRadius="$2"
          borderWidth={1}
          borderColor={error ? '$red10' : '$borderColor'}
          backgroundColor="$background"
          color="$color"
          aria-label={`Digit ${i + 1} of ${length}`}
          ref={(el: unknown) => {
            refs.current[i] = el as { focus: () => void } | null
          }}
          onChangeText={(text: string) => handleChange(i, text)}
          onKeyPress={({ nativeEvent }: { nativeEvent: { key: string } }) =>
            handleKeyDown(i, nativeEvent.key)
          }
          onPaste={(e: { nativeEvent: { text: string } }) => handlePaste(e.nativeEvent.text)}
        />
      ))}
    </XStack>
  )
})
