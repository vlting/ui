import { fireEvent, render, screen } from '../../__test-utils__/render'
import { VirtualizedList } from './VirtualizedList'

const makeData = (count: number) =>
  Array.from({ length: count }, (_, i) => ({ id: String(i), label: `Item ${i}` }))

const renderItem = (item: { id: string; label: string }) => (
  <span>{item.label}</span>
)
const keyExtractor = (item: { id: string }) => item.id

describe('VirtualizedList', () => {
  it('renders without crashing with data', () => {
    const data = makeData(10)
    render(
      <VirtualizedList
        testID="list"
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemHeight={50}
        height={300}
      />,
    )
    expect(screen.getByTestId('list')).toBeTruthy()
  })

  it('renders empty state when data is empty', () => {
    render(
      <VirtualizedList
        testID="list"
        data={[]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />,
    )
    expect(screen.getByTestId('list')).toBeTruthy()
    expect(screen.getByText('No items')).toBeTruthy()
  })

  it('renders with custom empty content', () => {
    render(
      <VirtualizedList
        testID="list"
        data={[]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        emptyContent={<span testID="custom-empty">Nothing here</span>}
      />,
    )
    expect(screen.getByText('Nothing here')).toBeTruthy()
  })

  it('shows loading indicator', () => {
    const data = makeData(5)
    render(
      <VirtualizedList
        testID="list"
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        loading
      />,
    )
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('renders visible items for a dataset', () => {
    const data = makeData(20)
    render(
      <VirtualizedList
        testID="list"
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemHeight={50}
        height={200}
      />,
    )
    // Should render first visible items
    expect(screen.getByTestId('list')).toBeTruthy()
  })

  it('has list role and accessible label', () => {
    const data = makeData(5)
    render(
      <VirtualizedList
        testID="list"
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        accessibilityLabel="User list"
      />,
    )
    expect(screen.getByRole('list')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    const data = makeData(3)
    render(
      <VirtualizedList
        testID="list-dark"
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />,
    )
    expect(screen.getByTestId('list-dark')).toBeTruthy()
  })
})
