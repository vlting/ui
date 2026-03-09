import type React from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: React.ReactNode
  container?: Element | null
}

export function Portal({ children, container }: PortalProps) {
  if (typeof document === 'undefined') return null
  return createPortal(children, container ?? document.body)
}
