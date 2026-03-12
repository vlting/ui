import { createStub } from '../_stub'

export type NativeSelectRootProps = Record<string, any>
export type NativeSelectOptionProps = Record<string, any>

export const NativeSelect = {
  Root: createStub('NativeSelect.Root', 'select'),
  Option: createStub('NativeSelect.Option', 'option'),
}
