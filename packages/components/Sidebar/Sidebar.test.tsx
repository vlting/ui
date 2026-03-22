import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders as aside element', () => {
    const { container } = render(
      <Sidebar.Root>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>Item 1</Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    expect(container.querySelector('aside')).toBeTruthy()
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

  it('menu item supports active state', () => {
    render(
      <Sidebar.Root>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem active>Active</Sidebar.MenuItem>
            <Sidebar.MenuItem>Inactive</Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    expect(screen.getByText('Active')).toBeTruthy()
    expect(screen.getByText('Inactive')).toBeTruthy()
  })

  it('renders separator', () => {
    const { container } = render(
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
    )
    expect(container.querySelector('hr')).toBeTruthy()
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

  it('trigger toggles collapsed state', () => {
    const onChange = jest.fn()
    render(
      <Sidebar.Root defaultCollapsed={false} onCollapsedChange={onChange}>
        <Sidebar.Header>
          <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>Item</Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    fireEvent.click(screen.getByLabelText('Collapse sidebar'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('trigger label reflects collapsed state', () => {
    render(
      <Sidebar.Root defaultCollapsed>
        <Sidebar.Header>
          <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>Item</Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    expect(screen.getByLabelText('Expand sidebar')).toBeTruthy()
  })

  it('renders multiple groups', () => {
    render(
      <Sidebar.Root>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Main</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Home</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Admin</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Users</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>,
    )
    expect(screen.getByText('Main')).toBeTruthy()
    expect(screen.getByText('Admin')).toBeTruthy()
    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Users')).toBeTruthy()
  })
})
