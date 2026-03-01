import { TextArea as TamaguiTextArea } from '@tamagui/input'
import { useId } from 'react'
import type { ComponentType } from 'react'
import { Text, YStack, styled } from 'tamagui'

// Extend Tamagui TextArea with our error variant.
// Tamagui TextArea already renders <textarea> with proper styling and sizing.
const StyledTextArea = styled(TamaguiTextArea, {
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    error: {
      true: {
        borderColor: '$red10',
      },
    },
  } as const,
} as any)

// Cast for JSX — Tamagui v2 RC GetFinalProps bug
const StyledTextAreaJsx = StyledTextArea as ComponentType<Record<string, unknown>>

// @ts-expect-error Tamagui v2 RC
const TextareaFrame = styled(YStack, {
  gap: '$1.5',
})

// @ts-expect-error Tamagui v2 RC
const StyledLabelText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  fontSize: '$3',
  color: '$color',
})

// @ts-expect-error Tamagui v2 RC
const TextareaHelper = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  color: '$colorSubtitle',
})

// Map named sizes to Tamagui size tokens
const SIZE_TOKEN_MAP: Record<string, string> = {
  sm: '$3',
  md: '$4',
  lg: '$5',
}

export interface TextareaProps {
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  rows?: number
  maxLength?: number
}

export function Textarea({
  value,
  defaultValue,
  onChangeText,
  placeholder,
  label,
  helperText,
  error,
  errorMessage,
  disabled,
  size = 'md',
  rows = 3,
  maxLength,
}: TextareaProps) {
  const textareaId = useId()
  const helperId = useId()
  const displayHelper = error && errorMessage ? errorMessage : helperText
  const sizeToken = SIZE_TOKEN_MAP[size]

  return (
    // @ts-expect-error Tamagui v2 RC
    <TextareaFrame>
      {label && (
        <label htmlFor={textareaId}>
          {/* @ts-expect-error Tamagui v2 RC */}
          <StyledLabelText>{label}</StyledLabelText>
        </label>
      )}
      <StyledTextAreaJsx
        id={textareaId}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        error={error}
        size={sizeToken}
        aria-invalid={error || undefined}
        aria-describedby={displayHelper ? helperId : undefined}
        aria-label={!label ? placeholder : undefined}
      />
      {displayHelper && (
        // @ts-expect-error Tamagui v2 RC
        <TextareaHelper id={helperId} color={error ? '$red10' : '$colorSubtitle'}>
          {displayHelper}
        </TextareaHelper>
      )}
    </TextareaFrame>
  )
}
