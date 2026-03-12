import { createStub } from '../_stub'

export type PopoverRootProps = Record<string, any>

export const Popover = {
  Root: createStub('Popover.Root', 'div'),
  Trigger: createStub('Popover.Trigger', 'button'),
  Anchor: createStub('Popover.Anchor', 'div'),
  Content: createStub('Popover.Content', 'div'),
  Arrow: createStub('Popover.Arrow', 'div'),
  Close: createStub('Popover.Close', 'button'),
}
