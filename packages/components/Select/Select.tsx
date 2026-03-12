import { createCompoundStub } from '../_stub'

export type SelectProps = Record<string, any>
export type SelectItemProps = Record<string, any>

export const Select = createCompoundStub('Select', {
  Item: 'div', Value: 'span', Group: 'div', Label: 'div', Separator: 'div',
}, 'div')
