import { createCompoundStub } from '../_stub'
import type { ComponentProps } from 'react'

export const Item = createCompoundStub('Item', {
  Leading: 'div', Content: 'div', Title: 'span', Description: 'span', Trailing: 'div',
}, 'div')

export type ItemProps = ComponentProps<typeof Item>
export type ItemLeadingProps = Record<string, any>
export type ItemContentProps = Record<string, any>
export type ItemTitleProps = Record<string, any>
export type ItemDescriptionProps = Record<string, any>
export type ItemTrailingProps = Record<string, any>
