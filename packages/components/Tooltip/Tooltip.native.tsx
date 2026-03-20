import type React from 'react'
import type { ViewStyle } from 'react-native'
import { createNativeStub } from '../_stub.native'

export interface TooltipProps {
  children: React.ReactNode
  content: string
  delay?: number
  dismissDelay?: number
  style?: ViewStyle
}

export const Tooltip = createNativeStub('Tooltip')
