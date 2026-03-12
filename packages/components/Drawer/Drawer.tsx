import { createStub } from '../_stub'

export type DrawerRootProps = Record<string, any>
export type DrawerContentProps = Record<string, any>

export const Drawer = {
  Root: createStub('Drawer.Root', 'div'),
  Trigger: createStub('Drawer.Trigger', 'button'),
  Content: createStub('Drawer.Content', 'div'),
  Header: createStub('Drawer.Header', 'div'),
  Footer: createStub('Drawer.Footer', 'div'),
  Title: createStub('Drawer.Title', 'h2'),
  Description: createStub('Drawer.Description', 'p'),
  Close: createStub('Drawer.Close', 'button'),
}
