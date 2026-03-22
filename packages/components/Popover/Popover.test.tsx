import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Popover } from './Popover'

describe('Popover', () => {
  it('renders trigger', () => {
    render(
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover.Root>,
    )
    expect(screen.getByText('Open')).toBeTruthy()
  })

  it('content is hidden by default', () => {
    render(
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Popover body</Popover.Content>
      </Popover.Root>,
    )
    expect(screen.queryByText('Popover body')).toBeNull()
  })

  it('click opens content', () => {
    render(
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Popover body</Popover.Content>
      </Popover.Root>,
    )
    fireEvent.click(screen.getByText('Open'))
    expect(screen.getByText('Popover body')).toBeTruthy()
  })

  it('Escape closes content', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Popover body</Popover.Content>
      </Popover.Root>,
    )
    expect(screen.getByText('Popover body')).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByText('Popover body')).toBeNull()
  })

  it('click outside closes content', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Popover body</Popover.Content>
      </Popover.Root>,
    )
    expect(screen.getByText('Popover body')).toBeTruthy()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByText('Popover body')).toBeNull()
  })

  it('has aria-expanded on trigger', () => {
    render(
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover.Root>,
    )
    const trigger = screen.getByText('Open')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('content has role="dialog"', () => {
    render(
      <Popover.Root open>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover.Root>,
    )
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('has data-state attribute', () => {
    render(
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover.Root>,
    )
    const trigger = screen.getByText('Open')
    expect(trigger.getAttribute('data-state')).toBe('closed')
    fireEvent.click(trigger)
    expect(trigger.getAttribute('data-state')).toBe('open')
  })

  it('Close button closes popover', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Close />
          Body
        </Popover.Content>
      </Popover.Root>,
    )
    expect(screen.getByText('Body')).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Close popover'))
    expect(screen.queryByText('Body')).toBeNull()
  })

  it('calls onOpenChange', () => {
    const onOpenChange = jest.fn()
    render(
      <Popover.Root onOpenChange={onOpenChange}>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover.Root>,
    )
    fireEvent.click(screen.getByText('Open'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('focus trap keeps focus inside content', () => {
    render(
      <Popover.Root open>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Close />
        </Popover.Content>
      </Popover.Root>,
    )
    const closeBtn = screen.getByLabelText('Close popover')
    closeBtn.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(closeBtn)
  })

  it('renders with placement prop', () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const
    for (const placement of placements) {
      const { unmount } = render(
        <Popover.Root placement={placement}>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover.Root>,
      )
      unmount()
    }
  })
})
