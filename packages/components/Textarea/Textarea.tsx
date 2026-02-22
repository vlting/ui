import { Text, YStack, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const TextareaFrame = styled(YStack, {
  gap: '$1.5',
})

// @ts-expect-error Tamagui v2 RC
const TextareaField = styled(Text, {
  tag: 'textarea',
  fontFamily: '$body',
  fontSize: '$3',
  color: '$color',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  minHeight: 80,
  outlineWidth: 0,

  hoverStyle: {
    borderColor: '$borderColorHover',
  },

  focusStyle: {
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
    size: {
      sm: {
        fontSize: '$2',
        paddingHorizontal: '$2',
        paddingVertical: '$1.5',
        minHeight: 60,
      },
      md: {
        fontSize: '$3',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        minHeight: 80,
      },
      lg: {
        fontSize: '$4',
        paddingHorizontal: '$3',
        paddingVertical: '$2.5',
        minHeight: 100,
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const TextareaLabel = styled(Text, {
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
  const displayHelper = error && errorMessage ? errorMessage : helperText

  return (
    // @ts-expect-error Tamagui v2 RC
    <TextareaFrame>
      {/* @ts-expect-error Tamagui v2 RC */}
      {label && <TextareaLabel>{label}</TextareaLabel>}
      {/* @ts-expect-error Tamagui v2 RC */}
      <TextareaField
        value={value}
        defaultValue={defaultValue}
        // @ts-expect-error RN vs web event types
        onChange={(e: any) =>
          onChangeText?.(e?.nativeEvent?.text ?? e?.target?.value ?? '')
        }
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        size={size}
        aria-invalid={error || undefined}
        // @ts-expect-error Web textarea props
        rows={rows}
        maxLength={maxLength}
      />
      {displayHelper && (
        // @ts-expect-error Tamagui v2 RC
        <TextareaHelper color={error ? '$red10' : '$colorSubtitle'}>
          {displayHelper}
        </TextareaHelper>
      )}
    </TextareaFrame>
  )
}
