import type { ViewStyle } from 'react-native'
import { createNativeStub } from '../_stub.native'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  style?: ViewStyle
}

export const Separator = createNativeStub('Separator')
