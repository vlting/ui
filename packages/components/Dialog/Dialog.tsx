import { createStub } from '../_stub'

export type DialogRootProps = Record<string, any>

export const Dialog = {
  Root: createStub('Dialog.Root', 'div'),
  Trigger: createStub('Dialog.Trigger', 'button'),
  Overlay: createStub('Dialog.Overlay', 'div'),
  Content: createStub('Dialog.Content', 'div'),
  Title: createStub('Dialog.Title', 'h2'),
  Description: createStub('Dialog.Description', 'p'),
  Close: createStub('Dialog.Close', 'button'),
  Header: createStub('Dialog.Header', 'div'),
  Footer: createStub('Dialog.Footer', 'div'),
}
