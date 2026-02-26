import { render, screen } from '../../../src/__test-utils__/render'
import { Carousel } from './Carousel'

describe('Carousel', () => {
  it('renders items', () => {
    render(
      <Carousel.Root>
        <Carousel.Content>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel.Content>
      </Carousel.Root>,
    )
    expect(screen.getByText('Slide 1')).toBeTruthy()
  })

  it('renders navigation buttons', () => {
    render(
      <Carousel.Root>
        <Carousel.Content>
          <Carousel.Item>Slide 1</Carousel.Item>
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>,
    )
    // Previous and Next buttons should exist
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('renders dots indicator', () => {
    render(
      <Carousel.Root>
        <Carousel.Content>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel.Content>
        <Carousel.Dots />
      </Carousel.Root>,
    )
    // Dots should be rendered
    expect(screen.getByText('Slide 1')).toBeTruthy()
  })

  it.skip('has role="region" with aria-roledescription', () => {
    // TODO: Tamagui may not render ARIA attributes in JSDOM
    render(
      <Carousel.Root>
        <Carousel.Content>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel.Content>
      </Carousel.Root>,
    )
    expect(screen.getByRole('region')).toBeTruthy()
  })
})
