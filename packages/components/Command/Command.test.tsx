import { act } from '@testing-library/react'
import { fireEvent, render, screen, waitFor } from '../../../src/__test-utils__/render'
import { Command } from './Command'

describe('Command', () => {
  // -- Rendering --

  it('renders input and list', () => {
    render(
      <Command.Root>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item>Item 1</Command.Item>
          <Command.Item>Item 2</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    expect(screen.getByPlaceholderText('Search...')).toBeTruthy()
    expect(screen.getByText('Item 1')).toBeTruthy()
  })

  it('renders groups with labels', () => {
    render(
      <Command.Root>
        <Command.Input placeholder="Search" />
        <Command.List>
          <Command.Group heading="Fruit">
            <Command.Item>Apple</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>,
    )
    expect(screen.getByText('Fruit')).toBeTruthy()
    expect(screen.getByText('Apple')).toBeTruthy()
  })

  it('renders empty state without crashing', () => {
    expect(() =>
      render(
        <Command.Root>
          <Command.Input placeholder="Search" />
          <Command.List>
            <Command.Empty>No results</Command.Empty>
          </Command.List>
        </Command.Root>,
      ),
    ).not.toThrow()
  })

  it('renders separator', () => {
    render(
      <Command.Root>
        <Command.List>
          <Command.Item>A</Command.Item>
          <Command.Separator />
          <Command.Item>B</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
  })

  // -- Search/filter --

  it('filters items by search text', () => {
    render(
      <Command.Root>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item>Apple</Command.Item>
          <Command.Item>Banana</Command.Item>
          <Command.Item>Cherry</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'ban' } })
    expect(screen.getByText('Banana')).toBeTruthy()
    expect(screen.queryByText('Apple')).toBeNull()
    expect(screen.queryByText('Cherry')).toBeNull()
  })

  it('shows all items when search is empty', () => {
    render(
      <Command.Root>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item>Apple</Command.Item>
          <Command.Item>Banana</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('Banana')).toBeTruthy()
  })

  it('accepts custom filter function', () => {
    const exactFilter = (label: string, search: string) => label === search
    render(
      <Command.Root filter={exactFilter}>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item>Apple</Command.Item>
          <Command.Item>Banana</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Apple' } })
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.queryByText('Banana')).toBeNull()
  })

  // -- Keyboard navigation --

  it('calls onSelect on item click', () => {
    const onSelect = jest.fn()
    render(
      <Command.Root>
        <Command.List>
          <Command.Item onSelect={onSelect}>Click me</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    fireEvent.click(screen.getByText('Click me'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('first item starts selected', () => {
    render(
      <Command.Root>
        <Command.List>
          <Command.Item>Apple</Command.Item>
          <Command.Item>Banana</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    const items = screen.getAllByRole('option')
    expect(items[0]).toHaveAttribute('aria-selected', 'true')
    expect(items[1]).toHaveAttribute('aria-selected', 'false')
  })

  it('disabled item is not selectable via click', () => {
    const onSelect = jest.fn()
    render(
      <Command.Root>
        <Command.List>
          <Command.Item disabled onSelect={onSelect}>No click</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    fireEvent.click(screen.getByText('No click'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  // -- Item selection --

  it('calls onSelect when item is clicked', () => {
    const onSelect = jest.fn()
    render(
      <Command.Root>
        <Command.List>
          <Command.Item onSelect={onSelect}>Click me</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    fireEvent.click(screen.getByText('Click me'))
    expect(onSelect).toHaveBeenCalled()
  })

  it('does not call onSelect for disabled items', () => {
    const onSelect = jest.fn()
    render(
      <Command.Root>
        <Command.List>
          <Command.Item disabled onSelect={onSelect}>Disabled</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    fireEvent.click(screen.getByText('Disabled'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  // -- List role --

  it('list has role=listbox', () => {
    render(
      <Command.Root>
        <Command.List>
          <Command.Item>A</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
  })

  it('items have role=option', () => {
    render(
      <Command.Root>
        <Command.List>
          <Command.Item>A</Command.Item>
        </Command.List>
      </Command.Root>,
    )
    expect(screen.getByRole('option')).toBeTruthy()
  })
})
