import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { useKeyboardNavigation } from './useKeyboardNavigation'

function NavigationFixture({
  items = 3,
  orientation = 'vertical' as const,
  loop = false,
  onSelect,
}: {
  items?: number
  orientation?: 'horizontal' | 'vertical' | 'both'
  loop?: boolean
  onSelect?: (index: number) => void
}) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const handleKeyDown = useKeyboardNavigation(items, activeIndex, setActiveIndex, {
    orientation,
    loop,
    onSelect,
  })

  return (
    <div onKeyDown={handleKeyDown} data-testid="container" tabIndex={0}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} data-testid={`item-${i}`} data-active={i === activeIndex}>
          Item {i}
        </div>
      ))}
    </div>
  )
}

describe('useKeyboardNavigation', () => {
  describe('vertical orientation', () => {
    it('moves down with ArrowDown', () => {
      const { getByTestId } = render(<NavigationFixture />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowDown' })

      expect(getByTestId('item-1')).toHaveAttribute('data-active', 'true')
    })

    it('moves up with ArrowUp', () => {
      const { getByTestId } = render(<NavigationFixture />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowDown' })
      fireEvent.keyDown(container, { key: 'ArrowUp' })

      expect(getByTestId('item-0')).toHaveAttribute('data-active', 'true')
    })

    it('does not go below last item without loop', () => {
      const { getByTestId } = render(<NavigationFixture items={2} />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowDown' })
      fireEvent.keyDown(container, { key: 'ArrowDown' })

      expect(getByTestId('item-1')).toHaveAttribute('data-active', 'true')
    })

    it('does not go above first item without loop', () => {
      const { getByTestId } = render(<NavigationFixture />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowUp' })

      expect(getByTestId('item-0')).toHaveAttribute('data-active', 'true')
    })
  })

  describe('looping', () => {
    it('wraps from last to first with loop enabled', () => {
      const { getByTestId } = render(<NavigationFixture items={2} loop />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowDown' })
      fireEvent.keyDown(container, { key: 'ArrowDown' })

      expect(getByTestId('item-0')).toHaveAttribute('data-active', 'true')
    })

    it('wraps from first to last with loop enabled', () => {
      const { getByTestId } = render(<NavigationFixture items={3} loop />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowUp' })

      expect(getByTestId('item-2')).toHaveAttribute('data-active', 'true')
    })
  })

  describe('Home and End', () => {
    it('Home jumps to first item', () => {
      const { getByTestId } = render(<NavigationFixture />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowDown' })
      fireEvent.keyDown(container, { key: 'ArrowDown' })
      fireEvent.keyDown(container, { key: 'Home' })

      expect(getByTestId('item-0')).toHaveAttribute('data-active', 'true')
    })

    it('End jumps to last item', () => {
      const { getByTestId } = render(<NavigationFixture />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'End' })

      expect(getByTestId('item-2')).toHaveAttribute('data-active', 'true')
    })
  })

  describe('selection', () => {
    it('calls onSelect with Enter key', () => {
      const onSelect = jest.fn()
      const { getByTestId } = render(<NavigationFixture onSelect={onSelect} />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'Enter' })

      expect(onSelect).toHaveBeenCalledWith(0)
    })

    it('calls onSelect with Space key', () => {
      const onSelect = jest.fn()
      const { getByTestId } = render(<NavigationFixture onSelect={onSelect} />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: ' ' })

      expect(onSelect).toHaveBeenCalledWith(0)
    })
  })

  describe('horizontal orientation', () => {
    it('moves right with ArrowRight', () => {
      const { getByTestId } = render(<NavigationFixture orientation="horizontal" />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowRight' })

      expect(getByTestId('item-1')).toHaveAttribute('data-active', 'true')
    })

    it('moves left with ArrowLeft', () => {
      const { getByTestId } = render(<NavigationFixture orientation="horizontal" />)
      const container = getByTestId('container')
      container.focus()

      fireEvent.keyDown(container, { key: 'ArrowRight' })
      fireEvent.keyDown(container, { key: 'ArrowLeft' })

      expect(getByTestId('item-0')).toHaveAttribute('data-active', 'true')
    })
  })
})
