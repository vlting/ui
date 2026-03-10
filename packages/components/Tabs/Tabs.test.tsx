import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      ),
    ).not.toThrow()
  })

  it('renders size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Tabs.Root defaultValue="t1">
          <Tabs.List size={size}>
            <Tabs.Trigger value="t1" size={size}>
              T1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="t1">C1</Tabs.Content>
        </Tabs.Root>,
      )
      unmount()
    }
  })

  it('renders with controlled value', () => {
    expect(() =>
      render(
        <Tabs.Root value="x">
          <Tabs.List>
            <Tabs.Trigger value="x">X</Tabs.Trigger>
            <Tabs.Trigger value="y">Y</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="x">Content X</Tabs.Content>
          <Tabs.Content value="y">Content Y</Tabs.Content>
        </Tabs.Root>,
      ),
    ).not.toThrow()
  })

  it('renders vertical orientation', () => {
    expect(() =>
      render(
        <Tabs.Root defaultValue="v1" orientation="vertical">
          <Tabs.List>
            <Tabs.Trigger value="v1">V1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="v1">Vertical</Tabs.Content>
        </Tabs.Root>,
      ),
    ).not.toThrow()
  })

  describe('ARIA attributes', () => {
    it('has role="tablist" on list', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Content A</Tabs.Content>
        </Tabs.Root>,
      )
      expect(screen.getByRole('tablist')).toBeTruthy()
    })

    it('has role="tab" on triggers', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">CA</Tabs.Content>
          <Tabs.Content value="b">CB</Tabs.Content>
        </Tabs.Root>,
      )
      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(2)
    })

    it('has role="tabpanel" on active content', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Panel A</Tabs.Content>
        </Tabs.Root>,
      )
      expect(screen.getByRole('tabpanel')).toBeTruthy()
    })

    it('sets aria-selected="true" on active tab', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">CA</Tabs.Content>
          <Tabs.Content value="b">CB</Tabs.Content>
        </Tabs.Root>,
      )
      const tabs = screen.getAllByRole('tab')
      expect(tabs[0].getAttribute('aria-selected')).toBe('true')
      expect(tabs[1].getAttribute('aria-selected')).toBe('false')
    })

    it('sets tabIndex=0 on selected tab and -1 on others', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">CA</Tabs.Content>
          <Tabs.Content value="b">CB</Tabs.Content>
        </Tabs.Root>,
      )
      const tabs = screen.getAllByRole('tab')
      expect(tabs[0].getAttribute('tabindex')).toBe('0')
      expect(tabs[1].getAttribute('tabindex')).toBe('-1')
    })

    it('links tab to panel via aria-controls', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">CA</Tabs.Content>
        </Tabs.Root>,
      )
      const tab = screen.getByRole('tab')
      const panel = screen.getByRole('tabpanel')
      expect(tab.getAttribute('aria-controls')).toBe(panel.id)
    })

    it('links panel to tab via aria-labelledby', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">CA</Tabs.Content>
        </Tabs.Root>,
      )
      const tab = screen.getByRole('tab')
      const panel = screen.getByRole('tabpanel')
      expect(panel.getAttribute('aria-labelledby')).toBe(tab.id)
    })
  })

  describe('tab selection', () => {
    it('shows correct content on tab click', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Content A</Tabs.Content>
          <Tabs.Content value="b">Content B</Tabs.Content>
        </Tabs.Root>,
      )
      expect(screen.getByText('Content A')).toBeTruthy()
      expect(screen.queryByText('Content B')).toBeNull()

      fireEvent.click(screen.getByText('B'))
      expect(screen.queryByText('Content A')).toBeNull()
      expect(screen.getByText('Content B')).toBeTruthy()
    })

    it('updates aria-selected when switching tabs', () => {
      render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">CA</Tabs.Content>
          <Tabs.Content value="b">CB</Tabs.Content>
        </Tabs.Root>,
      )
      const tabs = screen.getAllByRole('tab')
      fireEvent.click(tabs[1])
      expect(tabs[0].getAttribute('aria-selected')).toBe('false')
      expect(tabs[1].getAttribute('aria-selected')).toBe('true')
    })

    it('calls onValueChange when tab is clicked', () => {
      const onValueChange = jest.fn()
      render(
        <Tabs.Root defaultValue="a" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">CA</Tabs.Content>
          <Tabs.Content value="b">CB</Tabs.Content>
        </Tabs.Root>,
      )
      fireEvent.click(screen.getByText('B'))
      expect(onValueChange).toHaveBeenCalledWith('b')
    })
  })
})
