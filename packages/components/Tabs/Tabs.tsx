import { createStub } from '../_stub'

export type TabsRootProps = Record<string, any>
export type TabsListProps = Record<string, any>
export type TabsContentProps = Record<string, any>

export const Tabs = {
  Root: createStub('Tabs.Root', 'div'),
  List: createStub('Tabs.List', 'div'),
  Trigger: createStub('Tabs.Trigger', 'button'),
  Content: createStub('Tabs.Content', 'div'),
}
