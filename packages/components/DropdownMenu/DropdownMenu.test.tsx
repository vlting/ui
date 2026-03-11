import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { DropdownMenu } from './DropdownMenu'

describe('DropdownMenu', () => {
  it('renders trigger', () => {
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Option 1</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>,
    )
    expect(screen.getByText('Menu')).toBeTruthy()
  })

  it('renders with all sub-components', () => {
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Actions</DropdownMenu.Label>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem checked={false} onCheckedChange={() => {}}>
            Visible
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>,
    )
    expect(screen.getByText('Menu')).toBeTruthy()
  })

  describe('open/close states', () => {
    it('does not render content when closed', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('renders content when open', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('opens when trigger is clicked', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      fireEvent.click(screen.getByText('Menu'))
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('closes when trigger is clicked again', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu')
      fireEvent.click(trigger)
      expect(screen.getByRole('menu')).toBeTruthy()
      fireEvent.click(trigger)
      expect(screen.queryByRole('menu')).toBeNull()
    })
  })

  describe('ARIA attributes', () => {
    it('has role="menu" on content', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('has aria-haspopup="menu" on trigger', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu').closest('button')!
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    })

    it('has aria-expanded="false" on trigger when closed', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('has aria-expanded="true" on trigger when open', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('items have role="menuitem"', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Edit</DropdownMenu.Item>
            <DropdownMenu.Item>Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const items = screen.getAllByRole('menuitem')
      expect(items).toHaveLength(2)
    })

    it('checkbox items have role="menuitemcheckbox"', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.CheckboxItem checked={true} onCheckedChange={() => {}}>
              Bold
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const checkbox = screen.getByRole('menuitemcheckbox')
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    })

    it('disabled items have aria-disabled', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item disabled>Disabled</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const item = screen.getByRole('menuitem')
      expect(item.getAttribute('aria-disabled')).toBe('true')
    })
  })

  describe('keyboard navigation', () => {
    it('opens with ArrowDown key on trigger', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu').closest('button')!
      fireEvent.keyDown(trigger, { key: 'ArrowDown' })
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('opens with Enter key on trigger', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu').closest('button')!
      fireEvent.keyDown(trigger, { key: 'Enter' })
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('opens with Space key on trigger', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu').closest('button')!
      fireEvent.keyDown(trigger, { key: ' ' })
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('closes with Escape key', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      fireEvent.click(screen.getByText('Menu'))
      expect(screen.getByRole('menu')).toBeTruthy()

      const menu = screen.getByRole('menu')
      fireEvent.keyDown(menu, { key: 'Escape' })
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('navigates items with ArrowDown/ArrowUp', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>First</DropdownMenu.Item>
            <DropdownMenu.Item>Second</DropdownMenu.Item>
            <DropdownMenu.Item>Third</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const menu = screen.getByRole('menu')
      const items = screen.getAllByRole('menuitem')

      // First item should be focused on open
      expect(document.activeElement).toBe(items[0])

      // ArrowDown moves to next
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(items[1])

      // ArrowDown again
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(items[2])

      // ArrowDown wraps to first
      fireEvent.keyDown(menu, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(items[0])

      // ArrowUp wraps to last
      fireEvent.keyDown(menu, { key: 'ArrowUp' })
      expect(document.activeElement).toBe(items[2])
    })

    it('Home key moves focus to first item', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>First</DropdownMenu.Item>
            <DropdownMenu.Item>Second</DropdownMenu.Item>
            <DropdownMenu.Item>Third</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const menu = screen.getByRole('menu')
      const items = screen.getAllByRole('menuitem')

      // Move to last
      fireEvent.keyDown(menu, { key: 'End' })
      expect(document.activeElement).toBe(items[2])

      // Home goes to first
      fireEvent.keyDown(menu, { key: 'Home' })
      expect(document.activeElement).toBe(items[0])
    })

    it('End key moves focus to last item', () => {
      render(
        <DropdownMenu.Root open>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>First</DropdownMenu.Item>
            <DropdownMenu.Item>Second</DropdownMenu.Item>
            <DropdownMenu.Item>Third</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const menu = screen.getByRole('menu')
      const items = screen.getAllByRole('menuitem')

      fireEvent.keyDown(menu, { key: 'End' })
      expect(document.activeElement).toBe(items[2])
    })

    it('Enter key selects item and closes menu', () => {
      const onSelect = jest.fn()
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={onSelect}>Action</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      fireEvent.click(screen.getByText('Menu'))
      const item = screen.getByRole('menuitem')
      fireEvent.keyDown(item, { key: 'Enter' })
      expect(onSelect).toHaveBeenCalled()
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('returns focus to trigger on close', () => {
      render(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      )
      const trigger = screen.getByText('Menu').closest('button')!
      fireEvent.click(trigger)
      expect(screen.getByRole('menu')).toBeTruthy()

      const menu = screen.getByRole('menu')
      fireEvent.keyDown(menu, { key: 'Escape' })
      expect(document.activeElement).toBe(trigger)
    })
  })
})
