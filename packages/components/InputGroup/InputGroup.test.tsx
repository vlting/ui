import { render, screen } from '../../../src/__test-utils__/render'
import { InputGroup } from './InputGroup'

// Minimal Button stub for testing ButtonAddon injection
const MockButton = (props: any) => <button {...props} />
MockButton.displayName = 'Button'

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

  // ─── ButtonAddon tests ──────────────────────────────────────────────────

  it('ButtonAddon renders a real <button> element', () => {
    render(
      <InputGroup>
        <InputGroup.Input>
          <input data-testid="input" />
        </InputGroup.Input>
        <InputGroup.ButtonAddon>
          <MockButton data-testid="copy-btn">Copy</MockButton>
        </InputGroup.ButtonAddon>
      </InputGroup>,
    )
    const btn = screen.getByTestId('copy-btn')
    expect(btn.tagName).toBe('BUTTON')
    expect(btn.textContent).toBe('Copy')
  })

  it('ButtonAddon does not have aria-hidden', () => {
    render(
      <InputGroup>
        <InputGroup.ButtonAddon data-testid="btn-addon">
          <MockButton>Go</MockButton>
        </InputGroup.ButtonAddon>
      </InputGroup>,
    )
    const addon = screen.getByTestId('btn-addon')
    expect(addon.getAttribute('aria-hidden')).toBeNull()
  })

  it('ButtonAddon propagates size from context to Button child', () => {
    const SizeCapture = (props: any) => (
      <button data-testid="sized-btn" data-size={props.size}>
        {props.children}
      </button>
    )
    SizeCapture.displayName = 'Button'

    render(
      <InputGroup size="lg">
        <InputGroup.ButtonAddon>
          <SizeCapture>Action</SizeCapture>
        </InputGroup.ButtonAddon>
      </InputGroup>,
    )
    const btn = screen.getByTestId('sized-btn')
    expect(btn.getAttribute('data-size')).toBe('lg')
  })

  it('ButtonAddon respects explicit size override on Button child', () => {
    const SizeCapture = (props: any) => (
      <button data-testid="sized-btn" data-size={props.size}>
        {props.children}
      </button>
    )
    SizeCapture.displayName = 'Button'

    render(
      <InputGroup size="lg">
        <InputGroup.ButtonAddon>
          <SizeCapture size="sm">Small</SizeCapture>
        </InputGroup.ButtonAddon>
      </InputGroup>,
    )
    const btn = screen.getByTestId('sized-btn')
    expect(btn.getAttribute('data-size')).toBe('sm')
  })
})
