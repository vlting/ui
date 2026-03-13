import { createCompoundStub } from '../_stub'

export type InputGroupProps = Record<string, any>
export type InputGroupAddonProps = Record<string, any>
export type InputGroupElementProps = Record<string, any>
export type InputGroupInputProps = Record<string, any>

export const InputGroup = createCompoundStub('InputGroup', {
  Addon: 'div', Element: 'div', Input: 'input',
}, 'div')
