import { useCallback, useEffect, useState } from 'react'
import type { RefObject } from 'react'

type Placement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'

export interface UsePopoverPositionProps {
  placement?: Placement
  offset?: number
  triggerRef: RefObject<HTMLElement>
  contentRef: RefObject<HTMLElement>
  isOpen: boolean
}

export interface UsePopoverPositionReturn {
  position: { top: number; left: number }
  actualPlacement: string
  update: () => void
}

function computePosition(
  trigger: DOMRect,
  content: DOMRect,
  placement: Placement,
  offset: number,
): { top: number; left: number; placement: Placement } {
  let top = 0
  let left = 0
  const base = placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'
  const align = placement.split('-')[1] as 'start' | 'end' | undefined

  switch (base) {
    case 'top':
      top = trigger.top - content.height - offset
      left = trigger.left + (trigger.width - content.width) / 2
      break
    case 'bottom':
      top = trigger.bottom + offset
      left = trigger.left + (trigger.width - content.width) / 2
      break
    case 'left':
      top = trigger.top + (trigger.height - content.height) / 2
      left = trigger.left - content.width - offset
      break
    case 'right':
      top = trigger.top + (trigger.height - content.height) / 2
      left = trigger.right + offset
      break
  }

  if (align === 'start') {
    if (base === 'top' || base === 'bottom') left = trigger.left
    else top = trigger.top
  } else if (align === 'end') {
    if (base === 'top' || base === 'bottom') left = trigger.right - content.width
    else top = trigger.bottom - content.height
  }

  return { top, left, placement }
}

function flip(placement: Placement): Placement {
  const map: Record<string, Placement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
    'top-start': 'bottom-start',
    'top-end': 'bottom-end',
    'bottom-start': 'top-start',
    'bottom-end': 'top-end',
  }
  return map[placement] ?? placement
}

function isInViewport(pos: { top: number; left: number }, content: DOMRect): boolean {
  return (
    pos.top >= 0 &&
    pos.left >= 0 &&
    pos.top + content.height <= window.innerHeight &&
    pos.left + content.width <= window.innerWidth
  )
}

export function usePopoverPosition({
  placement = 'bottom',
  offset = 8,
  triggerRef,
  contentRef,
  isOpen,
}: UsePopoverPositionProps): UsePopoverPositionReturn {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [actualPlacement, setActualPlacement] = useState<string>(placement)

  const update = useCallback(() => {
    const trigger = triggerRef.current
    const content = contentRef.current
    if (!trigger || !content) return

    const triggerRect = trigger.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    let result = computePosition(triggerRect, contentRect, placement, offset)

    if (!isInViewport({ top: result.top, left: result.left }, contentRect)) {
      const flipped = computePosition(triggerRect, contentRect, flip(placement), offset)
      if (isInViewport({ top: flipped.top, left: flipped.left }, contentRect)) {
        result = flipped
      }
    }

    setPosition({ top: result.top, left: result.left })
    setActualPlacement(result.placement)
  }, [triggerRef, contentRef, placement, offset])

  useEffect(() => {
    if (isOpen) update()
  }, [isOpen, update])

  return { position, actualPlacement, update }
}
