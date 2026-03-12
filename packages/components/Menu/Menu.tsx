import { createStub } from '../_stub'

export type MenuRootProps = Record<string, any>

export const Menu = {
  Root: createStub('Menu.Root', 'div'),
  Trigger: createStub('Menu.Trigger', 'button'),
  Portal: createStub('Menu.Portal', 'div'),
  Content: createStub('Menu.Content', 'div'),
  Group: createStub('Menu.Group', 'div'),
  Label: createStub('Menu.Label', 'div'),
  Item: createStub('Menu.Item', 'div'),
  ItemTitle: createStub('Menu.ItemTitle', 'span'),
  ItemSubtitle: createStub('Menu.ItemSubtitle', 'span'),
  ItemIcon: createStub('Menu.ItemIcon', 'span'),
  CheckboxItem: createStub('Menu.CheckboxItem', 'div'),
  RadioGroup: createStub('Menu.RadioGroup', 'div'),
  RadioItem: createStub('Menu.RadioItem', 'div'),
  ItemIndicator: createStub('Menu.ItemIndicator', 'span'),
  Separator: createStub('Menu.Separator', 'div'),
  Arrow: createStub('Menu.Arrow', 'div'),
  Sub: createStub('Menu.Sub', 'div'),
  SubTrigger: createStub('Menu.SubTrigger', 'div'),
  SubContent: createStub('Menu.SubContent', 'div'),
}
