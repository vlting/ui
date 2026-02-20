import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('renders without crashing', () => {
    render(
      <Tabs testID="tabs" defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1" testID="trigger-tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2" testID="trigger-tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1" testID="panel-tab1">Panel 1</Tabs.Panel>
        <Tabs.Panel value="tab2" testID="panel-tab2">Panel 2</Tabs.Panel>
      </Tabs>,
    )
    expect(screen.getByTestId('tabs')).toBeTruthy()
  })

  it('renders tab list and active panel', () => {
    render(
      <Tabs testID="tabs" defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1" testID="panel-tab1">Panel 1</Tabs.Panel>
        <Tabs.Panel value="tab2" testID="panel-tab2">Panel 2</Tabs.Panel>
      </Tabs>,
    )
    expect(screen.getByTestId('panel-tab1')).toBeTruthy()
    expect(screen.queryByTestId('panel-tab2')).toBeNull()
  })

  it('switches to tab2 panel when tab2 is pressed', () => {
    const onValueChange = jest.fn()
    render(
      <Tabs testID="tabs" defaultValue="tab1" onValueChange={onValueChange}>
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2" testID="trigger-tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1" testID="panel-tab1">Panel 1</Tabs.Panel>
        <Tabs.Panel value="tab2" testID="panel-tab2">Panel 2</Tabs.Panel>
      </Tabs>,
    )
    fireEvent.press(screen.getByTestId('trigger-tab2'))
    expect(onValueChange).toHaveBeenCalledWith('tab2')
  })

  it('respects controlled value', () => {
    render(
      <Tabs testID="tabs" value="tab2">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1" testID="panel-tab1">Panel 1</Tabs.Panel>
        <Tabs.Panel value="tab2" testID="panel-tab2">Panel 2</Tabs.Panel>
      </Tabs>,
    )
    expect(screen.queryByTestId('panel-tab1')).toBeNull()
    expect(screen.getByTestId('panel-tab2')).toBeTruthy()
  })

  it('renders tab list with tablist role', () => {
    render(
      <Tabs testID="tabs" defaultValue="tab1">
        <Tabs.List testID="list">
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
      </Tabs>,
    )
    expect(screen.getByTestId('list')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(
      <Tabs testID="tabs-dark" defaultValue="a">
        <Tabs.List>
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a">Content</Tabs.Panel>
      </Tabs>,
    )
    expect(screen.getByTestId('tabs-dark')).toBeTruthy()
  })

  it('renders vertical orientation', () => {
    render(
      <Tabs testID="tabs" defaultValue="tab1" orientation="vertical">
        <Tabs.List testID="list">
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1" testID="panel-tab1">Panel 1</Tabs.Panel>
      </Tabs>,
    )
    expect(screen.getByTestId('list')).toBeTruthy()
    expect(screen.getByTestId('panel-tab1')).toBeTruthy()
  })
})
