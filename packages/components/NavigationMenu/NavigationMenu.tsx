import { createStub } from '../_stub'

export type NavigationMenuRootProps = Record<string, any>
export type NavigationMenuItemProps = Record<string, any>
export type NavigationMenuLinkProps = Record<string, any>

export const NavigationMenu = {
  Root: createStub('NavigationMenu.Root', 'nav'),
  List: createStub('NavigationMenu.List', 'ul'),
  Item: createStub('NavigationMenu.Item', 'li'),
  Trigger: createStub('NavigationMenu.Trigger', 'button'),
  Content: createStub('NavigationMenu.Content', 'div'),
  Link: createStub('NavigationMenu.Link', 'a'),
  Indicator: createStub('NavigationMenu.Indicator', 'div'),
  Viewport: createStub('NavigationMenu.Viewport', 'div'),
}
