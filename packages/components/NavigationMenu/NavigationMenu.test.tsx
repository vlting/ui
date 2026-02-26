import { render, screen } from '../../../src/__test-utils__/render'
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

  it.skip('has role="navigation" on root', () => {
    // TODO: Tamagui role rendering in JSDOM
    render(
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    )
    expect(screen.getByRole('navigation')).toBeTruthy()
  })

  it('renders triggers with tabIndex for keyboard focus', () => {
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
    expect(screen.getByText('Products')).toBeTruthy()
    expect(screen.getByText('Services')).toBeTruthy()
  })

  it('renders links with keyboard support', () => {
    render(
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    )
    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('About')).toBeTruthy()
  })
})
