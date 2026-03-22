import { act } from 'react'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('simple API', () => {
    it('renders trigger', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Hover me</button>
        </Tooltip>,
      )
      expect(screen.getByText('Hover me')).toBeTruthy()
    })

    it('tooltip hidden by default', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Hover me</button>
        </Tooltip>,
      )
      expect(screen.queryByRole('tooltip')).toBeNull()
    })

    it('hover shows tooltip after delay', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Hover me</button>
        </Tooltip>,
      )
      fireEvent.mouseEnter(screen.getByText('Hover me'))
      expect(screen.queryByRole('tooltip')).toBeNull()
      act(() => { jest.advanceTimersByTime(200) })
      expect(screen.getByRole('tooltip')).toBeTruthy()
      expect(screen.getByText('Help text')).toBeTruthy()
    })

    it('mouseleave hides tooltip after delay', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Hover me</button>
        </Tooltip>,
      )
      fireEvent.mouseEnter(screen.getByText('Hover me'))
      act(() => { jest.advanceTimersByTime(200) })
      expect(screen.getByRole('tooltip')).toBeTruthy()
      fireEvent.mouseLeave(screen.getByText('Hover me'))
      act(() => { jest.advanceTimersByTime(100) })
      expect(screen.queryByRole('tooltip')).toBeNull()
    })

    it('has role="tooltip"', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Hover me</button>
        </Tooltip>,
      )
      fireEvent.mouseEnter(screen.getByText('Hover me'))
      act(() => { jest.advanceTimersByTime(200) })
      expect(screen.getByRole('tooltip')).toBeTruthy()
    })

    it('sets aria-describedby on trigger when open', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Hover me</button>
        </Tooltip>,
      )
      const trigger = screen.getByText('Hover me')
      expect(trigger.getAttribute('aria-describedby')).toBeNull()
      fireEvent.mouseEnter(trigger)
      act(() => { jest.advanceTimersByTime(200) })
      expect(trigger.getAttribute('aria-describedby')).toBeTruthy()
      const tooltipEl = document.getElementById(trigger.getAttribute('aria-describedby')!)
      expect(tooltipEl?.textContent).toBe('Help text')
    })

    it('focus shows tooltip', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Focus me</button>
        </Tooltip>,
      )
      fireEvent.focus(screen.getByText('Focus me'))
      act(() => { jest.advanceTimersByTime(200) })
      expect(screen.getByRole('tooltip')).toBeTruthy()
    })

    it('blur hides tooltip', () => {
      render(
        <Tooltip content="Help text">
          <button type="button">Focus me</button>
        </Tooltip>,
      )
      fireEvent.focus(screen.getByText('Focus me'))
      act(() => { jest.advanceTimersByTime(200) })
      expect(screen.getByRole('tooltip')).toBeTruthy()
      fireEvent.blur(screen.getByText('Focus me'))
      act(() => { jest.advanceTimersByTime(100) })
      expect(screen.queryByRole('tooltip')).toBeNull()
    })
  })

  describe('compound API', () => {
    it('works with Root/Trigger/Content', () => {
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>
            <button type="button">Compound</button>
          </Tooltip.Trigger>
          <Tooltip.Content>Compound tip</Tooltip.Content>
        </Tooltip.Root>,
      )
      fireEvent.mouseEnter(screen.getByText('Compound'))
      act(() => { jest.advanceTimersByTime(200) })
      expect(screen.getByRole('tooltip')).toBeTruthy()
      expect(screen.getByText('Compound tip')).toBeTruthy()
    })

    it('supports custom delays', () => {
      render(
        <Tooltip.Root showDelay={500} hideDelay={300}>
          <Tooltip.Trigger>
            <button type="button">Slow</button>
          </Tooltip.Trigger>
          <Tooltip.Content>Slow tip</Tooltip.Content>
        </Tooltip.Root>,
      )
      fireEvent.mouseEnter(screen.getByText('Slow'))
      act(() => { jest.advanceTimersByTime(200) })
      expect(screen.queryByRole('tooltip')).toBeNull()
      act(() => { jest.advanceTimersByTime(300) })
      expect(screen.getByRole('tooltip')).toBeTruthy()
    })
  })
})
