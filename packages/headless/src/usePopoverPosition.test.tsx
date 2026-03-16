import { type RefObject, useRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  type UsePopoverPositionProps,
  usePopoverPosition,
} from './usePopoverPosition'

function mockRect(element: HTMLElement, rect: Partial<DOMRect>) {
  jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
    ...rect,
  } as DOMRect)
}

function PopoverFixture({
  isOpen = false,
  ...props
}: Partial<UsePopoverPositionProps> & { isOpen?: boolean }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { position, actualPlacement, update } = usePopoverPosition({
    triggerRef: triggerRef as RefObject<HTMLElement>,
    contentRef: contentRef as RefObject<HTMLElement>,
    isOpen,
    ...props,
  })
  return (
    <div>
      <button ref={triggerRef} data-testid="trigger">
        Trigger
      </button>
      <div
        ref={contentRef}
        data-testid="content"
        style={{ position: 'absolute', top: position.top, left: position.left }}
      >
        Content
      </div>
      <span data-testid="placement">{actualPlacement}</span>
      <button data-testid="update" onClick={update}>
        Update
      </button>
    </div>
  )
}

describe('usePopoverPosition', () => {
  describe('lifecycle', () => {
    it('calls update when isOpen becomes true', () => {
      const { rerender } = render(<PopoverFixture isOpen={false} />)

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')
      mockRect(trigger, {
        top: 100,
        left: 50,
        bottom: 140,
        right: 150,
        width: 100,
        height: 40,
      })
      mockRect(content, { width: 80, height: 30 })

      rerender(<PopoverFixture isOpen={true} />)

      // Position should be updated (bottom placement: top = trigger.bottom + offset)
      expect(screen.getByTestId('content').style.top).not.toBe('0px')
    })

    it('does not update position when isOpen is false', () => {
      render(<PopoverFixture isOpen={false} />)
      expect(screen.getByTestId('content').style.top).toBe('0px')
      expect(screen.getByTestId('content').style.left).toBe('0px')
    })

    it('manual update() recalculates', () => {
      render(<PopoverFixture isOpen={false} />)

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')
      mockRect(trigger, {
        top: 100,
        left: 50,
        bottom: 140,
        right: 150,
        width: 100,
        height: 40,
      })
      mockRect(content, { width: 80, height: 30 })

      fireEvent.click(screen.getByTestId('update'))

      expect(screen.getByTestId('content').style.top).toBe('148px') // 140 + 8 offset
    })
  })

  describe('return shape', () => {
    it('returns position {top, left}', () => {
      render(<PopoverFixture isOpen={false} />)
      const content = screen.getByTestId('content')
      expect(content.style.top).toBeDefined()
      expect(content.style.left).toBeDefined()
    })

    it('returns actualPlacement string', () => {
      render(<PopoverFixture isOpen={false} />)
      expect(screen.getByTestId('placement').textContent).toBe('bottom')
    })

    it('returns update function', () => {
      render(<PopoverFixture isOpen={false} />)
      expect(screen.getByTestId('update')).toBeTruthy()
    })
  })

  describe('basic placement', () => {
    it('bottom placement positions below trigger', () => {
      render(<PopoverFixture isOpen={false} placement="bottom" />)

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')
      mockRect(trigger, {
        top: 100,
        left: 50,
        bottom: 140,
        right: 150,
        width: 100,
        height: 40,
      })
      mockRect(content, { width: 80, height: 30 })

      fireEvent.click(screen.getByTestId('update'))

      // bottom: top = trigger.bottom + offset = 140 + 8 = 148
      // left = trigger.left + (trigger.width - content.width) / 2 = 50 + (100 - 80) / 2 = 60
      expect(screen.getByTestId('content').style.top).toBe('148px')
      expect(screen.getByTestId('content').style.left).toBe('60px')
    })

    it('top placement positions above trigger', () => {
      render(<PopoverFixture isOpen={false} placement="top" />)

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')
      mockRect(trigger, {
        top: 200,
        left: 50,
        bottom: 240,
        right: 150,
        width: 100,
        height: 40,
      })
      mockRect(content, { width: 80, height: 30 })

      fireEvent.click(screen.getByTestId('update'))

      // top: top = trigger.top - content.height - offset = 200 - 30 - 8 = 162
      expect(screen.getByTestId('content').style.top).toBe('162px')
    })
  })

  describe('offset', () => {
    it('offset adds gap between trigger and content', () => {
      render(<PopoverFixture isOpen={false} placement="bottom" offset={20} />)

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')
      mockRect(trigger, {
        top: 100,
        left: 50,
        bottom: 140,
        right: 150,
        width: 100,
        height: 40,
      })
      mockRect(content, { width: 80, height: 30 })

      fireEvent.click(screen.getByTestId('update'))

      // bottom with offset 20: top = 140 + 20 = 160
      expect(screen.getByTestId('content').style.top).toBe('160px')
    })
  })

  describe('defaults', () => {
    it('default placement is bottom', () => {
      render(<PopoverFixture isOpen={false} />)
      expect(screen.getByTestId('placement').textContent).toBe('bottom')
    })

    it('default offset is 8', () => {
      render(<PopoverFixture isOpen={false} />)

      const trigger = screen.getByTestId('trigger')
      const content = screen.getByTestId('content')
      mockRect(trigger, {
        top: 100,
        left: 50,
        bottom: 140,
        right: 150,
        width: 100,
        height: 40,
      })
      mockRect(content, { width: 80, height: 30 })

      fireEvent.click(screen.getByTestId('update'))

      // default offset 8: top = 140 + 8 = 148
      expect(screen.getByTestId('content').style.top).toBe('148px')
    })
  })
})
