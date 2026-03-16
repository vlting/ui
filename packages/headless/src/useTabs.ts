import { useCallback, useId, useRef, useState } from 'react'

export interface UseTabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

export interface UseTabsReturn {
  activeValue: string
  setActiveValue: (v: string) => void
  getTabListProps: () => { role: 'tablist'; 'aria-orientation': string }
  getTabProps: (value: string) => {
    role: 'tab'
    id: string
    'aria-selected': boolean
    'aria-controls': string
    tabIndex: number
    onPress: () => void
    onKeyDown: (e: React.KeyboardEvent) => void
  }
  getTabPanelProps: (value: string) => {
    role: 'tabpanel'
    id: string
    'aria-labelledby': string
    hidden: boolean
    tabIndex: 0
  }
}

export function useTabs({
  defaultValue = '',
  value,
  onValueChange,
  orientation = 'horizontal',
}: UseTabsProps = {}): UseTabsReturn {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : internal
  const tabValuesRef = useRef<string[]>([])
  const baseId = useId()

  const setActiveValue = useCallback(
    (v: string) => {
      if (!isControlled) setInternal(v)
      onValueChange?.(v)
    },
    [isControlled, onValueChange],
  )

  const registerTab = useCallback((val: string) => {
    if (!tabValuesRef.current.includes(val)) {
      tabValuesRef.current.push(val)
    }
  }, [])

  const getTabListProps = useCallback(
    () => ({
      role: 'tablist' as const,
      'aria-orientation': orientation,
    }),
    [orientation],
  )

  const getTabProps = useCallback(
    (tabValue: string) => {
      registerTab(tabValue)

      return {
        role: 'tab' as const,
        id: `${baseId}-tab-${tabValue}`,
        'aria-selected': activeValue === tabValue,
        'aria-controls': `${baseId}-panel-${tabValue}`,
        tabIndex: activeValue === tabValue ? 0 : -1,
        onPress: () => setActiveValue(tabValue),
        onKeyDown: (e: React.KeyboardEvent) => {
          const tabs = tabValuesRef.current
          const idx = tabs.indexOf(tabValue)
          if (idx === -1) return

          const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
          const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
          let nextIdx: number | undefined

          if (e.key === nextKey) {
            nextIdx = idx < tabs.length - 1 ? idx + 1 : 0
          } else if (e.key === prevKey) {
            nextIdx = idx > 0 ? idx - 1 : tabs.length - 1
          } else if (e.key === 'Home') {
            nextIdx = 0
          } else if (e.key === 'End') {
            nextIdx = tabs.length - 1
          }

          if (nextIdx !== undefined) {
            e.preventDefault()
            setActiveValue(tabs[nextIdx])
          }
        },
      }
    },
    [activeValue, setActiveValue, orientation, registerTab, baseId],
  )

  const getTabPanelProps = useCallback(
    (tabValue: string) => ({
      role: 'tabpanel' as const,
      id: `${baseId}-panel-${tabValue}`,
      'aria-labelledby': `${baseId}-tab-${tabValue}`,
      hidden: activeValue !== tabValue,
      tabIndex: 0 as const,
    }),
    [activeValue, baseId],
  )

  return { activeValue, setActiveValue, getTabListProps, getTabProps, getTabPanelProps }
}
