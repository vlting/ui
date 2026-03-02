import type { GetProps } from 'tamagui'
import { Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

const ItemRoot = styled(XStack, {
  paddingVertical: '$2',
  paddingHorizontal: '$3',
  alignItems: 'center',
  gap: '$2.5',
  width: '100%',
  minHeight: 44,

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { paddingVertical: '$1.5', paddingHorizontal: '$2', gap: '$2', minHeight: 36 },
      // @ts-expect-error Tamagui v2 RC
      md: { paddingVertical: '$2', paddingHorizontal: '$3', gap: '$2.5', minHeight: 44 },
      // @ts-expect-error Tamagui v2 RC
      lg: { paddingVertical: '$3', paddingHorizontal: '$4', gap: '$3', minHeight: 52 },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        borderRadius: '$3',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: { backgroundColor: '$color3' },
        // @ts-expect-error Tamagui v2 RC
        pressStyle: { backgroundColor: '$color4' },
        // @ts-expect-error Tamagui v2 RC
        focusVisibleStyle: {
          outlineWidth: 2,
          outlineOffset: 2,
          outlineColor: '$outlineColor',
          outlineStyle: 'solid',
        },
      },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const ItemLeading = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
})

// @ts-expect-error Tamagui v2 RC
const ItemContent = styled(YStack, {
  flex: 1,
  gap: '$1',
})

const ItemTitle = styled(Text, {
  fontFamily: '$body',
  fontWeight: '500',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { fontSize: '$3' },
      // @ts-expect-error Tamagui v2 RC
      md: { fontSize: '$4' },
      // @ts-expect-error Tamagui v2 RC
      lg: { fontSize: '$5' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

const ItemDescription = styled(Text, {
  fontFamily: '$body',
  color: '$colorSubtitle',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { fontSize: '$2' },
      // @ts-expect-error Tamagui v2 RC
      md: { fontSize: '$3' },
      // @ts-expect-error Tamagui v2 RC
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const ItemTrailing = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
})

export const Item = withStaticProperties(ItemRoot, {
  Leading: ItemLeading,
  Content: ItemContent,
  Title: ItemTitle,
  Description: ItemDescription,
  Trailing: ItemTrailing,
})

export type ItemProps = GetProps<typeof ItemRoot>
export type ItemLeadingProps = GetProps<typeof ItemLeading>
export type ItemContentProps = GetProps<typeof ItemContent>
export type ItemTitleProps = GetProps<typeof ItemTitle>
export type ItemDescriptionProps = GetProps<typeof ItemDescription>
export type ItemTrailingProps = GetProps<typeof ItemTrailing>
