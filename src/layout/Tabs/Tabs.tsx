import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from 'react'
import { Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Context ──────────────────────────────────────────────────────────────────

type TabsContextValue = {
  value: string
  onValueChange: (v: string) => void
  orientation: 'horizontal' | 'vertical'
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs sub-components must be used within Tabs')
  return ctx
}

// ─── Tab List ─────────────────────────────────────────────────────────────────

const TabListFrame = styled(XStack, {
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  gap: '$0',
})

const TabListVerticalFrame = styled(YStack, {
  borderRightWidth: 1,
  borderRightColor: '$borderColor',
  gap: '$0',
})

function TabList({
  children,
  accessibilityLabel,
  testID,
}: {
  children?: React.ReactNode
  accessibilityLabel?: string
  testID?: string
}) {
  const { orientation, value, onValueChange, baseId } = useTabsContext()
  const tabRefs = useRef<HTMLElement[]>([])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const tabs = tabRefs.current.filter(Boolean)
      const focused = document.activeElement
      const idx = tabs.indexOf(focused as HTMLElement)
      if (idx < 0) return

      let next = idx
      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft') next = idx > 0 ? idx - 1 : tabs.length - 1
        else if (e.key === 'ArrowRight') next = idx < tabs.length - 1 ? idx + 1 : 0
      } else {
        if (e.key === 'ArrowUp') next = idx > 0 ? idx - 1 : tabs.length - 1
        else if (e.key === 'ArrowDown') next = idx < tabs.length - 1 ? idx + 1 : 0
      }
      if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = tabs.length - 1

      if (next !== idx) {
        e.preventDefault()
        tabs[next]?.focus()
        // Get value from tab element
        const tabValue = tabs[next]?.getAttribute('data-tab-value')
        if (tabValue) onValueChange(tabValue)
      }
    },
    [orientation, onValueChange],
  )

  const Frame = orientation === 'horizontal' ? TabListFrame : TabListVerticalFrame

  return (
    <Frame
      accessible
      accessibilityRole="tablist"
      aria-label={accessibilityLabel}
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      testID={testID}
    >
      {children}
    </Frame>
  )
}

// ─── Tab trigger ──────────────────────────────────────────────────────────────

const TabTriggerFrame = styled(XStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },

  variants: {
    active: {
      true: {
        borderBottomColor: '$color',
      },
    },
  } as const,
})

function Tab({
  value: tabValue,
  children,
  disabled = false,
  testID,
}: {
  value: string
  children?: React.ReactNode
  disabled?: boolean
  testID?: string
}) {
  const { value, onValueChange, baseId } = useTabsContext()
  const isActive = value === tabValue
  const tabId = `${baseId}-tab-${tabValue}`
  const panelId = `${baseId}-panel-${tabValue}`

  return (
    <TabTriggerFrame
      active={isActive}
      accessible
      role="tab"
      id={tabId}
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      data-tab-value={tabValue}
      onPress={() => !disabled && onValueChange(tabValue)}
      testID={testID}
    >
      <Text
        fontSize="$3"
        fontWeight={isActive ? '600' : '400'}
        color={isActive ? '$color' : '$colorSubtitle'}
      >
        {children}
      </Text>
    </TabTriggerFrame>
  )
}

// ─── Tab panel ────────────────────────────────────────────────────────────────

function TabPanel({
  value: panelValue,
  children,
  testID,
}: {
  value: string
  children?: React.ReactNode
  testID?: string
}) {
  const { value, baseId } = useTabsContext()
  const isActive = value === panelValue
  const tabId = `${baseId}-tab-${panelValue}`
  const panelId = `${baseId}-panel-${panelValue}`

  if (!isActive) return null

  return (
    <YStack
      accessible
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      testID={testID}
    >
      {children}
    </YStack>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export type TabsProps = {
  /** Controlled active tab value */
  value?: string
  /** Default value for uncontrolled mode */
  defaultValue?: string
  /** Callback when tab value changes */
  onValueChange?: (v: string) => void
  /** Orientation of the tab list */
  orientation?: 'horizontal' | 'vertical'
  children?: React.ReactNode
  testID?: string
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const TabsRoot = memo(function TabsRoot({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  orientation = 'horizontal',
  children,
  testID,
}: TabsProps) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const activeValue = isControlled ? (valueProp ?? '') : internalValue
  const baseId = useId()

  const handleChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v)
      onValueChange?.(v)
    },
    [isControlled, onValueChange],
  )

  return (
    <TabsContext.Provider
      value={{ value: activeValue, onValueChange: handleChange, orientation, baseId }}
    >
      <YStack testID={testID} flex={1}>
        {children}
      </YStack>
    </TabsContext.Provider>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const Tabs = withStaticProperties(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panel: TabPanel,
})
