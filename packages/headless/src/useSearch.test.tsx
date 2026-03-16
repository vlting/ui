import { fireEvent, render, screen } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react'
import { useSearch } from './useSearch'
import type { UseSearchProps } from './useSearch'

const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry']
const filterFn = (item: string, query: string) =>
  item.toLowerCase().includes(query.toLowerCase())

function SearchFixture(props?: Partial<UseSearchProps<string>>) {
  const { query, filtered, getInputProps } = useSearch({
    items: fruits,
    filterFn,
    ...props,
  })
  return (
    <div>
      <input {...getInputProps()} data-testid="input" />
      <span data-testid="query">{query}</span>
      <ul data-testid="results">
        {filtered.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

describe('useSearch', () => {
  describe('initial state', () => {
    it('query is empty', () => {
      render(<SearchFixture />)
      expect(screen.getByTestId('query').textContent).toBe('')
    })

    it('all items returned when query is empty', () => {
      render(<SearchFixture />)
      const items = screen.getByTestId('results').querySelectorAll('li')
      expect(items).toHaveLength(5)
    })

    it('input value is empty', () => {
      render(<SearchFixture />)
      expect((screen.getByTestId('input') as HTMLInputElement).value).toBe('')
    })
  })

  describe('filtering', () => {
    it('typing filters items via filterFn', () => {
      render(<SearchFixture />)
      fireEvent.change(screen.getByTestId('input'), { target: { value: 'an' } })
      const items = screen.getByTestId('results').querySelectorAll('li')
      expect(items).toHaveLength(1)
      expect(items[0].textContent).toBe('banana')
    })

    it('clearing input shows all items', () => {
      render(<SearchFixture />)
      fireEvent.change(screen.getByTestId('input'), { target: { value: 'a' } })
      fireEvent.change(screen.getByTestId('input'), { target: { value: '' } })
      const items = screen.getByTestId('results').querySelectorAll('li')
      expect(items).toHaveLength(5)
    })
  })

  describe('setQuery', () => {
    it('programmatic setQuery updates query and filtered', () => {
      const { result } = renderHook(() => useSearch({ items: fruits, filterFn }))
      expect(result.current.filtered).toHaveLength(5)
      act(() => {
        result.current.setQuery('cherry')
      })
      expect(result.current.query).toBe('cherry')
      expect(result.current.filtered).toHaveLength(1)
      expect(result.current.filtered[0]).toBe('cherry')
    })
  })

  describe('memoization', () => {
    it('filtered returns same reference when query has not changed', () => {
      const { result, rerender } = renderHook(() =>
        useSearch({ items: fruits, filterFn }),
      )
      const first = result.current.filtered
      rerender()
      expect(result.current.filtered).toBe(first)
    })
  })

  describe('getInputProps', () => {
    it('returns value, onChange, and type', () => {
      const { result } = renderHook(() => useSearch({ items: fruits, filterFn }))
      const props = result.current.getInputProps()
      expect(props.value).toBe('')
      expect(typeof props.onChange).toBe('function')
      expect(props.type).toBe('search')
    })

    it('rendered input has type="search"', () => {
      render(<SearchFixture />)
      expect((screen.getByTestId('input') as HTMLInputElement).type).toBe('search')
    })
  })

  describe('edge cases', () => {
    it('empty items array returns empty filtered', () => {
      const { result } = renderHook(() =>
        useSearch({ items: [], filterFn }),
      )
      expect(result.current.filtered).toHaveLength(0)
    })

    it('no matches returns empty array', () => {
      const { result } = renderHook(() => useSearch({ items: fruits, filterFn }))
      act(() => {
        result.current.setQuery('zzz')
      })
      expect(result.current.filtered).toHaveLength(0)
    })

    it('filterFn receives correct arguments', () => {
      const spy = jest.fn(() => true)
      const { result } = renderHook(() =>
        useSearch({ items: ['a', 'b'], filterFn: spy }),
      )
      act(() => {
        result.current.setQuery('q')
      })
      expect(spy).toHaveBeenCalledWith('a', 'q')
      expect(spy).toHaveBeenCalledWith('b', 'q')
    })
  })
})
