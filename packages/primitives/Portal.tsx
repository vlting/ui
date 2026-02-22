import React from 'react'
import { Portal as TPortal } from 'tamagui'

export interface PortalProps {
  children: React.ReactNode
}

export function Portal({ children }: PortalProps) {
  return <TPortal>{children}</TPortal>
}
