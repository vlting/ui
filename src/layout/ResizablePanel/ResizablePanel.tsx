import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { XStack, YStack, styled } from 'tamagui'

// ─── Handle ───────────────────────────────────────────────────────────────────

const HandleHorizontal = styled(YStack, {
  width: 6,
  height: '100%',
  backgroundColor: '$borderColor',
  cursor: 'col-resize',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',

  hoverStyle: {
    backgroundColor: '$color',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },
})

const HandleVertical = styled(XStack, {
  width: '100%',
  height: 6,
  backgroundColor: '$borderColor',
  cursor: 'row-resize',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',

  hoverStyle: {
    backgroundColor: '$color',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type ResizablePanelDirection = 'horizontal' | 'vertical'

export type ResizablePanelProps = {
  /** Resize axis direction */
  direction?: ResizablePanelDirection
  /** Controlled size in px */
  size?: number
  /** Default size in px for uncontrolled mode */
  defaultSize?: number
  /** Minimum size in px */
  minSize?: number
  /** Maximum size in px */
  maxSize?: number
  /** Callback when size changes */
  onSizeChange?: (size: number) => void
  /** Accessible label for the resize handle */
  handleLabel?: string
  /** Arrow key step increment in px */
  step?: number
  /** Shift + Arrow step increment in px */
  shiftStep?: number
  children?: React.ReactNode
  testID?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ResizablePanel = memo(function ResizablePanel({
  direction = 'horizontal',
  size: sizeProp,
  defaultSize = 300,
  minSize = 100,
  maxSize = 800,
  onSizeChange,
  handleLabel = 'Resize panel',
  step = 10,
  shiftStep = 50,
  children,
  testID,
}: ResizablePanelProps) {
  const isControlled = sizeProp !== undefined
  const [internalSize, setInternalSize] = useState(defaultSize)
  const size = isControlled ? (sizeProp ?? defaultSize) : internalSize

  const isDragging = useRef(false)
  const dragStart = useRef(0)
  const sizeAtDragStart = useRef(size)

  const clamp = useCallback(
    (v: number) => Math.max(minSize, Math.min(maxSize, v)),
    [minSize, maxSize],
  )

  const updateSize = useCallback(
    (newSize: number) => {
      const clamped = clamp(newSize)
      if (!isControlled) setInternalSize(clamped)
      onSizeChange?.(clamped)
    },
    [isControlled, onSizeChange, clamp],
  )

  // Pointer events for drag
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      dragStart.current = direction === 'horizontal' ? e.clientX : e.clientY
      sizeAtDragStart.current = size
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [direction, size],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return
      const current = direction === 'horizontal' ? e.clientX : e.clientY
      const delta = current - dragStart.current
      updateSize(sizeAtDragStart.current + delta)
    },
    [direction, updateSize],
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  // Keyboard handler for the handle
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const inc = e.shiftKey ? shiftStep : step
      if (direction === 'horizontal') {
        if (e.key === 'ArrowRight') { e.preventDefault(); updateSize(size + inc) }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); updateSize(size - inc) }
      } else {
        if (e.key === 'ArrowDown') { e.preventDefault(); updateSize(size + inc) }
        else if (e.key === 'ArrowUp') { e.preventDefault(); updateSize(size - inc) }
      }
      if (e.key === 'Home') { e.preventDefault(); updateSize(minSize) }
      if (e.key === 'End') { e.preventDefault(); updateSize(maxSize) }
    },
    [direction, size, step, shiftStep, minSize, maxSize, updateSize],
  )

  const isHorizontal = direction === 'horizontal'

  const HandleComponent = isHorizontal ? HandleHorizontal : HandleVertical

  return (
    <XStack
      testID={testID}
      flex={1}
      flexDirection={isHorizontal ? 'row' : 'column'}
      overflow="hidden"
    >
      <YStack
        width={isHorizontal ? size : '100%'}
        height={isHorizontal ? '100%' : size}
        overflow="hidden"
        flexShrink={0}
      >
        {children}
      </YStack>

      <HandleComponent
        accessible
        role="separator"
        aria-orientation={direction}
        aria-valuenow={size}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        aria-label={handleLabel}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        testID="resize-handle"
      />
    </XStack>
  )
})
