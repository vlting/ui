import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Badge ──────────────────────────────────────────────────────────────────

const themes = ['primary', 'secondary', 'neutral', 'success', 'warning', 'error', 'info'] as const

export const Badge = styled('span', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999',
    fontFamily: '$body',
    fontWeight: '$500',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    flexShrink: '0',
  },
  variants: {
    theme: Object.fromEntries(themes.map(t => [t, {}])) as Record<typeof themes[number], object>,
    variant: {
      solid: {},
      subtle: {},
      outline: {},
    },
    size: {
      sm: { px: '$6', py: '$2', fontSize: '11px' },
      md: { px: '$8', py: '$2', fontSize: '$small' },
      lg: { px: '$12', py: '$4', fontSize: '$small' },
    },
  },
  compoundVariants: [
    // solid
    ...themes.map(t => ({ when: { variant: 'solid' as const, theme: t }, stl: { bg: `$${t}9`, color: `$${t}Text9` } })),
    // subtle
    ...themes.map(t => ({ when: { variant: 'subtle' as const, theme: t }, stl: { bg: `$${t}3`, color: `$${t}Text3` } })),
    // outline
    ...themes.map(t => ({ when: { variant: 'outline' as const, theme: t }, stl: { bg: 'transparent', border: `$${t}`, borderWidth: '$widthMin', color: `$${t}Text3` } })),
  ],
  defaultVariants: { theme: 'neutral', variant: 'solid', size: 'md' },
  styleName: 'Badge',
})

export type BadgeProps = ComponentPropsWithRef<typeof Badge>
