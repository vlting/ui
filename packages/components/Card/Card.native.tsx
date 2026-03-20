import type { ReactNode } from 'react'
import { createNativeCompoundStub } from '../_stub.native'

export interface CardProps {
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  elevation?: 'flat' | 'normal' | 'raised'
  style?: any
}

export const Card = createNativeCompoundStub('Card', [
  'Header',
  'Content',
  'Footer',
  'Title',
  'Description',
])
