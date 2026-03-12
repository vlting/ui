import { createStub } from '../_stub'

export type SidebarRootProps = Record<string, any>
export type SidebarGroupProps = Record<string, any>
export type SidebarMenuItemProps = Record<string, any>

export const Sidebar = {
  Root: createStub('Sidebar.Root', 'aside'),
  Header: createStub('Sidebar.Header', 'div'),
  Content: createStub('Sidebar.Content', 'div'),
  Footer: createStub('Sidebar.Footer', 'div'),
  Group: createStub('Sidebar.Group', 'div'),
  GroupLabel: createStub('Sidebar.GroupLabel', 'div'),
  GroupContent: createStub('Sidebar.GroupContent', 'div'),
  Menu: createStub('Sidebar.Menu', 'nav'),
  MenuItem: createStub('Sidebar.MenuItem', 'div'),
  MenuButton: createStub('Sidebar.MenuButton', 'button'),
  Separator: createStub('Sidebar.Separator', 'hr'),
  Trigger: createStub('Sidebar.Trigger', 'button'),
  Rail: createStub('Sidebar.Rail', 'div'),
}
