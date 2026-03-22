import { act } from 'react'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { HoverCard } from './HoverCard'

describe('HoverCard', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders trigger', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    expect(screen.getByText('Profile')).toBeTruthy()
  })

  it('content hidden by default', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    expect(screen.queryByText('Card content')).toBeNull()
  })

  it('hover shows card after delay', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    fireEvent.mouseEnter(screen.getByText('Profile'))
    expect(screen.queryByText('Card content')).toBeNull()
    act(() => { jest.advanceTimersByTime(300) })
    expect(screen.getByText('Card content')).toBeTruthy()
  })

  it('mouseleave hides card after delay', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    fireEvent.mouseEnter(screen.getByText('Profile'))
    act(() => { jest.advanceTimersByTime(300) })
    expect(screen.getByText('Card content')).toBeTruthy()
    fireEvent.mouseLeave(screen.getByText('Profile'))
    act(() => { jest.advanceTimersByTime(200) })
    expect(screen.queryByText('Card content')).toBeNull()
  })

  it('content stays open while hovering content', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    fireEvent.mouseEnter(screen.getByText('Profile'))
    act(() => { jest.advanceTimersByTime(300) })
    expect(screen.getByText('Card content')).toBeTruthy()
    // Move to content
    fireEvent.mouseLeave(screen.getByText('Profile'))
    fireEvent.mouseEnter(screen.getByText('Card content'))
    act(() => { jest.advanceTimersByTime(300) })
    // Should still be open
    expect(screen.getByText('Card content')).toBeTruthy()
  })

  it('leaving content hides card', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    fireEvent.mouseEnter(screen.getByText('Profile'))
    act(() => { jest.advanceTimersByTime(300) })
    fireEvent.mouseLeave(screen.getByText('Profile'))
    fireEvent.mouseEnter(screen.getByText('Card content'))
    act(() => { jest.advanceTimersByTime(50) })
    fireEvent.mouseLeave(screen.getByText('Card content'))
    act(() => { jest.advanceTimersByTime(200) })
    expect(screen.queryByText('Card content')).toBeNull()
  })

  it('calls onOpenChange', () => {
    const onOpenChange = jest.fn()
    render(
      <HoverCard.Root onOpenChange={onOpenChange}>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    fireEvent.mouseEnter(screen.getByText('Profile'))
    act(() => { jest.advanceTimersByTime(300) })
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('has data-state attribute', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a href="#">Profile</a>
        </HoverCard.Trigger>
        <HoverCard.Content data-testid="hovercard">Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    fireEvent.mouseEnter(screen.getByText('Profile'))
    act(() => { jest.advanceTimersByTime(300) })
    expect(screen.getByTestId('hovercard').getAttribute('data-state')).toBe('open')
  })
})
