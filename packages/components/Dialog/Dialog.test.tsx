import { render, screen, fireEvent, waitFor } from '../../../src/__test-utils__/render'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      ),
    ).not.toThrow()
  })

  it('renders size variants without errors', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content size={size}>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      unmount()
    }
  })

  describe('open/close states', () => {
    it('does not render content when closed', () => {
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Dialog Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      expect(screen.queryByText('Dialog Title')).toBeNull()
    })

    it('renders content when open', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>Description text</Dialog.Description>
          </Dialog.Content>
        </Dialog.Root>,
      )
      expect(screen.getByText('Dialog Title')).toBeTruthy()
      expect(screen.getByText('Description text')).toBeTruthy()
    })

    it('opens when trigger is clicked', () => {
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Opened Dialog</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      expect(screen.queryByText('Opened Dialog')).toBeNull()
      fireEvent.click(screen.getByText('Open'))
      expect(screen.getByText('Opened Dialog')).toBeTruthy()
    })

    it('calls onOpenChange when opened', () => {
      const onOpenChange = jest.fn()
      render(
        <Dialog.Root onOpenChange={onOpenChange}>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      fireEvent.click(screen.getByText('Open'))
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('ARIA attributes', () => {
    it('has role="dialog" on content', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
    })

    it('has aria-modal="true" on content', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.getAttribute('aria-modal')).toBe('true')
    })

    it('has aria-labelledby pointing to title', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>My Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      const dialog = screen.getByRole('dialog')
      const labelledBy = dialog.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const titleEl = document.getElementById(labelledBy!)
      expect(titleEl?.textContent).toBe('My Title')
    })

    it('has aria-describedby pointing to description', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Description>Desc text</Dialog.Description>
          </Dialog.Content>
        </Dialog.Root>,
      )
      const dialog = screen.getByRole('dialog')
      const describedBy = dialog.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      const descEl = document.getElementById(describedBy!)
      expect(descEl?.textContent).toBe('Desc text')
    })

    it('Close button has aria-label', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Close>X</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>,
      )
      const closeBtn = screen.getByLabelText('Close dialog')
      expect(closeBtn).toBeTruthy()
    })
  })

  describe('keyboard navigation', () => {
    it('closes on Escape key', () => {
      render(
        <Dialog.Root defaultOpen>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  describe('focus management', () => {
    it('moves focus into dialog content when opened', () => {
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>,
      )
      fireEvent.click(screen.getByText('Open'))
      // First focusable element (the Close button) should receive focus
      const closeBtn = screen.getByLabelText('Close dialog')
      expect(document.activeElement).toBe(closeBtn)
    })

    it('traps focus with Tab key (last to first)', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>,
      )
      const closeBtn = screen.getByLabelText('Close dialog')
      closeBtn.focus()
      // Tab from last focusable should wrap to first
      fireEvent.keyDown(document, { key: 'Tab' })
      // Focus should remain on close button (only focusable element)
      expect(document.activeElement).toBe(closeBtn)
    })

    it('traps focus with Shift+Tab (first to last)', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>,
      )
      const closeBtn = screen.getByLabelText('Close dialog')
      closeBtn.focus()
      fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
      expect(document.activeElement).toBe(closeBtn)
    })
  })
})
