import { useCallback, useEffect, useState } from 'react'

export interface UseContextMenuProps {
  onOpenChange?: (open: boolean) => void
}

export interface UseContextMenuReturn {
  isOpen: boolean
  position: { x: number; y: number }
  close: () => void
  getTargetProps: () => { onContextMenu: (e: React.MouseEvent) => void }
}

export function useContextMenu({
  onOpenChange,
}: UseContextMenuProps = {}): UseContextMenuReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const open = useCallback((x: number, y: number) => {
    setPosition({ x, y })
    setIsOpen(true)
    onOpenChange?.(true)
  }, [onOpenChange])

  const close = useCallback(() => {
    setIsOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  useEffect(() => {
    if (!isOpen) return

    const handleClick = () => close()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  const getTargetProps = useCallback(() => ({
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault()
      open(e.clientX, e.clientY)
    },
  }), [open])

  return { isOpen, position, close, getTargetProps }
}
