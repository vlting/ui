import { createStub } from '../_stub'

export type CheckboxRootProps = Record<string, any>

export const Checkbox = {
  Root: createStub('Checkbox.Root', 'button'),
  Indicator: createStub('Checkbox.Indicator', 'span'),
}
