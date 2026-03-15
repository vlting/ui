import { createStub, createCompoundStub } from '../_stub'

export type ToggleProps = Record<string, any>
export type ToggleGroupProps = Record<string, any>
export type ToggleGroupItemProps = Record<string, any>

export const Toggle = createStub('Toggle', 'button')
export const ToggleGroup = createCompoundStub('ToggleGroup', { Item: 'button' }, 'div')
