import { createStub } from '../_stub'

export type AlertDialogRootProps = Record<string, any>

export const AlertDialog = {
  Root: createStub('AlertDialog.Root', 'div'),
  Trigger: createStub('AlertDialog.Trigger', 'button'),
  Overlay: createStub('AlertDialog.Overlay', 'div'),
  Content: createStub('AlertDialog.Content', 'div'),
  Title: createStub('AlertDialog.Title', 'h2'),
  Description: createStub('AlertDialog.Description', 'p'),
  Footer: createStub('AlertDialog.Footer', 'div'),
  Cancel: createStub('AlertDialog.Cancel', 'button'),
  Action: createStub('AlertDialog.Action', 'button'),
}
