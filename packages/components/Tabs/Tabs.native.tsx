import type React from 'react'
import { createContext, useContext } from 'react'
import type { ViewStyle } from 'react-native'
import { Pressable, Text as RNText, ScrollView, View } from 'react-native'
import type { UseTabsProps } from '../../stl-headless/src/useTabs'
import { useTabs } from '../../stl-headless/src/useTabs'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const TabsListFrame = styled(
  View,
  {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '$borderColor',
  },
  'TabsList',
)

const TabsTriggerFrame = styled(
  Pressable,
  {
    paddingHorizontal: 16,
    paddingVertical: 10,
    pressed: { opacity: 0.85 },
  },
  {
    active: {
      true: {
        borderBottomWidth: 2,
        borderBottomColor: '$primary9',
      },
      false: {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
      },
    },
  },
  'TabsTrigger',
)

const TabsTriggerTextFrame = styled(
  RNText,
  {
    fontSize: 14,
    fontWeight: '500',
  },
  {
    active: {
      true: { color: '$primary9' },
      false: { color: '$color3' },
    },
  },
  'TabsTriggerText',
)

const TabsContentFrame = styled(
  View,
  {
    paddingVertical: 12,
  },
  'TabsContent',
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TabsContextValue {
  activeValue: string
  setActiveValue: (v: string) => void
}

const TabsContext = createContext<TabsContextValue>({
  activeValue: '',
  setActiveValue: () => {},
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TabsRoot({
  children,
  style,
  ...tabsProps
}: { children: React.ReactNode; style?: ViewStyle } & UseTabsProps) {
  const { activeValue, setActiveValue } = useTabs(tabsProps)
  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <View style={style}>{children}</View>
    </TabsContext.Provider>
  )
}

function TabsList({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TabsListFrame style={style} accessibilityRole="tablist" as any>
        {children}
      </TabsListFrame>
    </ScrollView>
  )
}

function TabsTrigger({
  children,
  value,
  style,
}: {
  children?: React.ReactNode
  value: string
  style?: ViewStyle
}) {
  const { activeValue, setActiveValue } = useContext(TabsContext)
  const isActive = activeValue === value
  return (
    <TabsTriggerFrame
      onPress={() => setActiveValue(value)}
      active={isActive}
      style={style}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      {typeof children === 'string' ? (
        <TabsTriggerTextFrame active={isActive}>{children}</TabsTriggerTextFrame>
      ) : (
        children
      )}
    </TabsTriggerFrame>
  )
}

function TabsContent({
  children,
  value,
  style,
}: {
  children?: React.ReactNode
  value: string
  style?: ViewStyle
}) {
  const { activeValue } = useContext(TabsContext)
  if (activeValue !== value) return null
  return (
    <TabsContentFrame style={style} accessibilityRole="tabpanel" as any>
      {children}
    </TabsContentFrame>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})
