import { useId } from 'react'
import { Text, View, YStack, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const TextareaFrame = styled(YStack, {
  gap: '$1.5',
})

// @ts-expect-error Tamagui v2 RC
const TextareaFieldFrame = styled(View, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  overflow: 'hidden',

  hoverStyle: {
    borderColor: '$borderColorHover',
  },

  focusWithinStyle: {
    borderColor: '$borderColorFocus',
    outlineWidth: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
    outlineOffset: 0,
  },

  variants: {
    error: {
      true: {
        borderColor: '$red10',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
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

const TEXTAREA_STYLES: Record<string, { fontSize: string; padding: string; minHeight: number }> = {
  sm: { fontSize: '12px', padding: '6px 8px', minHeight: 60 },
  md: { fontSize: '14px', padding: '8px 12px', minHeight: 80 },
  lg: { fontSize: '16px', padding: '10px 12px', minHeight: 100 },
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
  rows,
  maxLength,
}: TextareaProps) {
  const textareaId = useId()
  const helperId = useId()
  const displayHelper = error && errorMessage ? errorMessage : helperText
  const sizeStyles = TEXTAREA_STYLES[size]

  return (
    // @ts-expect-error Tamagui v2 RC
    <TextareaFrame>
      {label && (
        <label htmlFor={textareaId}>
          {/* @ts-expect-error Tamagui v2 RC */}
          <StyledLabelText>{label}</StyledLabelText>
        </label>
      )}
      {/* @ts-expect-error Tamagui v2 RC */}
      <TextareaFieldFrame error={error} disabled={disabled}>
        <textarea
          id={textareaId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChangeText ? (e) => onChangeText(e.target.value) : undefined}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={error || undefined}
          aria-describedby={displayHelper ? helperId : undefined}
          aria-label={!label ? placeholder : undefined}
          style={{
            fontFamily: 'inherit',
            fontSize: sizeStyles.fontSize,
            color: 'inherit',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            padding: sizeStyles.padding,
            minHeight: sizeStyles.minHeight,
            resize: 'vertical',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </TextareaFieldFrame>
      {displayHelper && (
        // @ts-expect-error Tamagui v2 RC
        <TextareaHelper id={helperId} color={error ? '$red10' : '$colorSubtitle'}>
          {displayHelper}
        </TextareaHelper>
      )}
    </TextareaFrame>
  )
}
