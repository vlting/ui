import { createStub } from '../_stub'

export type ScrollAreaRootProps = Record<string, any>
export type ScrollAreaViewportProps = Record<string, any>

export const ScrollArea = {
  Root: createStub('ScrollArea.Root', 'div'),
  Viewport: createStub('ScrollArea.Viewport', 'div'),
  Scrollbar: createStub('ScrollArea.Scrollbar', 'div'),
  Thumb: createStub('ScrollArea.Thumb', 'div'),
  Corner: createStub('ScrollArea.Corner', 'div'),
}
