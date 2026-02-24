import React from 'react'
import { render } from '../../../src/__test-utils__/render'
import { Tabs } from './Tabs'

// Tamagui Tabs uses ResizeObserver internally
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
})

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
        </Tabs.Root>
      )
    ).not.toThrow()
  })

  it('renders size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Tabs.Root defaultValue="t1">
          <Tabs.List size={size}>
            <Tabs.Trigger value="t1" size={size}>T1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="t1">C1</Tabs.Content>
        </Tabs.Root>
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
        </Tabs.Root>
      )
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
        </Tabs.Root>
      )
    ).not.toThrow()
  })
})
