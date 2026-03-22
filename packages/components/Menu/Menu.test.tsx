import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Menu } from './Menu'

describe('Menu', () => {
  it('renders trigger', () => {
    render(
      <Menu.Root>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Item</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    )
    expect(screen.getByText('Open')).toBeTruthy()
  })

  it('does not render content when closed', () => {
    render(
      <Menu.Root>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Item</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    )
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('opens content on trigger click', () => {
    render(
      <Menu.Root>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Item</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    )
    fireEvent.click(screen.getByText('Open'))
    expect(screen.getByRole('menu')).toBeTruthy()
  })

  it('closes on trigger click again', () => {
    render(
      <Menu.Root>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Item</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    )
    const trigger = screen.getByText('Open')
    fireEvent.click(trigger)
    expect(screen.getByRole('menu')).toBeTruthy()
    fireEvent.click(trigger)
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('renders content when open prop is true', () => {
    render(
      <Menu.Root open>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Item</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    )
    expect(screen.getByRole('menu')).toBeTruthy()
  })

  describe('ARIA', () => {
    it('trigger has aria-haspopup="menu"', () => {
      render(
        <Menu.Root>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      const trigger = screen.getByText('Open').closest('button')!
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    })

    it('trigger has aria-expanded="false" when closed', () => {
      render(
        <Menu.Root>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      const trigger = screen.getByText('Open').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('content has role="menu"', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('items have role="menuitem"', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>A</Menu.Item>
            <Menu.Item>B</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      expect(screen.getAllByRole('menuitem')).toHaveLength(2)
    })

    it('checkbox items have role="menuitemcheckbox"', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.CheckboxItem checked={true} onCheckedChange={() => {}}>Bold</Menu.CheckboxItem>
          </Menu.Content>
        </Menu.Root>,
      )
      const checkbox = screen.getByRole('menuitemcheckbox')
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    })

    it('radio items have role="menuitemradio"', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.RadioGroup value="a" onValueChange={() => {}}>
              <Menu.RadioItem value="a">A</Menu.RadioItem>
              <Menu.RadioItem value="b">B</Menu.RadioItem>
            </Menu.RadioGroup>
          </Menu.Content>
        </Menu.Root>,
      )
      const radios = screen.getAllByRole('menuitemradio')
      expect(radios).toHaveLength(2)
      expect(radios[0].getAttribute('aria-checked')).toBe('true')
      expect(radios[1].getAttribute('aria-checked')).toBe('false')
    })

    it('disabled items have aria-disabled', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item disabled>Disabled</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      const item = screen.getByRole('menuitem')
      expect(item.getAttribute('aria-disabled')).toBe('true')
    })

    it('separator has role="separator"', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>A</Menu.Item>
            <Menu.Separator />
            <Menu.Item>B</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      expect(screen.getByRole('separator')).toBeTruthy()
    })
  })

  describe('keyboard', () => {
    it('opens with ArrowDown on trigger', () => {
      render(
        <Menu.Root>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      const trigger = screen.getByText('Open').closest('button')!
      fireEvent.keyDown(trigger, { key: 'ArrowDown' })
      expect(screen.getByRole('menu')).toBeTruthy()
    })

    it('closes with Escape', () => {
      render(
        <Menu.Root>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      fireEvent.click(screen.getByText('Open'))
      expect(screen.getByRole('menu')).toBeTruthy()
      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
      expect(screen.queryByRole('menu')).toBeNull()
    })

    it('item click fires onSelect and closes', () => {
      const onSelect = jest.fn()
      render(
        <Menu.Root>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={onSelect}>Action</Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      fireEvent.click(screen.getByText('Open'))
      fireEvent.click(screen.getByRole('menuitem'))
      expect(onSelect).toHaveBeenCalled()
      expect(screen.queryByRole('menu')).toBeNull()
    })
  })

  describe('groups and labels', () => {
    it('renders groups and labels', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Group>
              <Menu.Label>Section</Menu.Label>
              <Menu.Item>A</Menu.Item>
            </Menu.Group>
          </Menu.Content>
        </Menu.Root>,
      )
      expect(screen.getByText('Section')).toBeTruthy()
      expect(screen.getByRole('group')).toBeTruthy()
    })
  })

  describe('shortcut', () => {
    it('renders shortcut text', () => {
      render(
        <Menu.Root open>
          <Menu.Trigger>Open</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Cut <Menu.Shortcut>Cmd+X</Menu.Shortcut></Menu.Item>
          </Menu.Content>
        </Menu.Root>,
      )
      expect(screen.getByText('Cmd+X')).toBeTruthy()
    })
  })
})
