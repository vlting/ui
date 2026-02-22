import type React from 'react'
import { Text, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const StyledLabel = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  fontWeight: '$3',
  color: '$color',
  cursor: 'default',
  userSelect: 'none',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
    required: {
      true: {},
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export interface LabelProps {
  children: React.ReactNode
  htmlFor?: string
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
}

export function Label({
  children,
  htmlFor,
  size = 'md',
  required,
  ...props
}: LabelProps) {
  return (
    // @ts-expect-error Tamagui v2 RC
    <StyledLabel
      tag="label"
      {...(htmlFor ? { htmlFor } : {})}
      size={size}
      required={required}
      {...props}
    >
      {children}
      {required && <Text color="$red10"> *</Text>}
    </StyledLabel>
  )
}
