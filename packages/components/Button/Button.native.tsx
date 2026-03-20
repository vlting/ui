import type { ReactNode } from 'react'
import { createNativeCompoundStub } from '../_stub.native'

type ButtonVariant =
  | 'default'
  | 'solid'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'

export interface ButtonProps {
  children?: ReactNode
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  square?: boolean
  pill?: boolean
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
  style?: any
}

export const Button = createNativeCompoundStub('Button', ['Text', 'Icon'])
