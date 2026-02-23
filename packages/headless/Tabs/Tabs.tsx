/** @deprecated Use the styled Tabs component which now uses @tamagui/tabs internally */
import React, { createContext, useCallback, useContext, useState } from 'react'
import { useControllableState } from '../../hooks/useControllableState'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TabsContextValue {
  value: string | undefined
  onValueChange: (value: string) => void
  orientation: 'horizontal' | 'vertical'
  tabIds: string[]
  registerTab: (id: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within Tabs.Root')
  return ctx
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface TabsRootProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

function Root({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
}: TabsRootProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })
  const [tabIds, setTabIds] = useState<string[]>([])

  const registerTab = useCallback((id: string) => {
    setTabIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  return (
    <TabsContext.Provider
      value={{ value, onValueChange: setValue, orientation, tabIds, registerTab }}
    >
      <div data-orientation={orientation}>{children}</div>
    </TabsContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------

export interface TabsListProps {
  children: React.ReactNode
  className?: string
}

function List({ children, ...props }: TabsListProps) {
  const { orientation, tabIds, value, onValueChange } = useTabsContext()
  const [activeIdx, setActiveIdx] = useState(0)

  const handleKeyDown = useKeyboardNavigation(
    tabIds.length,
    activeIdx,
    (idx) => {
      setActiveIdx(idx)
      onValueChange(tabIds[idx])
    },
    {
      orientation,
      loop: true,
      onSelect: (idx) => onValueChange(tabIds[idx]),
    },
  )

  // Sync activeIdx when value changes externally
  React.useEffect(() => {
    const idx = tabIds.indexOf(value ?? '')
    if (idx >= 0) setActiveIdx(idx)
  }, [value, tabIds])

  return (
    <div
      {...props}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

export interface TabsTriggerProps {
  children: React.ReactNode
  value: string
  disabled?: boolean
  className?: string
}

function TabTrigger({ children, value: tabValue, disabled, ...props }: TabsTriggerProps) {
  const { value, onValueChange, registerTab } = useTabsContext()
  const isSelected = value === tabValue

  React.useEffect(() => {
    registerTab(tabValue)
  }, [tabValue, registerTab])

  return (
    <button
      {...props}
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
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export interface TabsContentProps {
  children: React.ReactNode
  value: string
  className?: string
}

function TabContent({ children, value: tabValue, ...props }: TabsContentProps) {
  const { value } = useTabsContext()
  if (value !== tabValue) return null

  return (
    <div
      {...props}
      role="tabpanel"
      id={`tabpanel-${tabValue}`}
      aria-labelledby={`tab-${tabValue}`}
      data-state="active"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export { useTabsContext }

export const Tabs = {
  Root,
  List,
  Trigger: TabTrigger,
  Content: TabContent,
}
