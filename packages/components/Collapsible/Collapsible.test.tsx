import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Collapsible } from './Collapsible'

describe('Collapsible', () => {
  it('renders trigger and content', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    expect(screen.getByText('Toggle')).toBeTruthy()
    expect(screen.getByText('Body')).toBeTruthy()
  })

  it('hides content by default', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    expect(screen.getByText('Body').closest('[hidden]')).toBeTruthy()
  })

  it('shows content when defaultOpen', () => {
    render(
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const content = screen.getByRole('region')
    expect(content).not.toHaveAttribute('hidden')
  })

  it('toggles content on trigger click', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')
    const content = screen.getByText('Body')

    expect(content.closest('[hidden]')).toBeTruthy()

    fireEvent.click(trigger)
    expect(content.closest('[hidden]')).toBeFalsy()

    fireEvent.click(trigger)
    expect(content.closest('[hidden]')).toBeTruthy()
  })

  it('sets aria-expanded on trigger', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('links trigger to content via aria-controls', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')
    const content = screen.getByText('Body')
    const contentId = content.closest('[role="region"]')?.getAttribute('id')

    expect(trigger).toHaveAttribute('aria-controls', contentId)
  })

  it('works in controlled mode', () => {
    const onOpenChange = jest.fn()
    const { rerender } = render(
      <Collapsible.Root open={false} onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )

    fireEvent.click(screen.getByText('Toggle'))
    expect(onOpenChange).toHaveBeenCalledWith(true)

    rerender(
      <Collapsible.Root open={true} onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const content = screen.getByRole('region')
    expect(content).not.toHaveAttribute('hidden')
  })

  it('prevents toggle when disabled', () => {
    render(
      <Collapsible.Root disabled>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')
    fireEvent.click(trigger)

    expect(screen.getByText('Body').closest('[hidden]')).toBeTruthy()
  })

  it('updates data-state attribute', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')
    const root = trigger.closest('[data-state]')

    expect(root).toHaveAttribute('data-state', 'closed')
    expect(trigger).toHaveAttribute('data-state', 'closed')

    fireEvent.click(trigger)

    expect(root).toHaveAttribute('data-state', 'open')
    expect(trigger).toHaveAttribute('data-state', 'open')
  })
})
