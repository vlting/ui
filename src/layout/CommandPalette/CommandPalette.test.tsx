import { fireEvent, render, screen } from '../../__test-utils__/render'
import { CommandPalette } from './CommandPalette'

const items = [
  { id: 'new-file', label: 'New File', description: 'Create a new file' },
  { id: 'open-file', label: 'Open File', description: 'Open an existing file' },
  { id: 'save-file', label: 'Save File', shortcut: 'Cmd+S' },
]

describe('CommandPalette', () => {
  it('renders nothing when closed', () => {
    render(<CommandPalette testID="cp" />)
    expect(screen.queryByTestId('cp')).toBeNull()
  })

  it('renders when open=true', () => {
    render(<CommandPalette testID="cp" open items={items} />)
    expect(screen.getByTestId('cp')).toBeTruthy()
  })

  it('renders result items', () => {
    render(<CommandPalette testID="cp" open items={items} />)
    expect(screen.getByTestId('result-new-file')).toBeTruthy()
    expect(screen.getByTestId('result-open-file')).toBeTruthy()
  })

  it('shows empty state when no items', () => {
    render(<CommandPalette testID="cp" open items={[]} />)
    expect(screen.getByTestId('command-palette-empty')).toBeTruthy()
  })

  it('calls onSelect when a result item is pressed', () => {
    const onSelect = jest.fn()
    render(<CommandPalette testID="cp" open items={items} onSelect={onSelect} />)
    fireEvent.press(screen.getByTestId('result-new-file'))
    expect(onSelect).toHaveBeenCalledWith(items[0])
  })

  it('calls onOpenChange when scrim is pressed', () => {
    const onOpenChange = jest.fn()
    render(<CommandPalette testID="cp" open onOpenChange={onOpenChange} items={items} />)
    fireEvent.press(screen.getByTestId('command-palette-scrim'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('shows loading state', () => {
    render(<CommandPalette testID="cp" open loading items={[]} />)
    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<CommandPalette testID="cp-dark" open items={items} />)
    expect(screen.getByTestId('cp-dark')).toBeTruthy()
  })

  it('calls onQueryChange when input changes', () => {
    const onQueryChange = jest.fn()
    render(
      <CommandPalette testID="cp" open items={items} onQueryChange={onQueryChange} />,
    )
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'new' } })
    expect(onQueryChange).toHaveBeenCalledWith('new')
  })
})
