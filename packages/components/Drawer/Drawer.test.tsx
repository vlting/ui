import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders trigger', () => {
    render(
      <Drawer.Root>
        <Drawer.Trigger>Open Drawer</Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Title>Title</Drawer.Title>
        </Drawer.Content>
      </Drawer.Root>,
    )
    expect(screen.getByText('Open Drawer')).toBeTruthy()
  })

  it('content hidden by default', () => {
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

  it('click trigger opens content', () => {
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

  it('renders content when open prop is true', () => {
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

  it('calls onOpenChange when opened', () => {
    const onOpenChange = jest.fn()
    render(
      <Drawer.Root onOpenChange={onOpenChange}>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Title>Title</Drawer.Title>
        </Drawer.Content>
      </Drawer.Root>,
    )
    fireEvent.click(screen.getByText('Open'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders all direction variants without errors', () => {
    const directions = ['bottom', 'top', 'left', 'right'] as const
    for (const direction of directions) {
      const { unmount } = render(
        <Drawer.Root direction={direction} open>
          <Drawer.Content>
            <Drawer.Title>T</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
      unmount()
    }
  })

  describe('closing', () => {
    it('closes on Escape key', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('closes on overlay click', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
      const overlay = screen.getByRole('dialog').previousElementSibling!
      fireEvent.click(overlay)
      expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('closes when Close button is clicked', () => {
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

    it('Close button has aria-label', () => {
      render(
        <Drawer.Root open>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Close />
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.getByLabelText('Close drawer')).toBeTruthy()
    })
  })

  describe('focus management', () => {
    it('traps focus with Tab key', () => {
      render(
        <Drawer.Root open>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Close />
            <button>Action</button>
          </Drawer.Content>
        </Drawer.Root>,
      )
      const action = screen.getByText('Action')
      action.focus()
      fireEvent.keyDown(action, { key: 'Tab' })
      expect(document.activeElement).toBe(screen.getByLabelText('Close drawer'))
    })
  })

  describe('data-state', () => {
    it('trigger reflects open/closed state', () => {
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
          </Drawer.Content>
        </Drawer.Root>,
      )
      const trigger = screen.getByText('Open')
      expect(trigger.getAttribute('data-state')).toBe('closed')
      fireEvent.click(trigger)
      expect(trigger.getAttribute('data-state')).toBe('open')
    })
  })

  describe('sub-components', () => {
    it('renders Header and Footer', () => {
      render(
        <Drawer.Root open>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Footer>
              <button>Save</button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>,
      )
      expect(screen.getByText('Title')).toBeTruthy()
      expect(screen.getByText('Save')).toBeTruthy()
    })

    it('Close renders default X icon when no children', () => {
      render(
        <Drawer.Root open>
          <Drawer.Content>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Close />
          </Drawer.Content>
        </Drawer.Root>,
      )
      const closeBtn = screen.getByLabelText('Close drawer')
      expect(closeBtn.querySelector('svg')).toBeTruthy()
    })
  })
})
