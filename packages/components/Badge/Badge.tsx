import type { ComponentPropsWithRef } from 'react'
import { styled, type STL } from '../../stl-react/src/config'

// ─── Badge ──────────────────────────────────────────────────────────────────

const themes = [
  // Core
  'primary', 'secondary', 'neutral',
  // Status
  'success', 'warning', 'error', 'info',
  // Flavor
  'tomato', 'amber', 'grass', 'forest', 'aqua', 'indigo', 'plum', 'magenta',
] as const

const variantStyles = {
  solid: (t: string) => ({ bg: `$${t}9`, color: `$${t}Text9` }) as STL,
  subtle: (t: string) => ({ bg: `$${t}3`, color: `$${t}Text3` }) as STL,
  outline: (t: string) => ({ bg: 'transparent', border: `$${t}9`, borderWidth: '$widthMin', color: `$${t}Text3` }) as STL,
}

export const Badge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  radius: '$badge',
  fontFamily: '$body',
  fontWeight: '$500',
  lineHeight: '$flat',
  whiteSpace: 'nowrap',
  flexShrink: '0',
}, {
  name: 'Badge',
  variants: {
    theme: Object.fromEntries(themes.map(t => [t, {}])) as Record<typeof themes[number], object>,
    variant: {
      solid: {},
      subtle: {},
      outline: {},
    },
    size: {
      sm: { px: '$8', py: '$4', fontSize: '$buttonTiny' },
      md: { px: '$12', py: '$4', fontSize: '$buttonSmall' },
      lg: { px: '$16', py: '$6', fontSize: '$button' },
    },
  },
  compoundVariants: Object.entries(variantStyles).flatMap(([v, fn]) =>
    themes.map(t => ({ when: { variant: v as 'solid' | 'subtle' | 'outline', theme: t }, stl: fn(t) }))
  ),
  defaultVariants: { theme: 'neutral', variant: 'subtle', size: 'md' },
})

export type BadgeProps = ComponentPropsWithRef<typeof Badge>
