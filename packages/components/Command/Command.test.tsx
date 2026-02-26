import { render, screen } from '../../../src/__test-utils__/render'
import { Command } from './Command'

describe('Command', () => {
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
})
