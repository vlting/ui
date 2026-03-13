import { createCompoundStub } from '../_stub'

export type CardProps = Record<string, any>

export const Card = createCompoundStub('Card', {
  Header: 'div', Content: 'div', Footer: 'div', Title: 'h3', Description: 'p',
}, 'div')
