import React, { memo } from 'react'
import { Text, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Sub-component frames ─────────────────────────────────────────────────────

const CardHeader = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$4',
  paddingBottom: '$2',
  gap: '$1',
})

const CardContent = styled(YStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  flex: 1,
})

const CardTitle = styled(Text, {
  fontSize: '$5',
  fontWeight: '600',
  color: '$color',
})

const CardDescription = styled(Text, {
  fontSize: '$3',
  color: '$color11',
})

const CardFooter = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$2',
  paddingBottom: '$4',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
})

// ─── Main frame ───────────────────────────────────────────────────────────────

const CardFrame = styled(YStack, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  overflow: 'hidden',

  variants: {
    interactive: {
      true: {
        cursor: 'pointer',
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
        focusStyle: {
          outlineColor: '$outlineColor',
          outlineWidth: 2,
          outlineStyle: 'solid',
        },
        pressStyle: {
          backgroundColor: '$backgroundPress',
        },
      },
    },
    bordered: {
      true: {
        borderWidth: 1,
        borderColor: '$borderColor',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
    loading: {
      true: {
        opacity: 0.7,
      },
    },
  } as const,
})

// ─── Props ────────────────────────────────────────────────────────────────────

export type CardProps = {
  /** Makes the card pressable/interactive */
  interactive?: boolean
  /** Shows a visible border */
  bordered?: boolean
  /** Disables the card */
  disabled?: boolean
  /** Shows loading/skeleton state */
  loading?: boolean
  /** Accessible label for interactive cards */
  accessibilityLabel?: string
  /** Callback for interactive cards */
  onPress?: () => void
  children?: React.ReactNode
  testID?: string
  [key: string]: unknown
}

// ─── Root Component ───────────────────────────────────────────────────────────

const CardRoot = memo(function Card({
  interactive = false,
  bordered = false,
  disabled = false,
  loading = false,
  accessibilityLabel,
  onPress,
  children,
  testID,
  ...rest
}: CardProps) {
  const role = interactive ? 'button' : 'article'
  const tabIndex = interactive && !disabled ? 0 : undefined

  return (
    <CardFrame
      interactive={interactive}
      bordered={bordered}
      disabled={disabled}
      loading={loading}
      role={role}
      aria-label={accessibilityLabel}
      aria-disabled={disabled || undefined}
      tabIndex={tabIndex}
      onPress={interactive && !disabled ? onPress : undefined}
      testID={testID}
      {...(rest as object)}
    >
      {children}
    </CardFrame>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const Card = withStaticProperties(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})
