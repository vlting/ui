import { useCallback, useId, useRef, useState } from 'react'
import { useControllableState } from './useControllableState'
import { useRovingTabIndex } from './useRovingTabIndex'

export type UseAccordionProps = {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
} & (
  | { type: 'single'; collapsible?: boolean }
  | { type: 'multiple' }
)

export interface UseAccordionReturn {
  value: string[]
  isExpanded: (itemValue: string) => boolean
  toggleItem: (itemValue: string) => void
  registerItem: (itemValue: string) => number
  unregisterItem: (itemValue: string) => void
  getRootProps: () => {
    ref: React.RefObject<HTMLElement | null>
    onKeyDown: (e: React.KeyboardEvent) => void
  }
  getTriggerProps: (itemValue: string, index: number) => {
    'aria-expanded': boolean
    'aria-controls': string
    id: string
    tabIndex: 0 | -1
    onFocus: () => void
    'data-roving-item': ''
    onClick: () => void
    disabled?: boolean
  }
  getContentProps: (itemValue: string) => {
    id: string
    role: 'region'
    'aria-labelledby': string
    hidden: boolean
  }
}

export function useAccordion(props: UseAccordionProps): UseAccordionReturn {
  const { value: valueProp, defaultValue = [], onValueChange, disabled = false } = props
  const baseId = useId()

  const [value = [], setValue] = useControllableState<string[]>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  // Item registration — use ref for count to avoid setState-during-render
  const itemsRef = useRef<string[]>([])
  const itemCountRef = useRef(0)

  const registerItem = useCallback((itemValue: string): number => {
    const idx = itemsRef.current.indexOf(itemValue)
    if (idx !== -1) return idx
    const newIdx = itemsRef.current.length
    itemsRef.current.push(itemValue)
    itemCountRef.current = itemsRef.current.length
    return newIdx
  }, [])

  const unregisterItem = useCallback((itemValue: string): void => {
    const idx = itemsRef.current.indexOf(itemValue)
    if (idx !== -1) {
      itemsRef.current.splice(idx, 1)
      itemCountRef.current = itemsRef.current.length
    }
  }, [])

  // Toggle logic
  const toggleItem = useCallback(
    (itemValue: string) => {
      if (disabled) return

      setValue((prev = []) => {
        const isOpen = prev.includes(itemValue)

        if (props.type === 'multiple') {
          return isOpen
            ? prev.filter((v) => v !== itemValue)
            : [...prev, itemValue]
        }

        // Single mode
        if (isOpen) {
          const collapsible = 'collapsible' in props ? (props.collapsible ?? true) : true
          return collapsible ? [] : prev
        }
        return [itemValue]
      })
    },
    [disabled, props, setValue],
  )

  const isExpanded = useCallback(
    (itemValue: string) => value.includes(itemValue),
    [value],
  )

  // Roving tabindex
  const [activeIndex, setActiveIndex] = useState(0)
  const { getContainerProps, getItemProps } = useRovingTabIndex({
    count: itemCountRef.current || 1,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
    orientation: 'vertical',
    loop: true,
  })

  // Prop-getters
  const getRootProps = useCallback(() => {
    const containerProps = getContainerProps()
    return {
      ref: containerProps.ref,
      onKeyDown: containerProps.onKeyDown,
    }
  }, [getContainerProps])

  const getTriggerProps = useCallback(
    (itemValue: string, index: number) => {
      const rovingProps = getItemProps(index)
      return {
        'aria-expanded': value.includes(itemValue),
        'aria-controls': `${baseId}-content-${itemValue}`,
        id: `${baseId}-trigger-${itemValue}`,
        tabIndex: rovingProps.tabIndex,
        onFocus: rovingProps.onFocus,
        'data-roving-item': rovingProps['data-roving-item'],
        onClick: () => toggleItem(itemValue),
        ...(disabled ? { disabled: true as const } : {}),
      }
    },
    [baseId, value, getItemProps, toggleItem, disabled],
  )

  const getContentProps = useCallback(
    (itemValue: string) => ({
      id: `${baseId}-content-${itemValue}`,
      role: 'region' as const,
      'aria-labelledby': `${baseId}-trigger-${itemValue}`,
      hidden: !value.includes(itemValue),
    }),
    [baseId, value],
  )

  return {
    value,
    isExpanded,
    toggleItem,
    registerItem,
    unregisterItem,
    getRootProps,
    getTriggerProps,
    getContentProps,
  }
}
