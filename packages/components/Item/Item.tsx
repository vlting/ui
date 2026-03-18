import type { ComponentPropsWithRef } from 'react'
import { styled, type STL } from '../../stl-react/src/config'

// ─── Theme × Variant ────────────────────────────────────────────────────────

const themes = ['primary', 'secondary', 'neutral'] as const

const variantStyles = {
  default: (t: string) => ({ color: `$${t}Text3` }) as STL,
  subtle: (t: string) => ({ bg: `$${t}3`, radius: '$field', color: `$${t}Text3` }) as STL,
  outline: (t: string) => ({ bg: 'transparent', border: `$${t}5`, borderWidth: '$widthMin', radius: '$field', color: `$${t}Text3` }) as STL,
}

const interactiveStyles = (t: string) => ({
  ':interact': { bg: `$${t}3` },
  ':pressed': { bg: `$${t}4` },
  ':focus': {
    outlineWidth: '$widthBase',
    outlineStyle: 'solid',
    outlineColor: `$${t}9`,
    outlineOffset: '$offsetDefault',
  },
}) as STL

// ─── Sub-components ─────────────────────────────────────────────────────────

const ItemLeading = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0',
}, { name: 'ItemLeading' })

const ItemContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  flex: '1',
  minWidth: '0',
}, { name: 'ItemContent' })

const ItemTitle = styled('span', {
  fontWeight: '$500',
  fontSize: '$p',
  color: 'inherit',
}, { name: 'ItemTitle' })

const ItemDescription = styled('span', {
  fontSize: '$small',
  opacity: '0.65',
  color: 'inherit',
}, { name: 'ItemDescription' })

const ItemTrailing = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0',
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
      default: {},
      subtle: {},
      outline: {},
    },
    size: {
      sm: { minHeight: '36px', py: '$4', px: '$8' },
      md: { minHeight: '44px', py: '$8', px: '$12' },
      lg: { minHeight: '52px', py: '$12', px: '$16' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        radius: '$field',
        lowMotion: {
          ':pressed': { transition: 'none' },
        },
      },
    },
  },
  compoundVariants: [
    // ── theme × variant ─────────────────────────────────────
    ...Object.entries(variantStyles).flatMap(([v, fn]) =>
      themes.map(t => ({ when: { variant: v as 'default' | 'subtle' | 'outline', theme: t }, stl: fn(t) }))
    ),
    // ── theme × interactive ─────────────────────────────────
    ...themes.map(t => ({ when: { theme: t, interactive: 'true' as const }, stl: interactiveStyles(t) })),
  ],
  defaultVariants: { theme: 'neutral', variant: 'default', size: 'md' },
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
