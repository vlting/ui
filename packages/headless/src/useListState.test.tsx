import { fireEvent, render, screen } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react'
import { useListState } from './useListState'
import type { UseListStateProps } from './useListState'

const items = ['Apple', 'Banana', 'Cherry']

function ListFixture<T>(props: UseListStateProps<T>) {
  const { highlightIndex, getListProps, getItemProps } = useListState(props)
  return (
    <ul {...getListProps()} data-testid="list">
      {props.items.map((item, i) => {
        const itemProps = getItemProps(i)
        return (
          <li
            key={i}
            role={itemProps.role}
            aria-selected={itemProps['aria-selected']}
            onClick={itemProps.onPress}
            onMouseEnter={itemProps.onHoverIn}
            data-testid={`item-${i}`}
          >
            {String(item)}
          </li>
        )
      })}
      <span data-testid="highlight">{highlightIndex}</span>
    </ul>
  )
}

describe('useListState', () => {
  describe('highlight management', () => {
    it('defaults highlight to index 0', () => {
      render(<ListFixture items={items} />)
      expect(screen.getByTestId('highlight').textContent).toBe('0')
      expect(screen.getByTestId('item-0').getAttribute('aria-selected')).toBe('true')
    })

    it('respects defaultHighlightIndex', () => {
      render(<ListFixture items={items} defaultHighlightIndex={2} />)
      expect(screen.getByTestId('highlight').textContent).toBe('2')
    })

    it('setHighlightIndex updates highlight', () => {
      const { result } = renderHook(() => useListState({ items }))
      expect(result.current.highlightIndex).toBe(0)
      act(() => {
        result.current.setHighlightIndex(2)
      })
      expect(result.current.highlightIndex).toBe(2)
    })

    it('highlightedItem reflects correct item', () => {
      const { result } = renderHook(() => useListState({ items }))
      expect(result.current.highlightedItem).toBe('Apple')
      act(() => {
        result.current.setHighlightIndex(1)
      })
      expect(result.current.highlightedItem).toBe('Banana')
    })
  })

  describe('keyboard navigation', () => {
    it('ArrowDown moves highlight forward', () => {
      render(<ListFixture items={items} />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowDown' })
      expect(screen.getByTestId('highlight').textContent).toBe('1')
    })

    it('ArrowUp moves highlight backward', () => {
      render(<ListFixture items={items} defaultHighlightIndex={2} />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowUp' })
      expect(screen.getByTestId('highlight').textContent).toBe('1')
    })

    it('Home jumps to first item', () => {
      render(<ListFixture items={items} defaultHighlightIndex={2} />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'Home' })
      expect(screen.getByTestId('highlight').textContent).toBe('0')
    })

    it('End jumps to last item', () => {
      render(<ListFixture items={items} />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'End' })
      expect(screen.getByTestId('highlight').textContent).toBe('2')
    })

    it('Enter selects highlighted item', () => {
      const onSelect = jest.fn()
      render(<ListFixture items={items} onSelect={onSelect} defaultHighlightIndex={1} />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'Enter' })
      expect(onSelect).toHaveBeenCalledWith('Banana', 1)
    })
  })

  describe('loop behavior', () => {
    it('loop=false clamps at boundaries', () => {
      render(<ListFixture items={items} defaultHighlightIndex={0} />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowUp' })
      expect(screen.getByTestId('highlight').textContent).toBe('0')
    })

    it('loop=false clamps at end boundary', () => {
      render(<ListFixture items={items} defaultHighlightIndex={2} />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowDown' })
      expect(screen.getByTestId('highlight').textContent).toBe('2')
    })

    it('loop=true wraps from end to start', () => {
      render(<ListFixture items={items} defaultHighlightIndex={2} loop />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowDown' })
      expect(screen.getByTestId('highlight').textContent).toBe('0')
    })

    it('loop=true wraps from start to end', () => {
      render(<ListFixture items={items} defaultHighlightIndex={0} loop />)
      fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowUp' })
      expect(screen.getByTestId('highlight').textContent).toBe('2')
    })
  })

  describe('mouse interaction', () => {
    it('mouseEnter highlights item', () => {
      render(<ListFixture items={items} />)
      fireEvent.mouseEnter(screen.getByTestId('item-2'))
      expect(screen.getByTestId('highlight').textContent).toBe('2')
    })

    it('click selects item', () => {
      const onSelect = jest.fn()
      render(<ListFixture items={items} onSelect={onSelect} />)
      fireEvent.click(screen.getByTestId('item-1'))
      expect(onSelect).toHaveBeenCalledWith('Banana', 1)
    })
  })

  describe('accessibility', () => {
    it('getListProps returns role="listbox"', () => {
      render(<ListFixture items={items} />)
      expect(screen.getByTestId('list').getAttribute('role')).toBe('listbox')
    })

    it('getItemProps returns role="option"', () => {
      render(<ListFixture items={items} />)
      expect(screen.getByTestId('item-0').getAttribute('role')).toBe('option')
      expect(screen.getByTestId('item-1').getAttribute('role')).toBe('option')
    })

    it('aria-selected true only on highlighted item', () => {
      render(<ListFixture items={items} defaultHighlightIndex={1} />)
      expect(screen.getByTestId('item-0').getAttribute('aria-selected')).toBe('false')
      expect(screen.getByTestId('item-1').getAttribute('aria-selected')).toBe('true')
      expect(screen.getByTestId('item-2').getAttribute('aria-selected')).toBe('false')
    })
  })

  describe('prop-getters', () => {
    it('getListProps includes onKeyDown', () => {
      const { result } = renderHook(() => useListState({ items }))
      const listProps = result.current.getListProps()
      expect(listProps.role).toBe('listbox')
      expect(typeof listProps.onKeyDown).toBe('function')
    })

    it('getItemProps returns correct shape for each index', () => {
      const { result } = renderHook(() => useListState({ items }))
      const props0 = result.current.getItemProps(0)
      const props1 = result.current.getItemProps(1)
      expect(props0.role).toBe('option')
      expect(props0['aria-selected']).toBe(true)
      expect(typeof props0.onHoverIn).toBe('function')
      expect(typeof props0.onPress).toBe('function')
      expect(props1['aria-selected']).toBe(false)
    })
  })
})
