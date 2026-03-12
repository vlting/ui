import { createStub } from '../_stub'

export type SheetRootProps = Record<string, any>

export const Sheet = {
  Root: createStub('Sheet.Root', 'div'),
  Overlay: createStub('Sheet.Overlay', 'div'),
  Handle: createStub('Sheet.Handle', 'div'),
  Frame: createStub('Sheet.Frame', 'div'),
  ScrollView: createStub('Sheet.ScrollView', 'div'),
}
