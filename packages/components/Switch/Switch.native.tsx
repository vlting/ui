import type { ViewStyle } from 'react-native'
import { createNativeStub } from '../_stub.native'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}

export const Switch = createNativeStub('Switch')
