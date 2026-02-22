import { Text, View, XStack, styled } from 'tamagui'
import { Tabs as HeadlessTabs } from '../../headless/Tabs'
import type {
  TabsContentProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps,
} from '../../headless/Tabs'

// @ts-expect-error Tamagui v2 RC
const StyledList = styled(XStack, {
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  gap: '$0',

  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  } as const,
})

// @ts-expect-error Tamagui v2 RC
const _StyledTrigger = styled(View, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  cursor: 'pointer',
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
  hoverStyle: { backgroundColor: '$backgroundHover' },

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    active: {
      true: {
        borderBottomColor: '$color10',
      },
    },
    size: {
      sm: { paddingHorizontal: '$2', paddingVertical: '$1' },
      md: { paddingHorizontal: '$3', paddingVertical: '$2' },
      lg: { paddingHorizontal: '$4', paddingVertical: '$3' },
    },
  } as const,
})

// @ts-expect-error Tamagui v2 RC
const _StyledTriggerText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',

  variants: {
    active: {
      true: { color: '$color10' },
      false: { color: '$colorSubtitle' },
    },
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,
})

// @ts-expect-error Tamagui v2 RC
const StyledContent = styled(View, {
  paddingVertical: '$3',
})

function Root(props: TabsRootProps) {
  return <HeadlessTabs.Root {...props} />
}

function List({ children, ...props }: TabsListProps & { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <HeadlessTabs.List {...props}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledList>{children}</StyledList>
    </HeadlessTabs.List>
  )
}

interface StyledTabsTriggerProps extends Omit<TabsTriggerProps, 'className'> {
  size?: 'sm' | 'md' | 'lg'
}

function Trigger({ children, value, disabled, size = 'md' }: StyledTabsTriggerProps) {
  return (
    <HeadlessTabs.Trigger value={value} disabled={disabled}>
      {/* Access data-state from parent to style */}
      {children}
    </HeadlessTabs.Trigger>
  )
}

function Content(props: TabsContentProps) {
  return (
    <HeadlessTabs.Content {...props}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledContent>{props.children}</StyledContent>
    </HeadlessTabs.Content>
  )
}

export const Tabs = { Root, List, Trigger, Content }
