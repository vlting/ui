import { render, screen } from '../../../src/__test-utils__/render'
import { Toggle, ToggleGroup } from './Toggle'

describe('Toggle', () => {
  it('renders a button element', () => {
    const { container } = render(<Toggle>Bold</Toggle>)
    expect(container.querySelector('button')).toBeTruthy()
  })

  it('renders children text', () => {
    render(<Toggle>Italic</Toggle>)
    expect(screen.getByText('Italic')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Toggle size={size}>T</Toggle>)
      expect(screen.getByText('T')).toBeTruthy()
      unmount()
    }
  })

  it('renders outline variant', () => {
    const { container } = render(<Toggle variant="outline">O</Toggle>)
    expect(container.querySelector('button')).toBeTruthy()
  })

  it('renders disabled state', () => {
    const { container } = render(<Toggle disabled>D</Toggle>)
    const button = container.querySelector('button')
    expect(button).toBeTruthy()
  })

  it('accepts pressed prop', () => {
    const { container } = render(<Toggle pressed>P</Toggle>)
    expect(container.querySelector('button')).toBeTruthy()
  })
})

describe('ToggleGroup', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <ToggleGroup type="single" defaultValue="a">
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      ),
    ).not.toThrow()
  })

  it('renders multiple type', () => {
    expect(() =>
      render(
        <ToggleGroup type="multiple" defaultValue={['a']}>
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      ),
    ).not.toThrow()
  })
})
