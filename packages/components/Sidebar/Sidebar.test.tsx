import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Sidebar.Root>
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>Item 1</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>
        </Sidebar.Root>,
      ),
    ).not.toThrow()
  })

  it('renders menu items', () => {
    render(
      <Sidebar.Root>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>Dashboard</Sidebar.MenuItem>
            <Sidebar.MenuItem>Settings</Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    expect(screen.getByText('Dashboard')).toBeTruthy()
    expect(screen.getByText('Settings')).toBeTruthy()
  })

  it('renders header and footer', () => {
    render(
      <Sidebar.Root>
        <Sidebar.Header>App Name</Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>Home</Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
        <Sidebar.Footer>Footer</Sidebar.Footer>
      </Sidebar.Root>,
    )
    expect(screen.getByText('App Name')).toBeTruthy()
    expect(screen.getByText('Footer')).toBeTruthy()
  })

  it('renders groups with labels', () => {
    render(
      <Sidebar.Root>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Section</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Link</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    expect(screen.getByText('Section')).toBeTruthy()
  })

  it('renders with side prop', () => {
    expect(() =>
      render(
        <Sidebar.Root side="right">
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>Item</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>
        </Sidebar.Root>,
      ),
    ).not.toThrow()
  })

  it('renders collapsible variants', () => {
    const modes = ['offcanvas', 'icon', 'none'] as const
    for (const collapsible of modes) {
      const { unmount } = render(
        <Sidebar.Root collapsible={collapsible}>
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>Item</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>
        </Sidebar.Root>,
      )
      unmount()
    }
  })

  it('renders separator', () => {
    expect(() =>
      render(
        <Sidebar.Root>
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>A</Sidebar.MenuItem>
            </Sidebar.Menu>
            <Sidebar.Separator />
            <Sidebar.Menu>
              <Sidebar.MenuItem>B</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>
        </Sidebar.Root>,
      ),
    ).not.toThrow()
  })

  it('renders menu button', () => {
    render(
      <Sidebar.Root>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuButton>Click me</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    expect(screen.getByText('Click me')).toBeTruthy()
  })
})
