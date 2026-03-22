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

  it('hides content by default via aria-hidden on grid wrapper', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const content = screen.getByText('Body')
    const grid = content.closest('[aria-hidden]')
    expect(grid).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not use hidden attribute (grid handles visibility)', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const content = screen.getByText('Body')
    expect(content.closest('[hidden]')).toBeFalsy()
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
    const grid = content.closest('[aria-hidden]')
    expect(grid).toHaveAttribute('aria-hidden', 'false')
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
    const grid = content.closest('[aria-hidden]')!

    expect(grid).toHaveAttribute('aria-hidden', 'true')

    fireEvent.click(trigger)
    expect(grid).toHaveAttribute('aria-hidden', 'false')

    fireEvent.click(trigger)
    expect(grid).toHaveAttribute('aria-hidden', 'true')
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

    const content = screen.getByText('Body')
    const grid = content.closest('[aria-hidden]')
    expect(grid).toHaveAttribute('aria-hidden', 'true')
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

  // ─── Grid animation wrapper ───────────────────────────────────────────

  it('renders grid wrapper around content', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const content = screen.getByText('Body')
    const grid = content.parentElement!
    expect(grid).toHaveAttribute('data-state', 'closed')
    expect(grid).toHaveAttribute('aria-hidden', 'true')
  })

  // ─── Chevron / Indicator tests ──────────────────────────────────────────

  it('renders chevron SVG by default', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')
    const svg = trigger.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('hides chevron when indicator={false}', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger indicator={false}>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')
    const svg = trigger.querySelector('svg')
    expect(svg).toBeNull()
  })

  it('toggles data-state on chevron wrapper', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Body</Collapsible.Content>
      </Collapsible.Root>,
    )
    const trigger = screen.getByText('Toggle')
    const chevron = trigger.querySelector('span[data-state]')

    expect(chevron).toHaveAttribute('data-state', 'closed')

    fireEvent.click(trigger)

    expect(chevron).toHaveAttribute('data-state', 'open')
  })
})
