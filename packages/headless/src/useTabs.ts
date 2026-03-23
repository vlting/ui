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
  getTabProps: (value: string, opts?: { disabled?: boolean }) => {
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
  const disabledRef = useRef<Set<string>>(new Set())
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
    (tabValue: string, opts?: { disabled?: boolean }) => {
      registerTab(tabValue)
      if (opts?.disabled) {
        disabledRef.current.add(tabValue)
      } else {
        disabledRef.current.delete(tabValue)
      }

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

          const step = e.key === nextKey ? 1 : e.key === prevKey ? -1 : 0

          if (step !== 0) {
            let candidate = idx
            for (let i = 0; i < tabs.length; i++) {
              candidate = (candidate + step + tabs.length) % tabs.length
              if (!disabledRef.current.has(tabs[candidate])) {
                nextIdx = candidate
                break
              }
            }
          } else if (e.key === 'Home') {
            for (let i = 0; i < tabs.length; i++) {
              if (!disabledRef.current.has(tabs[i])) { nextIdx = i; break }
            }
          } else if (e.key === 'End') {
            for (let i = tabs.length - 1; i >= 0; i--) {
              if (!disabledRef.current.has(tabs[i])) { nextIdx = i; break }
            }
          }

          if (nextIdx !== undefined) {
            e.preventDefault()
            setActiveValue(tabs[nextIdx])
            document.getElementById(`${baseId}-tab-${tabs[nextIdx]}`)?.focus()
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
    }),
    [activeValue, baseId],
  )

  return { activeValue, setActiveValue, getTabListProps, getTabProps, getTabPanelProps }
}
