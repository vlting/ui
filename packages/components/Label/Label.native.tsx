import type { ReactNode } from 'react'
import { createNativeStub } from '../_stub.native'

export interface LabelProps {
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  disabled?: boolean
  htmlFor?: string
  style?: any
}

export const Label = createNativeStub('Label')
