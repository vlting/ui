import { useCallback, useState } from 'react'

export interface UseContextMenuNativeReturn {
  isOpen: boolean
  position: { x: number; y: number }
  close: () => void
  getTriggerProps: () => {
    onLongPress: (e: { nativeEvent: { pageX: number; pageY: number } }) => void
  }
}

export function useContextMenu({
  onOpenChange,
}: { onOpenChange?: (open: boolean) => void } = {}): UseContextMenuNativeReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const close = useCallback(() => {
    setIsOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  const getTriggerProps = useCallback(
    () => ({
      onLongPress: (e: { nativeEvent: { pageX: number; pageY: number } }) => {
        setPosition({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY })
        setIsOpen(true)
        onOpenChange?.(true)
      },
    }),
    [onOpenChange],
  )

  return { isOpen, position, close, getTriggerProps }
}
