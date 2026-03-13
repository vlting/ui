import { createStub } from '../_stub'

export type RadioGroupRootProps = Record<string, any>
export type RadioGroupItemProps = Record<string, any>

export const RadioGroup = {
  Root: createStub('RadioGroup.Root', 'div'),
  Item: createStub('RadioGroup.Item', 'button'),
}
