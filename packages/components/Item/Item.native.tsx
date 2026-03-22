import type { ReactNode } from 'react'
import { View, Text as RNText, Pressable } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Sub-components ─────────────────────────────────────────────────────────

const ItemLeading = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  minHeight: 20,
}, 'ItemLeading')

const ItemContent = styled(View, {
  flexDirection: 'column',
  gap: 2,
  flex: 1,
}, 'ItemContent')

const ItemTitle = styled(RNText, {
  fontWeight: '600',
  fontSize: 16,
  color: '$defaultBody',
}, 'ItemTitle')

const ItemDescription = styled(RNText, {
  fontSize: 13,
  fontWeight: '300',
  color: '$neutralText4',
}, {
  theme: {
    primary: { color: '$primaryText4' },
    secondary: { color: '$secondaryText4' },
    neutral: { color: '$neutralText4' },
  },
}, 'ItemDescription')

const ItemTrailing = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  minHeight: 20,
}, 'ItemTrailing')

// ─── Item Root ──────────────────────────────────────────────────────────────

const ItemBase = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
}, {
  theme: {
    primary: {},
    secondary: {},
    neutral: {},
  },
  variant: {
    ghost: {},
    subtle: { backgroundColor: '$neutral2', borderRadius: 8 },
    outline: { borderWidth: 1, borderColor: '$neutral4', borderRadius: 8 },
  },
  size: {
    sm: { minHeight: 36, paddingVertical: 4, paddingHorizontal: 8 },
    md: { minHeight: 44, paddingVertical: 8, paddingHorizontal: 12 },
    lg: { minHeight: 52, paddingVertical: 12, paddingHorizontal: 16 },
  },
  align: {
    top: { alignItems: 'flex-start' },
    center: {},
  },
}, 'Item')

const ItemPressable = styled(Pressable, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  borderRadius: 8,
}, {
  theme: {
    primary: {},
    secondary: {},
    neutral: {},
  },
  variant: {
    ghost: {},
    subtle: { backgroundColor: '$neutral2' },
    outline: { borderWidth: 1, borderColor: '$neutral4' },
  },
  size: {
    sm: { minHeight: 36, paddingVertical: 4, paddingHorizontal: 8 },
    md: { minHeight: 44, paddingVertical: 8, paddingHorizontal: 12 },
    lg: { minHeight: 52, paddingVertical: 12, paddingHorizontal: 16 },
  },
  align: {
    top: { alignItems: 'flex-start' },
    center: {},
  },
}, 'ItemInteractive')

// ─── Export ─────────────────────────────────────────────────────────────────

export interface ItemProps {
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'neutral'
  variant?: 'ghost' | 'subtle' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  align?: 'top' | 'center'
  interactive?: boolean
  onPress?: () => void
  style?: ViewStyle
}

export interface ItemLeadingProps { children?: ReactNode; style?: ViewStyle }
export interface ItemContentProps { children?: ReactNode; style?: ViewStyle }
export interface ItemTitleProps { children?: ReactNode; style?: TextStyle }
export interface ItemDescriptionProps { children?: ReactNode; style?: TextStyle; theme?: 'primary' | 'secondary' | 'neutral' }
export interface ItemTrailingProps { children?: ReactNode; style?: ViewStyle }

export const Item = Object.assign(ItemBase, {
  Leading: ItemLeading,
  Content: ItemContent,
  Title: ItemTitle,
  Description: ItemDescription,
  Trailing: ItemTrailing,
  Pressable: ItemPressable,
})
