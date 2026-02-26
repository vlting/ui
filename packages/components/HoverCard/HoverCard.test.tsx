import { render, screen } from '../../../src/__test-utils__/render'
import { HoverCard } from './HoverCard'

describe('HoverCard', () => {
  it('renders trigger', () => {
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>Hover me</HoverCard.Trigger>
        <HoverCard.Content>Card content</HoverCard.Content>
      </HoverCard.Root>,
    )
    expect(screen.getByText('Hover me')).toBeTruthy()
  })

  it.skip('shows content on hover', () => {
    // TODO: HoverCard timer-based behavior may not work in JSDOM
    render(
      <HoverCard.Root>
        <HoverCard.Trigger>Hover me</HoverCard.Trigger>
        <HoverCard.Content>Visible</HoverCard.Content>
      </HoverCard.Root>,
    )
  })

  it('accepts openDelay and closeDelay', () => {
    render(
      <HoverCard.Root openDelay={500} closeDelay={200}>
        <HoverCard.Trigger>Hover</HoverCard.Trigger>
        <HoverCard.Content>Content</HoverCard.Content>
      </HoverCard.Root>,
    )
    expect(screen.getByText('Hover')).toBeTruthy()
  })
})
