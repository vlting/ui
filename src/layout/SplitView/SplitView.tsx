import React, { memo, useCallback, useRef, useState } from 'react'
import { XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Panel frames ─────────────────────────────────────────────────────────────

const PrimaryPanel = styled(YStack, {
  backgroundColor: '$background',
  overflow: 'hidden',
  flexShrink: 0,
})

const SecondaryPanel = styled(YStack, {
  backgroundColor: '$background',
  overflow: 'hidden',
  flex: 1,
})

// ─── Divider ──────────────────────────────────────────────────────────────────

const DividerHorizontal = styled(YStack, {
  width: 4,
  height: '100%',
  backgroundColor: '$borderColor',
  cursor: 'col-resize',
  flexShrink: 0,

  hoverStyle: {
    backgroundColor: '$color',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },
})

const DividerVertical = styled(XStack, {
  width: '100%',
  height: 4,
  backgroundColor: '$borderColor',
  cursor: 'row-resize',
  flexShrink: 0,

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

export type SplitViewDirection = 'horizontal' | 'vertical'

export type SplitViewProps = {
  /** Layout direction */
  direction?: SplitViewDirection
  /** Controlled split ratio 0–1 (proportion for primary panel) */
  defaultSplit?: number
  /** Min split ratio 0–1 */
  minSplit?: number
  /** Max split ratio 0–1 */
  maxSplit?: number
  /** Callback when split changes */
  onSplitChange?: (split: number) => void
  /** Whether the divider is draggable */
  resizable?: boolean
  /** Arrow key step for keyboard resize */
  step?: number
  /** Accessible label for primary panel */
  primaryLabel?: string
  /** Accessible label for secondary panel */
  secondaryLabel?: string
  /** Accessible label for the divider handle */
  dividerLabel?: string
  children?: React.ReactNode
  testID?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

const SplitViewRoot = memo(function SplitView({
  direction = 'horizontal',
  defaultSplit = 0.3,
  minSplit = 0.1,
  maxSplit = 0.9,
  onSplitChange,
  resizable = false,
  step = 0.05,
  primaryLabel = 'Primary panel',
  secondaryLabel = 'Secondary panel',
  dividerLabel = 'Resize panels',
  children,
  testID,
}: SplitViewProps) {
  const [split, setSplit] = useState(defaultSplit)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const clamp = useCallback(
    (v: number) => Math.max(minSplit, Math.min(maxSplit, v)),
    [minSplit, maxSplit],
  )

  const updateSplit = useCallback(
    (newSplit: number) => {
      const clamped = clamp(newSplit)
      setSplit(clamped)
      onSplitChange?.(clamped)
    },
    [clamp, onSplitChange],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      if (direction === 'horizontal') {
        const ratio = (e.clientX - rect.left) / rect.width
        updateSplit(ratio)
      } else {
        const ratio = (e.clientY - rect.top) / rect.height
        updateSplit(ratio)
      }
    },
    [direction, updateSplit],
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (direction === 'horizontal') {
        if (e.key === 'ArrowRight') { e.preventDefault(); updateSplit(split + step) }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); updateSplit(split - step) }
      } else {
        if (e.key === 'ArrowDown') { e.preventDefault(); updateSplit(split + step) }
        else if (e.key === 'ArrowUp') { e.preventDefault(); updateSplit(split - step) }
      }
      if (e.key === 'Home') { e.preventDefault(); updateSplit(minSplit) }
      if (e.key === 'End') { e.preventDefault(); updateSplit(maxSplit) }
    },
    [direction, split, step, minSplit, maxSplit, updateSplit],
  )

  const isHorizontal = direction === 'horizontal'
  const DividerComponent = isHorizontal ? DividerHorizontal : DividerVertical

  // Convert 0–1 ratio to percentage strings
  const primarySize = `${(split * 100).toFixed(1)}%`

  return (
    <XStack
      ref={containerRef as React.Ref<HTMLDivElement>}
      flex={1}
      flexDirection={isHorizontal ? 'row' : 'column'}
      overflow="hidden"
      testID={testID}
    >
      <PrimaryPanel
        accessible
        aria-label={primaryLabel}
        width={isHorizontal ? primarySize : '100%'}
        height={isHorizontal ? '100%' : primarySize}
        testID="splitview-primary"
      >
        {/* Primary panel slot — consumed via children[0] or SplitView.Primary */}
      </PrimaryPanel>

      {resizable && (
        <DividerComponent
          accessible
          role="separator"
          aria-orientation={direction}
          aria-valuenow={Math.round(split * 100)}
          aria-valuemin={Math.round(minSplit * 100)}
          aria-valuemax={Math.round(maxSplit * 100)}
          aria-label={dividerLabel}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          testID="splitview-divider"
        />
      )}

      {!resizable && (
        <YStack
          width={isHorizontal ? 1 : '100%'}
          height={isHorizontal ? '100%' : 1}
          backgroundColor="$borderColor"
          flexShrink={0}
          testID="splitview-divider"
        />
      )}

      <SecondaryPanel
        accessible
        aria-label={secondaryLabel}
        testID="splitview-secondary"
      >
        {children}
      </SecondaryPanel>
    </XStack>
  )
})

// ─── Named panel sub-components ──────────────────────────────────────────────

const SplitViewPrimary = styled(YStack, {
  flex: 1,
  overflow: 'hidden',
})

const SplitViewSecondary = styled(YStack, {
  flex: 1,
  overflow: 'hidden',
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const SplitView = withStaticProperties(SplitViewRoot, {
  Primary: SplitViewPrimary,
  Secondary: SplitViewSecondary,
})
