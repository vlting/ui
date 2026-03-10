import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Menubar } from './Menubar'

describe('Menubar', () => {
  it('renders menu triggers', () => {
    render(
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    )
    expect(screen.getByText('File')).toBeTruthy()
  })

  it('renders multiple menus', () => {
    render(
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>Undo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    )
    expect(screen.getByText('File')).toBeTruthy()
    expect(screen.getByText('Edit')).toBeTruthy()
  })

  describe('ARIA attributes', () => {
    it('has role="menubar" on root', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      expect(screen.getByRole('menubar')).toBeTruthy()
    })

    it('trigger has aria-haspopup="menu"', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      const trigger = screen.getByText('File').closest('button')!
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    })

    it('trigger has aria-expanded="false" when closed', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      const trigger = screen.getByText('File').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('trigger has aria-expanded="true" when open', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      fireEvent.click(screen.getByText('File'))
      const trigger = screen.getByText('File').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('content has role="menu" when open', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      fireEvent.click(screen.getByText('File'))
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('items have role="menuitem"', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
              <Menubar.Item>Open</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      fireEvent.click(screen.getByText('File'))
      // Trigger also has role="menuitem", so filter to content items
      const items = screen.getAllByRole('menuitem')
      // At least 2 content items + 1 trigger
      expect(items.length).toBeGreaterThanOrEqual(3)
    })

    it('disabled items have aria-disabled', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item disabled>Disabled Action</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      fireEvent.click(screen.getByText('File'))
      const items = screen.getAllByRole('menuitem')
      const disabledItem = items.find((i) => i.getAttribute('aria-disabled') === 'true')
      expect(disabledItem).toBeTruthy()
    })
  })

  describe('open/close states', () => {
    it('does not render content when closed', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('opens content when trigger is clicked', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      fireEvent.click(screen.getByText('File'))
      expect(screen.getByRole('menu')).toBeTruthy()
      expect(screen.getByText('New')).toBeTruthy()
    })

    it('closes when trigger is clicked again', () => {
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      const trigger = screen.getByText('File')
      fireEvent.click(trigger)
      expect(screen.getByRole('menu')).toBeTruthy()
      fireEvent.click(trigger)
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('closes when item is clicked', () => {
      const onSelect = jest.fn()
      render(
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item onSelect={onSelect}>New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>,
      )
      fireEvent.click(screen.getByText('File'))
      fireEvent.click(screen.getByText('New'))
      expect(onSelect).toHaveBeenCalled()
      expect(screen.queryByRole('menu')).toBeNull()
    })
  })
})
