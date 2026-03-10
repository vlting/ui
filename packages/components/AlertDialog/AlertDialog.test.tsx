import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { AlertDialog } from './AlertDialog'

describe('AlertDialog', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
            <AlertDialog.Description>Are you sure?</AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>No</AlertDialog.Cancel>
              <AlertDialog.Action>Yes</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      ),
    ).not.toThrow()
  })

  describe('open/close states', () => {
    it('does not render content when closed', () => {
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      expect(screen.queryByText('Confirm')).toBeNull()
    })

    it('renders content when open', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
            <AlertDialog.Description>Are you sure?</AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      expect(screen.getByText('Confirm')).toBeTruthy()
      expect(screen.getByText('Are you sure?')).toBeTruthy()
    })

    it('opens when trigger is clicked', () => {
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      expect(screen.queryByText('Confirm Delete')).toBeNull()
      fireEvent.click(screen.getByText('Delete'))
      expect(screen.getByText('Confirm Delete')).toBeTruthy()
    })

    it('closes when Cancel is clicked', () => {
      render(
        <AlertDialog.Root defaultOpen>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>No</AlertDialog.Cancel>
              <AlertDialog.Action>Yes</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      expect(screen.getByText('Confirm')).toBeTruthy()
      fireEvent.click(screen.getByText('No'))
      expect(screen.queryByText('Confirm')).toBeNull()
    })

    it('closes when Action is clicked', () => {
      render(
        <AlertDialog.Root defaultOpen>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>No</AlertDialog.Cancel>
              <AlertDialog.Action>Yes</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      fireEvent.click(screen.getByText('Yes'))
      expect(screen.queryByText('Confirm')).toBeNull()
    })
  })

  describe('ARIA attributes', () => {
    it('has role="alertdialog" on content', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      expect(screen.getByRole('alertdialog')).toBeTruthy()
    })

    it('has aria-modal="true" on content', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      const dialog = screen.getByRole('alertdialog')
      expect(dialog.getAttribute('aria-modal')).toBe('true')
    })

    it('has aria-labelledby pointing to title', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Content>
            <AlertDialog.Title>Alert Title</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      const dialog = screen.getByRole('alertdialog')
      const labelledBy = dialog.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const titleEl = document.getElementById(labelledBy!)
      expect(titleEl?.textContent).toBe('Alert Title')
    })

    it('has aria-describedby pointing to description', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Content>
            <AlertDialog.Title>Title</AlertDialog.Title>
            <AlertDialog.Description>Alert description</AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      const dialog = screen.getByRole('alertdialog')
      const describedBy = dialog.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      const descEl = document.getElementById(describedBy!)
      expect(descEl?.textContent).toBe('Alert description')
    })
  })

  describe('keyboard navigation', () => {
    it('closes on Escape key', () => {
      render(
        <AlertDialog.Root defaultOpen>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      expect(screen.getByRole('alertdialog')).toBeTruthy()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('alertdialog')).toBeNull()
    })
  })

  describe('focus management', () => {
    it('traps focus with Tab key', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm</AlertDialog.Title>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>
                <button type="button">No</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <button type="button">Yes</button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>,
      )
      // The first focusable button should be focused
      const noBtn = screen.getByText('No')
      const yesBtn = screen.getByText('Yes')
      yesBtn.focus()
      // Tab from last should wrap to first
      fireEvent.keyDown(document, { key: 'Tab' })
      expect(document.activeElement).toBe(noBtn)
    })
  })
})
