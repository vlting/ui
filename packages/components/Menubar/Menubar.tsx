import { createStub } from '../_stub'

export type MenubarRootProps = Record<string, any>
export type MenubarMenuProps = Record<string, any>
export type MenubarItemProps = Record<string, any>

export const Menubar = {
  Root: createStub('Menubar.Root', 'div'),
  Menu: createStub('Menubar.Menu', 'div'),
  Trigger: createStub('Menubar.Trigger', 'button'),
  Content: createStub('Menubar.Content', 'div'),
  Item: createStub('Menubar.Item', 'div'),
  Separator: createStub('Menubar.Separator', 'div'),
  Label: createStub('Menubar.Label', 'div'),
}
