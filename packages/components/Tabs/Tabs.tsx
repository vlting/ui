import React from 'react'
import { Text, View, XStack, styled } from 'tamagui'
import { Tabs as HeadlessTabs, useTabsContext } from '../../headless/Tabs'
import type {
  TabsContentProps,
  TabsListProps,
  TabsRootProps,
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
const StyledTriggerFrame = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  cursor: 'pointer',
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  borderWidth: 0,
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  hoverStyle: { backgroundColor: '$backgroundHover' },

  focusWithinStyle: {
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

interface StyledTabsTriggerProps {
  children: React.ReactNode
  value: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function Trigger({ children, value: tabValue, disabled, size = 'md' }: StyledTabsTriggerProps) {
  const { value, onValueChange, registerTab } = useTabsContext()
  const isSelected = value === tabValue

  React.useEffect(() => {
    registerTab(tabValue)
  }, [tabValue, registerTab])

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tabpanel-${tabValue}`}
      id={`tab-${tabValue}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      data-state={isSelected ? 'active' : 'inactive'}
      onClick={() => {
        if (!disabled) onValueChange(tabValue)
      }}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'inline-flex',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledTriggerFrame
        active={isSelected}
        size={size}
        disabled={disabled}
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <_StyledTriggerText active={isSelected} size={size}>
          {children}
        </_StyledTriggerText>
      </StyledTriggerFrame>
    </button>
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
