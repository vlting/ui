import React, { createContext, useCallback, useContext, useId, useState } from 'react'
import { styled } from '../../stl-react/src/config'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue>({
  value: '',
  onValueChange: () => {},
  baseId: '',
})

const TabsRootFrame = styled("div", { display: "flex", flexDirection: "column" }, "Tabs")

const TabsListFrame = styled(
  "div",
  {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "var(--color3)",
    borderRadius: "8px",
    padding: "4px",
    gap: "0",
  },
  "TabsList"
)

const TabsTriggerFrame = styled(
  "button",
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontFamily: "var(--font-body)",
    fontWeight: "500",
    backgroundColor: "transparent",
    color: "var(--colorSubtitle)",
    outline: "none",
    transition: "background-color var(--stl-animation-fastDuration, 150ms) ease, color var(--stl-animation-fastDuration, 150ms) ease",
    hovered: {
      backgroundColor: "var(--color2)",
    },
    focused: {
      outline: "2px solid var(--stl-outline-primaryColorBase, currentColor)",
      outlineOffset: "2px",
    },
    pressed: {
      backgroundColor: "var(--color4)",
    },
  },
  {
    size: {
      sm: { paddingLeft: "8px", paddingRight: "8px", paddingTop: "4px", paddingBottom: "4px", fontSize: "var(--fontSize-2, 12px)" },
      md: { paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", fontSize: "var(--fontSize-3, 14px)" },
      lg: { paddingLeft: "16px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px", fontSize: "var(--fontSize-4, 16px)" },
    },
  },
  "TabsTrigger"
)

const TabsContentFrame = styled(
  "div",
  { paddingTop: "12px", paddingBottom: "12px" },
  "TabsContent"
)

export interface TabsRootProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

function Root({ children, value: controlledValue, defaultValue = '', onValueChange, ...props }: TabsRootProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const baseId = useId()

  const handleValueChange = useCallback((newValue: string) => {
    if (!isControlled) setInternalValue(newValue)
    onValueChange?.(newValue)
  }, [isControlled, onValueChange])

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange, baseId }}>
      <TabsRootFrame>{children}</TabsRootFrame>
    </TabsContext.Provider>
  )
}

export interface TabsListProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

function List({ children }: TabsListProps) {
  return (
    <TabsListFrame role="tablist">{children}</TabsListFrame>
  )
}

interface StyledTabsTriggerProps {
  children: React.ReactNode
  value: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function Trigger({ children, value: tabValue, disabled, size = 'md' }: StyledTabsTriggerProps) {
  const { value, onValueChange, baseId } = useContext(TabsContext)
  const isSelected = tabValue === value

  return (
    <TabsTriggerFrame
      role="tab"
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${tabValue}`}
      id={`${baseId}-tab-${tabValue}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(tabValue)}
      size={size}
      style={{
        backgroundColor: isSelected ? 'var(--background)' : undefined,
        color: isSelected ? 'var(--color10)' : undefined,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </TabsTriggerFrame>
  )
}

export interface TabsContentProps {
  children: React.ReactNode
  value: string
}

function Content({ children, value: tabValue }: TabsContentProps) {
  const { value, baseId } = useContext(TabsContext)
  if (tabValue !== value) return null

  return (
    <TabsContentFrame
      role="tabpanel"
      id={`${baseId}-panel-${tabValue}`}
      aria-labelledby={`${baseId}-tab-${tabValue}`}
      tabIndex={0}
    >
      {children}
    </TabsContentFrame>
  )
}

export const Tabs = { Root, List, Trigger, Content }
