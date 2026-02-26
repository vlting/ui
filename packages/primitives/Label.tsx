import { Label as TamaguiLabel } from '@tamagui/label'
import type React from 'react'
import type { ComponentType } from 'react'
import { Text } from 'tamagui'

// Map named sizes to Tamagui size tokens
const SIZE_TOKEN_MAP: Record<string, string> = {
  sm: '$2',
  md: '$3',
  lg: '$4',
}

// Cast for JSX — Tamagui v2 RC GetFinalProps bug
const TamaguiLabelJsx = TamaguiLabel as ComponentType<Record<string, unknown>>
const TextJsx = Text as ComponentType<Record<string, unknown>>

export interface LabelProps {
  children: React.ReactNode
  htmlFor?: string
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
}

export function Label({ children, htmlFor, size = 'md', required }: LabelProps) {
  const sizeToken = SIZE_TOKEN_MAP[size]

  return (
    <TamaguiLabelJsx htmlFor={htmlFor} size={sizeToken}>
      {children}
      {required && <TextJsx color="$red10"> *</TextJsx>}
    </TamaguiLabelJsx>
  )
}
