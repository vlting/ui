import type React from 'react'
import type { ViewStyle } from 'react-native'
import { createNativeCompoundStub } from '../_stub.native'

export interface SelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  style?: ViewStyle
}

export const Select = createNativeCompoundStub('Select', [
  'Item',
  'Value',
  'Group',
  'Label',
  'Separator',
])
