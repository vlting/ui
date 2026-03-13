import { createStub } from '../_stub'

export type DropdownMenuRootProps = Record<string, any>
export type DropdownMenuItemProps = Record<string, any>
export type DropdownMenuCheckboxItemProps = Record<string, any>

export const DropdownMenu = {
  Root: createStub('DropdownMenu.Root', 'div'),
  Trigger: createStub('DropdownMenu.Trigger', 'button'),
  Content: createStub('DropdownMenu.Content', 'div'),
  Item: createStub('DropdownMenu.Item', 'div'),
  CheckboxItem: createStub('DropdownMenu.CheckboxItem', 'div'),
  Separator: createStub('DropdownMenu.Separator', 'div'),
  Label: createStub('DropdownMenu.Label', 'div'),
}
