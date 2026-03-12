import { createStub } from '../_stub'

export type ContextMenuRootProps = Record<string, any>
export type ContextMenuItemProps = Record<string, any>
export type ContextMenuCheckboxItemProps = Record<string, any>

export const ContextMenu = {
  Root: createStub('ContextMenu.Root', 'div'),
  Trigger: createStub('ContextMenu.Trigger', 'div'),
  Content: createStub('ContextMenu.Content', 'div'),
  Item: createStub('ContextMenu.Item', 'div'),
  CheckboxItem: createStub('ContextMenu.CheckboxItem', 'div'),
  Separator: createStub('ContextMenu.Separator', 'div'),
  Label: createStub('ContextMenu.Label', 'div'),
}
