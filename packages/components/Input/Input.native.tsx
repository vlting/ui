import type { ReactNode } from 'react'
import { createNativeStub } from '../_stub.native'

export interface InputProps {
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url'
  leadingSlot?: ReactNode
  trailingSlot?: ReactNode
  style?: any
}

export const Input = createNativeStub('Input')
