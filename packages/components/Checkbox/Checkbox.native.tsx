import type { ReactNode } from 'react'
import { createNativeStub } from '../_stub.native'

export interface CheckboxRootProps {
  children?: ReactNode
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: any
}

export const Checkbox = {
  Root: createNativeStub('Checkbox.Root'),
  Indicator: createNativeStub('Checkbox.Indicator'),
}
