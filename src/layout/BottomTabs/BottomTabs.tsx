import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Text, XStack, YStack, styled } from 'tamagui'

// ─── Frames ───────────────────────────────────────────────────────────────────

const BottomTabsFrame = styled(XStack, {
  width: '100%',
  backgroundColor: '$background',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  flexShrink: 0,
})

const TabItemFrame = styled(YStack, {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: '$2',
  paddingHorizontal: '$1',
  gap: '$1',
  cursor: 'pointer',
  minHeight: 48,

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.4,
        pointerEvents: 'none',
      },
    },
  } as const,
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type BottomTabItem = {
  value: string
  label: string
  icon?: React.ReactNode
  badge?: number
  disabled?: boolean
}

export type BottomTabsProps = {
  /** Array of tab items to render */
  items: BottomTabItem[]
  /** Controlled active tab value */
  value?: string
  /** Default active tab for uncontrolled mode */
  defaultValue?: string
  /** Callback when tab changes */
  onValueChange?: (value: string) => void
  /** Accessible label for the tablist */
  accessibilityLabel?: string
  testID?: string
}

// ─── Root Component ───────────────────────────────────────────────────────────

export const BottomTabs = memo(function BottomTabs({
  items,
  value: valueProp,
  defaultValue,
  onValueChange,
  accessibilityLabel = 'Main navigation',
  testID,
}: BottomTabsProps) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '')
  const activeValue = isControlled ? valueProp : internalValue
  const tabRefs = useRef<Array<React.RefObject<HTMLElement>>>([])

  // Keep refs array in sync with items count
  if (tabRefs.current.length !== items.length) {
    tabRefs.current = items.map(() => React.createRef<HTMLElement>())
  }

  const handleTabPress = useCallback(
    (itemValue: string) => {
      if (!isControlled) setInternalValue(itemValue)
      onValueChange?.(itemValue)
    },
    [isControlled, onValueChange],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const enabledItems = items.filter((i) => !i.disabled)
      const enabledIndex = enabledItems.findIndex((i) => i.value === items[index]?.value)

      let nextIndex = -1

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        nextIndex = enabledIndex > 0 ? enabledIndex - 1 : enabledItems.length - 1
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextIndex = enabledIndex < enabledItems.length - 1 ? enabledIndex + 1 : 0
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = enabledItems.length - 1
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (!items[index]?.disabled) {
          handleTabPress(items[index]?.value ?? '')
        }
        return
      }

      if (nextIndex >= 0 && enabledItems[nextIndex]) {
        handleTabPress(enabledItems[nextIndex].value)
        // Focus the corresponding DOM element
        const targetItem = enabledItems[nextIndex]
        const targetIndex = items.findIndex((i) => i.value === targetItem.value)
        const ref = tabRefs.current[targetIndex]
        if (ref?.current) {
          ref.current.focus()
        }
      }
    },
    [items, handleTabPress],
  )

  return (
    <BottomTabsFrame
      accessible
      accessibilityRole="tablist"
      aria-label={accessibilityLabel}
      testID={testID}
    >
      {items.map((item, index) => {
        const isActive = item.value === activeValue
        return (
          <TabItemFrame
            key={item.value}
            accessible
            accessibilityRole="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            onPress={() => !item.disabled && handleTabPress(item.value)}
            onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, index)}
            testID={`tab-${item.value}`}
          >
            {item.icon && (
              <YStack aria-hidden="true">
                {item.icon}
              </YStack>
            )}
            <Text
              fontSize="$1"
              color={isActive ? '$color' : '$colorSubtitle'}
              fontWeight={isActive ? '600' : '400'}
            >
              {item.badge !== undefined && item.badge > 0
                ? `${item.label}, ${item.badge} unread`
                : item.label}
            </Text>
          </TabItemFrame>
        )
      })}
    </BottomTabsFrame>
  )
})
