import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { ContextMenu } from './ContextMenu'

describe('ContextMenu', () => {
  it('renders trigger area', () => {
    render(
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div>Right click here</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>,
    )
    expect(screen.getByText('Right click here')).toBeTruthy()
  })

  it('renders without errors with all sub-components', () => {
    render(
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div>Trigger</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Label>Actions</ContextMenu.Label>
          <ContextMenu.Item>Cut</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.CheckboxItem checked={true} onCheckedChange={() => {}}>
            Bold
          </ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu.Root>,
    )
    expect(screen.getByText('Trigger')).toBeTruthy()
  })

  describe('open/close states', () => {
    it('does not show menu initially', () => {
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('shows menu on contextmenu event (right click)', () => {
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Right click</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Right click'))
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('closes when clicking outside', () => {
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Area'))
      expect(screen.getByRole('menu')).toBeTruthy()

      // Click the overlay backdrop to close
      const overlay = document.querySelector('[style*="position: fixed"]')
      if (overlay) fireEvent.click(overlay)
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('calls onOpenChange when opened', () => {
      const onOpenChange = jest.fn()
      render(
        <ContextMenu.Root onOpenChange={onOpenChange}>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Area'))
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('ARIA attributes', () => {
    it('has role="menu" on content when open', () => {
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Area'))
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('items have role="menuitem"', () => {
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Cut</ContextMenu.Item>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Area'))
      const items = screen.getAllByRole('menuitem')
      expect(items).toHaveLength(2)
    })

    it('checkbox items have role="menuitemcheckbox" with aria-checked', () => {
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.CheckboxItem checked={true} onCheckedChange={() => {}}>
              Bold
            </ContextMenu.CheckboxItem>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Area'))
      const checkbox = screen.getByRole('menuitemcheckbox')
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    })

    it('disabled items have aria-disabled', () => {
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item disabled>Paste</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Area'))
      const item = screen.getByRole('menuitem')
      expect(item.getAttribute('aria-disabled')).toBe('true')
    })
  })

  describe('keyboard navigation', () => {
    it('clicking an item closes the menu', () => {
      const onSelect = jest.fn()
      render(
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div>Area</div>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item onSelect={onSelect}>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      )
      fireEvent.contextMenu(screen.getByText('Area'))
      fireEvent.click(screen.getByRole('menuitem'))
      expect(onSelect).toHaveBeenCalled()
      expect(screen.queryByRole('menu')).toBeNull()
    })
  })
})
