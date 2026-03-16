import { fireEvent, render, screen } from '@testing-library/react'
import { type UseContextMenuProps, useContextMenu } from './useContextMenu'

function ContextMenuFixture(props: UseContextMenuProps) {
  const { isOpen, position, close, getTargetProps } = useContextMenu(props)
  return (
    <div>
      <div {...getTargetProps()} data-testid="target">
        Right-click me
      </div>
      {isOpen && (
        <div
          data-testid="menu"
          style={{ position: 'fixed', top: position.y, left: position.x }}
        >
          Menu content
        </div>
      )}
      <button data-testid="close-btn" onClick={close}>
        Close
      </button>
    </div>
  )
}

function rightClick(element: HTMLElement, clientX = 100, clientY = 200) {
  fireEvent.contextMenu(element, { clientX, clientY })
}

describe('useContextMenu', () => {
  describe('opening', () => {
    it('right-click opens menu', () => {
      render(<ContextMenuFixture />)
      expect(screen.queryByTestId('menu')).toBeNull()

      rightClick(screen.getByTestId('target'))
      expect(screen.getByTestId('menu')).toBeTruthy()
    })

    it('position matches clientX/clientY', () => {
      render(<ContextMenuFixture />)
      rightClick(screen.getByTestId('target'), 150, 250)

      const menu = screen.getByTestId('menu')
      expect(menu.style.top).toBe('250px')
      expect(menu.style.left).toBe('150px')
    })

    it('calls onOpenChange(true) on open', () => {
      const onOpenChange = jest.fn()
      render(<ContextMenuFixture onOpenChange={onOpenChange} />)

      rightClick(screen.getByTestId('target'))
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('prevents default context menu', () => {
      render(<ContextMenuFixture />)
      const target = screen.getByTestId('target')
      const prevented = !fireEvent.contextMenu(target, {
        clientX: 100,
        clientY: 200,
      })
      // fireEvent returns false when preventDefault was called
      expect(prevented).toBe(true)
    })
  })

  describe('closing', () => {
    it('click anywhere closes menu', () => {
      render(<ContextMenuFixture />)
      rightClick(screen.getByTestId('target'))
      expect(screen.getByTestId('menu')).toBeTruthy()

      fireEvent.click(document)
      expect(screen.queryByTestId('menu')).toBeNull()
    })

    it('Escape key closes menu', () => {
      render(<ContextMenuFixture />)
      rightClick(screen.getByTestId('target'))
      expect(screen.getByTestId('menu')).toBeTruthy()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByTestId('menu')).toBeNull()
    })

    it('calls onOpenChange(false) on close', () => {
      const onOpenChange = jest.fn()
      render(<ContextMenuFixture onOpenChange={onOpenChange} />)

      rightClick(screen.getByTestId('target'))
      onOpenChange.mockClear()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('close() function works', () => {
      render(<ContextMenuFixture />)
      rightClick(screen.getByTestId('target'))
      expect(screen.getByTestId('menu')).toBeTruthy()

      fireEvent.click(screen.getByTestId('close-btn'))
      expect(screen.queryByTestId('menu')).toBeNull()
    })
  })

  describe('accessibility', () => {
    it('getTargetProps includes aria-haspopup="menu"', () => {
      render(<ContextMenuFixture />)
      expect(screen.getByTestId('target')).toHaveAttribute(
        'aria-haspopup',
        'menu',
      )
    })
  })

  describe('lifecycle', () => {
    it('document listeners added only when open', () => {
      const addSpy = jest.spyOn(document, 'addEventListener')
      render(<ContextMenuFixture />)

      const callsBefore = addSpy.mock.calls.filter(
        ([type]) => type === 'click' || type === 'keydown',
      ).length

      rightClick(screen.getByTestId('target'))

      const callsAfter = addSpy.mock.calls.filter(
        ([type]) => type === 'click' || type === 'keydown',
      ).length

      expect(callsAfter - callsBefore).toBe(2) // click + keydown
      addSpy.mockRestore()
    })

    it('document listeners removed on close', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener')
      render(<ContextMenuFixture />)

      rightClick(screen.getByTestId('target'))
      removeSpy.mockClear()

      fireEvent.keyDown(document, { key: 'Escape' })

      const removed = removeSpy.mock.calls.filter(
        ([type]) => type === 'click' || type === 'keydown',
      )
      expect(removed.length).toBe(2)
      removeSpy.mockRestore()
    })

    it('document listeners removed on unmount', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener')
      const { unmount } = render(<ContextMenuFixture />)

      rightClick(screen.getByTestId('target'))
      removeSpy.mockClear()

      unmount()

      const removed = removeSpy.mock.calls.filter(
        ([type]) => type === 'click' || type === 'keydown',
      )
      expect(removed.length).toBe(2)
      removeSpy.mockRestore()
    })
  })

  describe('edge cases', () => {
    it('multiple right-clicks update position', () => {
      render(<ContextMenuFixture />)

      rightClick(screen.getByTestId('target'), 100, 200)
      expect(screen.getByTestId('menu').style.left).toBe('100px')

      rightClick(screen.getByTestId('target'), 300, 400)
      expect(screen.getByTestId('menu').style.left).toBe('300px')
      expect(screen.getByTestId('menu').style.top).toBe('400px')
    })

    it('right-click while open updates position and stays open', () => {
      render(<ContextMenuFixture />)

      rightClick(screen.getByTestId('target'), 50, 60)
      expect(screen.getByTestId('menu')).toBeTruthy()

      rightClick(screen.getByTestId('target'), 70, 80)
      expect(screen.getByTestId('menu')).toBeTruthy()
      expect(screen.getByTestId('menu').style.left).toBe('70px')
    })
  })
})
