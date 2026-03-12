import { createStub } from '../_stub'

export type FormRootProps = Record<string, any>
export type FormFieldProps = Record<string, any>

export const Form = {
  Root: createStub('Form.Root', 'form'),
  Field: createStub('Form.Field', 'div'),
  Label: createStub('Form.Label', 'label'),
  Description: createStub('Form.Description', 'p'),
  ErrorMessage: createStub('Form.ErrorMessage', 'p'),
}
