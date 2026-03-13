import { createStub } from '../_stub'

export type ResizablePanelGroupProps = Record<string, any>
export type ResizablePanelProps = Record<string, any>
export type ResizableHandleProps = Record<string, any>

export const Resizable = {
  PanelGroup: createStub('Resizable.PanelGroup', 'div'),
  Panel: createStub('Resizable.Panel', 'div'),
  Handle: createStub('Resizable.Handle', 'div'),
}
