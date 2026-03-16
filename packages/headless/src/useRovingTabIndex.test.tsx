import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { useRovingTabIndex, type UseRovingTabIndexProps } from './useRovingTabIndex'

function RovingFixture({ count = 4, ...props }: Partial<UseRovingTabIndexProps>) {
  const [activeIndex, setActiveIndex] = useState(props.activeIndex ?? 0)
  const { getContainerProps, getItemProps } = useRovingTabIndex({
    count,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
    ...props,
  })
  return (
    <div {...getContainerProps()} data-testid="container">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} {...getItemProps(i)} data-testid={`item-${i}`}>
          Item {i}
        </button>
      ))}
    </div>
  )
}

describe('useRovingTabIndex', () => {
  describe('tabIndex management', () => {
    it('active item has tabIndex=0, others have tabIndex=-1', () => {
      render(<RovingFixture />)
      expect(screen.getByTestId('item-0')).toHaveAttribute('tabindex', '0')
      expect(screen.getByTestId('item-1')).toHaveAttribute('tabindex', '-1')
      expect(screen.getByTestId('item-2')).toHaveAttribute('tabindex', '-1')
      expect(screen.getByTestId('item-3')).toHaveAttribute('tabindex', '-1')
    })

    it('changing activeIndex updates tabIndex', () => {
      render(<RovingFixture />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      expect(screen.getByTestId('item-0')).toHaveAttribute('tabindex', '-1')
      expect(screen.getByTestId('item-1')).toHaveAttribute('tabindex', '0')
    })
  })

  describe('keyboard navigation (vertical)', () => {
    it('ArrowDown moves focus to next item', () => {
      render(<RovingFixture />)
      screen.getByTestId('item-0').focus()
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      expect(document.activeElement).toBe(screen.getByTestId('item-1'))
    })

    it('ArrowUp moves focus to previous item', () => {
      render(<RovingFixture />)
      // Move to item 1 first
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowUp' })
      expect(document.activeElement).toBe(screen.getByTestId('item-0'))
    })

    it('Home moves to first item', () => {
      render(<RovingFixture />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'Home' })
      expect(document.activeElement).toBe(screen.getByTestId('item-0'))
    })

    it('End moves to last item', () => {
      render(<RovingFixture />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'End' })
      expect(document.activeElement).toBe(screen.getByTestId('item-3'))
    })
  })

  describe('keyboard navigation (horizontal)', () => {
    it('ArrowRight moves to next item', () => {
      render(<RovingFixture orientation="horizontal" />)
      screen.getByTestId('item-0').focus()
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowRight' })
      expect(document.activeElement).toBe(screen.getByTestId('item-1'))
    })

    it('ArrowLeft moves to previous item', () => {
      render(<RovingFixture orientation="horizontal" />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowRight' })
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowLeft' })
      expect(document.activeElement).toBe(screen.getByTestId('item-0'))
    })

    it('ArrowDown does not move in horizontal mode', () => {
      render(<RovingFixture orientation="horizontal" />)
      screen.getByTestId('item-0').focus()
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      expect(screen.getByTestId('item-0')).toHaveAttribute('tabindex', '0')
      expect(screen.getByTestId('item-1')).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('loop behavior', () => {
    it('loop=true wraps from last to first', () => {
      render(<RovingFixture loop />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'End' })
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      expect(document.activeElement).toBe(screen.getByTestId('item-0'))
    })

    it('loop=true wraps from first to last', () => {
      render(<RovingFixture loop />)
      screen.getByTestId('item-0').focus()
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowUp' })
      expect(document.activeElement).toBe(screen.getByTestId('item-3'))
    })

    it('loop=false clamps at last item', () => {
      render(<RovingFixture loop={false} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'End' })
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      expect(document.activeElement).toBe(screen.getByTestId('item-3'))
    })

    it('loop=false clamps at first item', () => {
      render(<RovingFixture loop={false} />)
      screen.getByTestId('item-0').focus()
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowUp' })
      expect(screen.getByTestId('item-0')).toHaveAttribute('tabindex', '0')
    })
  })

  describe('focus management', () => {
    it('arrow key focuses the target item', () => {
      render(<RovingFixture />)
      screen.getByTestId('item-0').focus()
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'ArrowDown' })
      expect(document.activeElement).toBe(screen.getByTestId('item-1'))
    })

    it('onFocus on item updates activeIndex', () => {
      render(<RovingFixture />)
      fireEvent.focus(screen.getByTestId('item-2'))
      expect(screen.getByTestId('item-2')).toHaveAttribute('tabindex', '0')
      expect(screen.getByTestId('item-0')).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('prop-getters', () => {
    it('getContainerProps returns ref and onKeyDown', () => {
      let containerProps: ReturnType<ReturnType<typeof useRovingTabIndex>['getContainerProps']>
      function PropsInspector() {
        const { getContainerProps, getItemProps } = useRovingTabIndex({
          count: 1,
          activeIndex: 0,
          onActiveIndexChange: () => {},
        })
        containerProps = getContainerProps()
        return (
          <div {...containerProps}>
            <button {...getItemProps(0)}>item</button>
          </div>
        )
      }
      render(<PropsInspector />)
      expect(containerProps!.ref).toBeDefined()
      expect(typeof containerProps!.onKeyDown).toBe('function')
    })

    it('getItemProps returns tabIndex, onFocus, and data-roving-item', () => {
      let itemProps: ReturnType<ReturnType<typeof useRovingTabIndex>['getItemProps']>
      function PropsInspector() {
        const { getContainerProps, getItemProps } = useRovingTabIndex({
          count: 1,
          activeIndex: 0,
          onActiveIndexChange: () => {},
        })
        itemProps = getItemProps(0)
        return (
          <div {...getContainerProps()}>
            <button {...itemProps}>item</button>
          </div>
        )
      }
      render(<PropsInspector />)
      expect(itemProps!.tabIndex).toBe(0)
      expect(typeof itemProps!.onFocus).toBe('function')
      expect(itemProps!['data-roving-item']).toBe('')
    })
  })
})
