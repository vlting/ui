import { createStub } from '../_stub'

export type FieldRootProps = Record<string, any>
export type FieldLabelProps = Record<string, any>
export type FieldControlProps = Record<string, any>
export type FieldDescriptionProps = Record<string, any>
export type FieldErrorProps = Record<string, any>

export const Field = {
  Root: createStub('Field.Root', 'div'),
  Label: createStub('Field.Label', 'label'),
  Control: createStub('Field.Control', 'div'),
  Description: createStub('Field.Description', 'p'),
  Error: createStub('Field.Error', 'p'),
}
