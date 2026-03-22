import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sheet } from './Sheet'

describe('Sheet', () => {
  it('renders trigger', () => {
    render(
      <Sheet.Root>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Title>Title</Sheet.Title>
        </Sheet.Content>
      </Sheet.Root>,
    )
    expect(screen.getByText('Open Sheet')).toBeTruthy()
  })

  it('content hidden by default', () => {
    render(
      <Sheet.Root>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Title>Sheet Title</Sheet.Title>
        </Sheet.Content>
      </Sheet.Root>,
    )
    expect(screen.queryByText('Sheet Title')).toBeNull()
  })

  it('click trigger opens content', () => {
    render(
      <Sheet.Root>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Title>Sheet Title</Sheet.Title>
        </Sheet.Content>
      </Sheet.Root>,
    )
    expect(screen.queryByText('Sheet Title')).toBeNull()
    fireEvent.click(screen.getByText('Open'))
    expect(screen.getByText('Sheet Title')).toBeTruthy()
  })

  it('renders content when open prop is true', () => {
    render(
      <Sheet.Root open>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Title>Sheet Title</Sheet.Title>
          <Sheet.Description>Description text</Sheet.Description>
        </Sheet.Content>
      </Sheet.Root>,
    )
    expect(screen.getByText('Sheet Title')).toBeTruthy()
    expect(screen.getByText('Description text')).toBeTruthy()
  })

  it('calls onOpenChange when opened', () => {
    const onOpenChange = jest.fn()
    render(
      <Sheet.Root onOpenChange={onOpenChange}>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Title>Title</Sheet.Title>
        </Sheet.Content>
      </Sheet.Root>,
    )
    fireEvent.click(screen.getByText('Open'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  describe('closing', () => {
    it('closes on Escape key', () => {
      render(
        <Sheet.Root defaultOpen>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Title</Sheet.Title>
          </Sheet.Content>
        </Sheet.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('closes on overlay click', () => {
      render(
        <Sheet.Root defaultOpen>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Title</Sheet.Title>
          </Sheet.Content>
        </Sheet.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
      const overlay = screen.getByRole('dialog').previousElementSibling!
      fireEvent.click(overlay)
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  describe('ARIA attributes', () => {
    it('has role="dialog" on content', () => {
      render(
        <Sheet.Root open>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Title</Sheet.Title>
          </Sheet.Content>
        </Sheet.Root>,
      )
      expect(screen.getByRole('dialog')).toBeTruthy()
    })

    it('has aria-modal="true" on content', () => {
      render(
        <Sheet.Root open>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Title</Sheet.Title>
          </Sheet.Content>
        </Sheet.Root>,
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog.getAttribute('aria-modal')).toBe('true')
    })

    it('has aria-labelledby pointing to title', () => {
      render(
        <Sheet.Root open>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>My Title</Sheet.Title>
          </Sheet.Content>
        </Sheet.Root>,
      )
      const dialog = screen.getByRole('dialog')
      const labelledBy = dialog.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const titleEl = document.getElementById(labelledBy!)
      expect(titleEl?.textContent).toBe('My Title')
    })

    it('has aria-describedby pointing to description', () => {
      render(
        <Sheet.Root open>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Title</Sheet.Title>
            <Sheet.Description>Desc text</Sheet.Description>
          </Sheet.Content>
        </Sheet.Root>,
      )
      const dialog = screen.getByRole('dialog')
      const describedBy = dialog.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      const descEl = document.getElementById(describedBy!)
      expect(descEl?.textContent).toBe('Desc text')
    })
  })

  describe('focus management', () => {
    it('traps focus with Tab key', () => {
      render(
        <Sheet.Root open>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Title</Sheet.Title>
            <button>Action A</button>
            <button>Action B</button>
          </Sheet.Content>
        </Sheet.Root>,
      )
      const actionB = screen.getByText('Action B')
      actionB.focus()
      fireEvent.keyDown(actionB, { key: 'Tab' })
      expect(document.activeElement).toBe(screen.getByText('Action A'))
    })
  })

  describe('sub-components', () => {
    it('renders Handle with bar element', () => {
      render(
        <Sheet.Root open>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Handle data-testid="handle" />
            <Sheet.Title>Title</Sheet.Title>
          </Sheet.Content>
        </Sheet.Root>,
      )
      const handle = screen.getByTestId('handle')
      expect(handle).toBeTruthy()
      expect(handle.querySelector('[aria-hidden="true"]')).toBeTruthy()
    })

    it('renders Header and Footer', () => {
      render(
        <Sheet.Root open>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Header>
              <Sheet.Title>Title</Sheet.Title>
            </Sheet.Header>
            <Sheet.Footer>
              <button>Save</button>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet.Root>,
      )
      expect(screen.getByText('Title')).toBeTruthy()
      expect(screen.getByText('Save')).toBeTruthy()
    })
  })

  describe('data-state', () => {
    it('trigger reflects open/closed state', () => {
      render(
        <Sheet.Root>
          <Sheet.Trigger>Open</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Title</Sheet.Title>
          </Sheet.Content>
        </Sheet.Root>,
      )
      const trigger = screen.getByText('Open')
      expect(trigger.getAttribute('data-state')).toBe('closed')
      fireEvent.click(trigger)
      expect(trigger.getAttribute('data-state')).toBe('open')
    })
  })
})
