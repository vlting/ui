import { render, screen } from '../../../src/__test-utils__/render'
import { InputGroup } from './InputGroup'

describe('InputGroup', () => {
  it('renders Root with children', () => {
    render(
      <InputGroup>
        <span>child</span>
      </InputGroup>,
    )
    expect(screen.getByText('child')).toBeTruthy()
  })

  it('renders with Addon and Input combination', () => {
    render(
      <InputGroup>
        <InputGroup.Addon>https://</InputGroup.Addon>
        <InputGroup.Input>
          <input data-testid="input" />
        </InputGroup.Input>
      </InputGroup>,
    )
    expect(screen.getByText('https://')).toBeTruthy()
    expect(screen.getByTestId('input')).toBeTruthy()
  })

  it('renders with Element overlay', () => {
    render(
      <InputGroup>
        <InputGroup.Element placement="left">
          <span data-testid="icon">icon</span>
        </InputGroup.Element>
        <InputGroup.Input>
          <input data-testid="input" />
        </InputGroup.Input>
      </InputGroup>,
    )
    expect(screen.getByTestId('icon')).toBeTruthy()
    expect(screen.getByTestId('input')).toBeTruthy()
  })

  it('renders with all size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <InputGroup size={size}>
          <InputGroup.Addon>@</InputGroup.Addon>
        </InputGroup>,
      )
      expect(screen.getByText('@')).toBeTruthy()
      unmount()
    }
  })

  it('renders horizontal orientation by default', () => {
    render(
      <InputGroup aria-label="test group">
        <span>a</span>
        <span>b</span>
      </InputGroup>,
    )
    expect(screen.getByRole('group')).toBeTruthy()
  })

  it('renders vertical orientation', () => {
    render(
      <InputGroup orientation="vertical" aria-label="vertical group">
        <span>a</span>
        <span>b</span>
      </InputGroup>,
    )
    expect(screen.getByRole('group')).toBeTruthy()
  })

  it('renders without optional sub-components', () => {
    render(
      <InputGroup>
        <InputGroup.Input>
          <input data-testid="solo-input" />
        </InputGroup.Input>
      </InputGroup>,
    )
    expect(screen.getByTestId('solo-input')).toBeTruthy()
  })

  it('has role="group" on the container', () => {
    render(
      <InputGroup aria-label="input group">
        <span>child</span>
      </InputGroup>,
    )
    const group = screen.getByRole('group')
    expect(group).toBeTruthy()
    expect(group.getAttribute('aria-label')).toBe('input group')
  })
})
