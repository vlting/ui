import { useCallback, useState } from 'react'
import { useControllableState } from './useControllableState'
import { useRovingTabIndex } from './useRovingTabIndex'

export interface UseToggleGroupProps {
  type: 'toggle' | 'exclusive'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  orientation?: 'horizontal' | 'vertical'
  loop?: boolean
  /** Indices of disabled items to skip during keyboard navigation */
  disabledIndices?: Set<number>
  /** Ordered list of item values (from children) for roving index mapping */
  itemValues?: string[]
}

export interface UseToggleGroupReturn {
  value: string[]
  getGroupProps: () => {
    role: 'group' | 'radiogroup'
    'aria-orientation'?: 'horizontal' | 'vertical'
    ref?: React.RefObject<HTMLElement | null>
    onKeyDown?: (e: React.KeyboardEvent) => void
  }
  getItemProps: (itemValue: string) => {
    'aria-pressed'?: boolean
    'aria-checked'?: boolean
    role?: 'radio'
    onClick: () => void
    tabIndex?: 0 | -1
    onFocus?: () => void
    'data-roving-item'?: ''
  }
}

export function useToggleGroup(props: UseToggleGroupProps): UseToggleGroupReturn {
  const { type, value: valueProp, defaultValue = [], onValueChange, orientation = 'horizontal', loop = true, disabledIndices, itemValues = [] } = props

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const currentValue = value ?? []

  const [activeIndex, setActiveIndex] = useState(() => {
    const firstSelected = (valueProp ?? defaultValue)?.[0]
    if (firstSelected) {
      const idx = itemValues.indexOf(firstSelected)
      return idx >= 0 ? idx : 0
    }
    return 0
  })

  const roving = useRovingTabIndex({
    count: itemValues.length || 1,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
    orientation,
    loop,
    disabledIndices,
  })

  const handleToggle = useCallback(
    (itemValue: string) => {
      if (type === 'toggle') {
        setValue((prev) => {
          const current = prev ?? []
          return current.includes(itemValue)
            ? current.filter((v) => v !== itemValue)
            : [...current, itemValue]
        })
      } else {
        // exclusive: single select, toggle off if same
        setValue((prev) => {
          const current = prev ?? []
          return current.includes(itemValue) ? [] : [itemValue]
        })
      }
    },
    [type, setValue],
  )

  const getGroupProps = useCallback(
    () => {
      if (type === 'exclusive') {
        return {
          role: 'radiogroup' as const,
          'aria-orientation': orientation,
          ...roving.getContainerProps(),
        }
      }
      return {
        role: 'group' as const,
        'aria-orientation': orientation,
      }
    },
    [type, orientation, roving],
  )

  const getItemProps = useCallback(
    (itemValue: string) => {
      const itemIndex = itemValues.indexOf(itemValue)
      const isSelected = currentValue.includes(itemValue)

      if (type === 'exclusive') {
        const rovingProps = roving.getItemProps(itemIndex >= 0 ? itemIndex : 0)
        return {
          'aria-checked': isSelected,
          role: 'radio' as const,
          onClick: () => handleToggle(itemValue),
          tabIndex: rovingProps.tabIndex,
          onFocus: rovingProps.onFocus,
          'data-roving-item': rovingProps['data-roving-item'],
        }
      }

      // toggle mode: each button independently tabbable
      return {
        'aria-pressed': isSelected,
        onClick: () => handleToggle(itemValue),
      }
    },
    [currentValue, type, itemValues, roving, handleToggle],
  )

  return { value: currentValue, getGroupProps, getItemProps }
}
