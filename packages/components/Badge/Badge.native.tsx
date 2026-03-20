import type { ReactNode } from 'react'
import { createNativeStub } from '../_stub.native'

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  children?: ReactNode
  style?: any
}

export const Badge = createNativeStub('Badge')
