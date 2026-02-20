import { render, screen } from '../../__test-utils__/render'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <Dialog>
          <Dialog.Trigger testID="trigger">Open</Dialog.Trigger>
        </Dialog>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })

    it('renders trigger text', () => {
      render(
        <Dialog>
          <Dialog.Trigger>Open dialog</Dialog.Trigger>
        </Dialog>,
      )
      expect(screen.getByText('Open dialog')).toBeTruthy()
    })
  })

  describe('open state', () => {
    it('renders dialog content when open', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Confirm action</Dialog.Title>
              <Dialog.Description>Are you sure you want to do this?</Dialog.Description>
              <Dialog.Close testID="close-btn">Cancel</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>,
      )
      expect(screen.getByText('Confirm action')).toBeTruthy()
      expect(screen.getByText('Are you sure you want to do this?')).toBeTruthy()
      expect(screen.getByTestId('close-btn')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Dialog.Trigger', () => {
      render(
        <Dialog>
          <Dialog.Trigger testID="trigger">Open</Dialog.Trigger>
        </Dialog>,
      )
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })

    it('exposes Dialog.Title and Dialog.Description when open', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Dialog title</Dialog.Title>
              <Dialog.Description>Dialog description</Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>,
      )
      expect(screen.getByText('Dialog title')).toBeTruthy()
      expect(screen.getByText('Dialog description')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('dialog content has dialog role when open', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content testID="content">
              <Dialog.Title>My dialog</Dialog.Title>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>,
      )
      const content = screen.getByTestId('content')
      expect(content.getAttribute?.('role')).toBe('dialog')
    })
  })
})
