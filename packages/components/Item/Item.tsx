import type { ComponentPropsWithRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Sub-components ─────────────────────────────────────────────────────────

const ItemLeading = styled('div', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
  },
  styleName: 'ItemLeading',
})

const ItemContent = styled('div', {
  stl: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    flex: '1',
    minWidth: '0',
  },
  styleName: 'ItemContent',
})

const ItemTitle = styled('span', {
  stl: {
    fontWeight: '$500',
    fontSize: '$p',
    color: '$neutralText3',
  },
  styleName: 'ItemTitle',
})

const ItemDescription = styled('span', {
  stl: {
    fontSize: '$small',
    color: '$neutralText4',
  },
  styleName: 'ItemDescription',
})

const ItemTrailing = styled('div', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
  },
  styleName: 'ItemTrailing',
})

// ─── Item ───────────────────────────────────────────────────────────────────

const ItemRoot = styled('div', {
  stl: {
    display: 'flex',
    alignItems: 'center',
    gap: '$12',
    fontFamily: '$body',
  },
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
  styleName: 'Item',
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
