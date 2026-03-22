import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
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

  it('renders as nav element', () => {
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
  })

  it('has role=menubar on list', () => {
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

  it('renders trigger with chevron', () => {
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
    expect(trigger.querySelector('svg')).toBeTruthy()
  })

  it('trigger has aria-expanded=false when closed', () => {
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

  it('trigger has aria-expanded=true when open', () => {
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

  it('link renders as anchor element', () => {
    render(
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/test">Test Link</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    )
    const link = screen.getByText('Test Link').closest('a')!
    expect(link.getAttribute('href')).toBe('/test')
  })

  it('shows content on hover', () => {
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
    const item = screen.getByText('Products').closest('li')!
    fireEvent.mouseEnter(item)
    expect(screen.getByText('Link A')).toBeTruthy()
  })
})
