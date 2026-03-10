import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open Drawer</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      ),
    ).not.toThrow()
  })

  it('renders all direction variants without errors', () => {
    const directions = ['bottom', 'top', 'left', 'right'] as const
    for (const direction of directions) {
      expect(() =>
        render(
          <Drawer.Root direction={direction}>
            <Drawer.Trigger>Open</Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Title>T</Drawer.Title>
            </Drawer.Content>
          </Drawer.Root>,
        ),
      ).not.toThrow()
    }
  })

  describe('open/close states', () => {
    it('does not render content when closed', () => {
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Hidden</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.queryByText('Hidden')).toBeNull()
    })

    it('renders content when open', () => {
      render(
        <Drawer.Root open>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Visible Drawer</Drawer.Title>
            <Drawer.Description>Drawer description</Drawer.Description>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.getByText('Visible Drawer')).toBeTruthy()
      expect(screen.getByText('Drawer description')).toBeTruthy()
    })

    it('opens when trigger is clicked', () => {
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Opened Drawer</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.queryByText('Opened Drawer')).toBeNull()
      fireEvent.click(screen.getByText('Open'))
      expect(screen.getByText('Opened Drawer')).toBeTruthy()
    })

    it('closes when Close is clicked', () => {
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Close>Close me</Drawer.Close>
          </Drawer.Content>
        </Drawer.Root>,
      )
      fireEvent.click(screen.getByText('Open'))
      expect(screen.getByText('Title')).toBeTruthy()
      fireEvent.click(screen.getByText('Close me'))
      expect(screen.queryByText('Title')).toBeNull()
    })
  })

  describe('ARIA attributes', () => {
    it('has role="dialog" on content', () => {
      render(
        <Drawer.Root open>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
    })

    it('has aria-modal="true" on content', () => {
      render(
        <Drawer.Root open>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.getAttribute('aria-modal')).toBe('true')
    })

    it('has aria-labelledby pointing to title', () => {
      render(
        <Drawer.Root open>
          <Drawer.Content>
            <Drawer.Title>Drawer Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      const dialog = screen.getByRole('dialog')
      const labelledBy = dialog.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const titleEl = document.getElementById(labelledBy!)
      expect(titleEl?.textContent).toBe('Drawer Title')
    })

    it('has aria-describedby pointing to description', () => {
      render(
        <Drawer.Root open>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Description>Drawer desc</Drawer.Description>
          </Drawer.Content>
        </Drawer.Root>,
      )
      const dialog = screen.getByRole('dialog')
      const describedBy = dialog.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      const descEl = document.getElementById(describedBy!)
      expect(descEl?.textContent).toBe('Drawer desc')
    })
  })

  describe('keyboard navigation', () => {
    it('closes on Escape key', () => {
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      fireEvent.click(screen.getByText('Open'))
      expect(screen.getByRole('dialog')).toBeTruthy()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })
})
