import { useCallback, useId, useState } from 'react'

export interface UseDisclosureProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  getToggleProps: () => { onPress: () => void; 'aria-expanded': boolean; 'aria-controls': string }
  getContentProps: () => { hidden: boolean; id: string }
}

export function useDisclosure(props: UseDisclosureProps = {}): UseDisclosureReturn {
  const { defaultOpen = false, open: controlledOpen, onOpenChange } = props
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const contentId = useId()

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange],
  )

  const onOpen = useCallback(() => setOpen(true), [setOpen])
  const onClose = useCallback(() => setOpen(false), [setOpen])
  const onToggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen])

  const getToggleProps = useCallback(
    () => ({
      onPress: onToggle,
      'aria-expanded': isOpen,
      'aria-controls': contentId,
    }),
    [onToggle, isOpen, contentId],
  )

  const getContentProps = useCallback(
    () => ({
      hidden: !isOpen,
      id: contentId,
    }),
    [isOpen, contentId],
  )

  return { isOpen, onOpen, onClose, onToggle, getToggleProps, getContentProps }
}
