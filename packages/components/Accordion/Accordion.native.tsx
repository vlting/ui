import type { ReactNode } from 'react'
import { createNativeCompoundStub } from '../_stub.native'

export interface AccordionRootProps {
  children: ReactNode
  type?: 'single' | 'multiple'
  defaultValue?: string[]
  style?: any
}

export const Accordion = createNativeCompoundStub('Accordion', [
  'Item',
  'Trigger',
  'Content',
])
