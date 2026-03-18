import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

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
  color: '$neutralText3',
}, { name: 'ItemTitle' })

const ItemDescription = styled('span', {
  fontSize: '$small',
  color: '$neutralText4',
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
    size: {
      sm: { minHeight: '36px', py: '$4', px: '$8' },
      md: { minHeight: '44px', py: '$8', px: '$12' },
      lg: { minHeight: '52px', py: '$12', px: '$16' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        borderRadius: '$field',
        ':interact': { bg: '$color3' },
        ':pressed': { bg: '$color4' },
        ':focus': {
          outlineWidth: '$widthBase',
          outlineStyle: 'solid',
          outlineColor: '$outlineColor',
          outlineOffset: '$offsetDefault',
        },
        lowMotion: {
          ':pressed': { transition: 'none' },
        },
      },
    },
  },
  defaultVariants: { size: 'md' },
  mapProps: (p) => ({
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
