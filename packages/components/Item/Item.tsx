import type { ComponentPropsWithRef } from 'react'
import { styled, type STL } from '../../stl-react/src/config'

// ─── Theme × Variant ────────────────────────────────────────────────────────

const themes = ['primary', 'secondary', 'neutral'] as const

const variantStyles = {
  ghost: (t: string) => ({ color: `$${t}Text3` }) as STL,
  subtle: (t: string) => ({ bg: `$${t}Alpha2`, radius: '$card', color: `$${t}Text3` }) as STL,
  outline: (t: string) => ({ bg: `$surface1`, border: `$${t}5`, borderWidth: '$widthMin', radius: '$card', color: `$${t}Text1` }) as STL,
}

const interactiveStyles = (t: string, step = 3) => ({
  ':interact': { bg: `$${t}${step}` },
  ':pressed': { bg: `$${t}${step + 1}` },
  ':focus': { outline: `$${t}` },
}) as STL

// ─── Sub-components ─────────────────────────────────────────────────────────

const ItemLeading = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0',
  minHeight: '$20',
}, { name: 'ItemLeading' })

const ItemContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  flex: '1',
  minWidth: '$0',
}, { name: 'ItemContent' })

const ItemTitle = styled('span', {
  fontWeight: '$600',
  fontSize: '$p',
  lineHeight: '$listItem',
  color: 'inherit',
}, { name: 'ItemTitle' })

const ItemDescription = styled('span', {
  fontSize: '$13',
  fontWeight: '$300',
  color: '$neutralText4',
}, {
  name: 'ItemDescription',
  variants: {
    theme: {
      primary: { color: '$primaryText4' },
      secondary: { color: '$secondaryText4' },
      neutral: { color: '$neutralText4' },
    },
  },
  defaultVariants: { theme: 'neutral' },
})

const ItemTrailing = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0',
  minHeight: '$20',
}, { name: 'ItemTrailing' })

// ─── Item ───────────────────────────────────────────────────────────────────

const ItemRoot = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$12',
  fontFamily: '$body',
}, {
  name: 'Item',
  variants: {
    theme: {
      primary: {},
      secondary: {},
      neutral: {},
    },
    variant: {
      ghost: {},
      subtle: {},
      outline: {},
    },
    size: {
      sm: { minHeight: '$36', py: '$4', px: '$8' },
      md: { minHeight: '$44', py: '$8', px: '$12' },
      lg: { minHeight: '$52', py: '$12', px: '$16' },
    },
    align: {
      top: { alignItems: 'start' },
      center: {},
    },
    interactive: {
      true: {
        cursor: 'pointer',
        radius: '$card',
        ':focus': { outlineOffset: '$offsetDefault' },
        lowMotion: {
          ':pressed': { transition: 'none' },
        },
      },
    },
  },
  compoundVariants: [
    // ── theme × variant ─────────────────────────────────────
    ...Object.entries(variantStyles).flatMap(([v, fn]) =>
      themes.map(t => ({ when: { variant: v as 'ghost' | 'subtle' | 'outline', theme: t }, stl: fn(t) }))
    ),
    // ── theme × variant × interactive ─────────────────────────
    ...themes.flatMap(t => [
      { when: { theme: t, variant: 'ghost' as const, interactive: 'true' as const }, stl: interactiveStyles(t, 3) },
      { when: { theme: t, variant: 'outline' as const, interactive: 'true' as const }, stl: interactiveStyles(t, 3) },
      { when: { theme: t, variant: 'subtle' as const, interactive: 'true' as const }, stl: interactiveStyles(t, 3) },
    ]),
  ],
  defaultVariants: { theme: 'neutral', variant: 'outline', size: 'md', align: 'center' },
  mapProps: (p: any) => ({
    ...p,
    tabIndex: p.interactive ? (p.tabIndex ?? 0) : p.tabIndex,
  }),
})

// ─── Export ─────────────────────────────────────────────────────────────────

export const Item = Object.assign(ItemRoot, {
  Leading: ItemLeading,
  Content: ItemContent,
  Title: ItemTitle,
  Description: ItemDescription,
  Trailing: ItemTrailing,
})

export type ItemProps = ComponentPropsWithRef<typeof ItemRoot>
export type ItemLeadingProps = ComponentPropsWithRef<typeof ItemLeading>
export type ItemContentProps = ComponentPropsWithRef<typeof ItemContent>
export type ItemTitleProps = ComponentPropsWithRef<typeof ItemTitle>
export type ItemDescriptionProps = ComponentPropsWithRef<typeof ItemDescription>
export type ItemTrailingProps = ComponentPropsWithRef<typeof ItemTrailing>
