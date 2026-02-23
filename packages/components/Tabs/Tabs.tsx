import React from 'react'
import type { ComponentType } from 'react'
import { Text, View, styled } from 'tamagui'
import { Tabs as TamaguiTabs, useTabsContext } from '@tamagui/tabs'

// Cast for JSX usage — Tamagui v2 RC GetFinalProps bug
const TamaguiTabsJsx = TamaguiTabs as ComponentType<Record<string, unknown>>
const TamaguiTabsListJsx = TamaguiTabs.List as ComponentType<Record<string, unknown>>
const TamaguiTabsTabJsx = TamaguiTabs.Tab as ComponentType<Record<string, unknown>>
const TamaguiTabsContentJsx = TamaguiTabs.Content as ComponentType<Record<string, unknown>>

// Map named sizes to padding values
const SIZE_PADDING_MAP: Record<string, { h: string; v: string }> = {
  sm: { h: '$2', v: '$1' },
  md: { h: '$3', v: '$2' },
  lg: { h: '$4', v: '$3' },
}

// @ts-expect-error Tamagui v2 RC
const StyledTriggerText = styled(Text, {
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

export interface TabsRootProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

function Root({ children, ...props }: TabsRootProps) {
  return (
    <TamaguiTabsJsx {...props} activationMode="manual">
      {children}
    </TamaguiTabsJsx>
  )
}

export interface TabsListProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

function List({ children }: TabsListProps) {
  return (
    <TamaguiTabsListJsx
      unstyled
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      gap="$0"
    >
      {children}
    </TamaguiTabsListJsx>
  )
}

interface StyledTabsTriggerProps {
  children: React.ReactNode
  value: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function Trigger({ children, value: tabValue, disabled, size = 'md' }: StyledTabsTriggerProps) {
  const context = useTabsContext()
  const isSelected = tabValue === context.value
  const padding = SIZE_PADDING_MAP[size]

  return (
    <TamaguiTabsTabJsx
      value={tabValue}
      disabled={disabled}
      unstyled
      paddingHorizontal={padding.h}
      paddingVertical={padding.v}
      borderBottomWidth={2}
      borderBottomColor="transparent"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      alignItems="center"
      justifyContent="center"
      backgroundColor="transparent"
      hoverStyle={{ backgroundColor: '$backgroundHover' }}
      focusVisibleStyle={{
        outlineWidth: 2,
        outlineOffset: -2,
        outlineColor: '$outlineColor',
        outlineStyle: 'solid',
      }}
      activeStyle={{
        borderBottomColor: '$color10',
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledTriggerText active={isSelected} size={size}>
        {children}
      </StyledTriggerText>
    </TamaguiTabsTabJsx>
  )
}

export interface TabsContentProps {
  children: React.ReactNode
  value: string
}

function Content({ children, value }: TabsContentProps) {
  return (
    <TamaguiTabsContentJsx value={value}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledContent>{children}</StyledContent>
    </TamaguiTabsContentJsx>
  )
}

export const Tabs = { Root, List, Trigger, Content }
