import type { ReactNode } from 'react'
import { createNativeStub } from '../_stub.native'

export interface AlertProps {
  children: ReactNode
  variant?: 'default' | 'destructive' | 'warning' | 'info'
  style?: any
}

export const Alert = {
  Root: createNativeStub('Alert.Root'),
  Title: createNativeStub('Alert.Title'),
  Description: createNativeStub('Alert.Description'),
  Icon: createNativeStub('Alert.Icon'),
}
