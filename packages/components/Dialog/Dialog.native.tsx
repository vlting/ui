import { createNativeCompoundStub } from '../_stub.native'

export const Dialog = createNativeCompoundStub('Dialog', [
  'Trigger',
  'Content',
  'Header',
  'Footer',
  'Title',
  'Description',
  'Close',
])
