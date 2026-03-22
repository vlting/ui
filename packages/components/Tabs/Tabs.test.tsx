import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('renders tabs with triggers', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )
    expect(screen.getByText('Tab A')).toBeTruthy()
    expect(screen.getByText('Tab B')).toBeTruthy()
  })

  it('shows active content and hides inactive', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )
    expect(screen.getByText('Content A')).toBeTruthy()
    expect(screen.queryByText('Content B')).toBeNull()
  })

  it('switches tabs on click', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )
    fireEvent.click(screen.getByText('Tab B'))
    expect(screen.queryByText('Content A')).toBeNull()
    expect(screen.getByText('Content B')).toBeTruthy()
  })

  it('supports controlled value', () => {
    const onChange = jest.fn()
    render(
      <Tabs.Root value="a" onValueChange={onChange}>
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )
    fireEvent.click(screen.getByText('Tab B'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('sets aria-selected on active trigger', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs.Root>,
    )
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0].getAttribute('aria-selected')).toBe('true')
    expect(tabs[1].getAttribute('aria-selected')).toBe('false')
  })

  it('trigger has role=tab and content has role=tabpanel', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs.Root>,
    )
    expect(screen.getByRole('tab')).toBeTruthy()
    expect(screen.getByRole('tabpanel')).toBeTruthy()
  })

  it('tablist has role=tablist', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs.Root>,
    )
    expect(screen.getByRole('tablist')).toBeTruthy()
  })

  it('aria-controls on trigger points to panel id', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs.Root>,
    )
    const trigger = screen.getByRole('tab')
    const panel = screen.getByRole('tabpanel')
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id)
  })

  it('panel aria-labelledby points to trigger id', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs.Root>,
    )
    const trigger = screen.getByRole('tab')
    const panel = screen.getByRole('tabpanel')
    expect(panel.getAttribute('aria-labelledby')).toBe(trigger.id)
  })

  it('disabled trigger does not activate on click', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b" disabled>Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )
    fireEvent.click(screen.getByText('Tab B'))
    expect(screen.getByText('Content A')).toBeTruthy()
    expect(screen.queryByText('Content B')).toBeNull()
  })

  it('supports keyboard navigation with ArrowRight', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )
    const triggerA = screen.getByText('Tab A').closest('button')!
    triggerA.focus()
    fireEvent.keyDown(triggerA, { key: 'ArrowRight' })
    expect(screen.getByText('Content B')).toBeTruthy()
  })

  it('supports Home and End keys', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
          <Tabs.Trigger value="c">Tab C</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
        <Tabs.Content value="c">Content C</Tabs.Content>
      </Tabs.Root>,
    )
    const triggerA = screen.getByText('Tab A').closest('button')!
    triggerA.focus()
    fireEvent.keyDown(triggerA, { key: 'End' })
    expect(screen.getByText('Content C')).toBeTruthy()
  })

  it('renders vertical orientation', () => {
    render(
      <Tabs.Root defaultValue="a" orientation="vertical">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs.Root>,
    )
    const tablist = screen.getByRole('tablist')
    expect(tablist.getAttribute('aria-orientation')).toBe('vertical')
  })
})
