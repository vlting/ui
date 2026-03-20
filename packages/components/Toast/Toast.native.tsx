import { createNativeCompoundStub, noopFn } from '../_stub.native'

export const useNativeToast = () => ({ add: noopFn, remove: noopFn })

export const Toast = createNativeCompoundStub('Toast', [
  'Provider',
  'Root',
  'Title',
  'Description',
  'Close',
  'Viewport',
])
