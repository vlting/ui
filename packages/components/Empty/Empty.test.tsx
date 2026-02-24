import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Empty } from './Empty'

describe('Empty', () => {
  it('renders Root with role="status"', () => {
    render(
      <Empty.Root>
        <Empty.Title>No items</Empty.Title>
      </Empty.Root>,
    )
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('renders Title text', () => {
    render(
      <Empty.Root>
        <Empty.Title>Nothing here</Empty.Title>
      </Empty.Root>,
    )
    expect(screen.getByText('Nothing here')).toBeTruthy()
  })

  it('renders Title as h3', () => {
    const { container } = render(
      <Empty.Root>
        <Empty.Title>Heading</Empty.Title>
      </Empty.Root>,
    )
    const h3 = container.querySelector('h3')
    expect(h3).toBeTruthy()
    expect(h3?.textContent).toBe('Heading')
  })

  it('renders Description text', () => {
    render(
      <Empty.Root>
        <Empty.Description>Try adding some items to get started.</Empty.Description>
      </Empty.Root>,
    )
    expect(screen.getByText('Try adding some items to get started.')).toBeTruthy()
  })

  it('renders Media children', () => {
    render(
      <Empty.Root>
        <Empty.Media>
          <span data-testid="icon">icon</span>
        </Empty.Media>
      </Empty.Root>,
    )
    expect(screen.getByTestId('icon')).toBeTruthy()
  })

  it('renders Action children', () => {
    render(
      <Empty.Root>
        <Empty.Action>
          <button type="button">Add item</button>
        </Empty.Action>
      </Empty.Root>,
    )
    expect(screen.getByRole('button', { name: 'Add item' })).toBeTruthy()
  })

  it('renders full composition', () => {
    render(
      <Empty.Root>
        <Empty.Media>
          <span data-testid="illustration">img</span>
        </Empty.Media>
        <Empty.Title>No results found</Empty.Title>
        <Empty.Description>Try adjusting your search or filters.</Empty.Description>
        <Empty.Action>
          <button type="button">Clear filters</button>
        </Empty.Action>
      </Empty.Root>,
    )
    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.getByText('No results found')).toBeTruthy()
    expect(screen.getByText('Try adjusting your search or filters.')).toBeTruthy()
    expect(screen.getByTestId('illustration')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeTruthy()
  })
})
