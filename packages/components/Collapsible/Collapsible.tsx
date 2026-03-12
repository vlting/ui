import { createStub } from '../_stub'

export type CollapsibleRootProps = Record<string, any>
export type CollapsibleTriggerProps = Record<string, any>
export type CollapsibleContentProps = Record<string, any>

export const Collapsible = {
  Root: createStub('Collapsible.Root', 'div'),
  Trigger: createStub('Collapsible.Trigger', 'button'),
  Content: createStub('Collapsible.Content', 'div'),
}
