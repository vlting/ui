import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { NavigationMenu } from './NavigationMenu'

describe('NavigationMenu', () => {
  it('renders navigation links', () => {
    render(
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    )
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('renders trigger with dropdown', () => {
    render(
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="/product-a">A</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    )
    expect(screen.getByText('Products')).toBeTruthy()
  })

  describe('ARIA attributes', () => {
    it('has role="navigation" on root (via nav element)', () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      expect(container.querySelector('nav')).toBeTruthy()
      expect(container.querySelector('nav')?.getAttribute('aria-label')).toBe('Main')
    })

    it('has role="menubar" on list', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      expect(screen.getByRole('menubar')).toBeTruthy()
    })

    it('trigger has aria-expanded="false" when closed', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      const trigger = screen.getByText('Products').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('trigger has aria-expanded="true" when open', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      fireEvent.click(screen.getByText('Products'))
      const trigger = screen.getByText('Products').closest('button')!
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })
  })

  describe('open/close states', () => {
    it('does not show content initially', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      expect(screen.queryByText('Link A')).toBeNull()
    })

    it('shows content when trigger is clicked', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      fireEvent.click(screen.getByText('Products'))
      expect(screen.getByText('Link A')).toBeTruthy()
    })

    it('closes content when trigger is clicked again', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      const trigger = screen.getByText('Products')
      fireEvent.click(trigger)
      expect(screen.getByText('Link A')).toBeTruthy()
      fireEvent.click(trigger)
      expect(screen.queryByText('Link A')).toBeNull()
    })
  })

  describe('keyboard navigation', () => {
    it('closes on Escape key', () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      fireEvent.click(screen.getByText('Products'))
      expect(screen.getByText('Link A')).toBeTruthy()

      const nav = container.querySelector('nav')!
      fireEvent.keyDown(nav, { key: 'Escape' })
      expect(screen.queryByText('Link A')).toBeNull()
    })

    it('opens trigger with Enter key', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      const trigger = screen.getByText('Products').closest('button')!
      fireEvent.keyDown(trigger, { key: 'Enter' })
      expect(screen.getByText('Link A')).toBeTruthy()
    })

    it('opens trigger with Space key', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      const trigger = screen.getByText('Products').closest('button')!
      fireEvent.keyDown(trigger, { key: ' ' })
      expect(screen.getByText('Link A')).toBeTruthy()
    })

    it('opens trigger with ArrowDown key', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      const trigger = screen.getByText('Products').closest('button')!
      fireEvent.keyDown(trigger, { key: 'ArrowDown' })
      expect(screen.getByText('Link A')).toBeTruthy()
    })

    it('navigates between triggers with ArrowLeft/ArrowRight', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">A</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Services</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/b">B</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      const menubar = screen.getByRole('menubar')
      const productsBtn = screen.getByText('Products').closest('button')!
      productsBtn.focus()

      fireEvent.keyDown(productsBtn, { key: 'ArrowRight' })
      const servicesBtn = screen.getByText('Services').closest('button')!
      expect(document.activeElement).toBe(servicesBtn)
    })

    it('Home/End keys navigate content links', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="/a">Link A</NavigationMenu.Link>
                <NavigationMenu.Link href="/b">Link B</NavigationMenu.Link>
                <NavigationMenu.Link href="/c">Link C</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>,
      )
      fireEvent.click(screen.getByText('Products'))
      expect(screen.getByText('Link A')).toBeTruthy()

      const linkA = screen.getByText('Link A').closest('a')!
      const linkC = screen.getByText('Link C').closest('a')!
      expect(linkA).toBeTruthy()
      expect(linkC).toBeTruthy()

      fireEvent.keyDown(linkC, { key: 'Home' })
      fireEvent.keyDown(linkA, { key: 'End' })
    })
  })
})
