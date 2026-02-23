import type React from 'react'
import { Text, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const StyledLabelText = styled(Text, {
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
}: LabelProps) {
  return (
    <label htmlFor={htmlFor}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledLabelText size={size}>
        {children}
        {required && <Text color="$red10"> *</Text>}
      </StyledLabelText>
    </label>
  )
}
