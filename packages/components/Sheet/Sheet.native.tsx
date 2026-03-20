import { createNativeCompoundStub } from '../_stub.native'

export const Sheet = createNativeCompoundStub('Sheet', [
  'Trigger',
  'Content',
  'Header',
  'Footer',
  'Title',
  'Description',
  'Close',
])
