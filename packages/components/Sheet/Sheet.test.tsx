import React from 'react'
import { render } from '../../../src/__test-utils__/render'
import { Sheet } from './Sheet'

describe('Sheet', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Sheet.Root>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Content
          </Sheet.Frame>
        </Sheet.Root>
      )
    ).not.toThrow()
  })

  it('renders with open prop', () => {
    expect(() =>
      render(
        <Sheet.Root open onOpenChange={() => {}}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Sheet content
          </Sheet.Frame>
        </Sheet.Root>
      )
    ).not.toThrow()
  })

  it('renders with snap points', () => {
    expect(() =>
      render(
        <Sheet.Root snapPoints={[50, 100]}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            Snapping sheet
          </Sheet.Frame>
        </Sheet.Root>
      )
    ).not.toThrow()
  })

  it('renders ScrollView inside Frame', () => {
    expect(() =>
      render(
        <Sheet.Root>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            <Sheet.ScrollView>
              Long scrollable content
            </Sheet.ScrollView>
          </Sheet.Frame>
        </Sheet.Root>
      )
    ).not.toThrow()
  })
})
