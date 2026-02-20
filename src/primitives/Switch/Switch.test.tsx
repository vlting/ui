import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Switch } from './Switch'

describe('Switch', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Switch testID="switch" />)
      expect(screen.getByTestId('switch')).toBeTruthy()
    })

    it('renders in off state by default', () => {
      render(<Switch testID="switch" />)
      const el = screen.getByTestId('switch')
      expect(el.getAttribute?.('aria-checked')).toBe('false')
    })

    it('renders in on state when checked', () => {
      render(<Switch testID="switch" checked />)
      const el = screen.getByTestId('switch')
      expect(el.getAttribute?.('aria-checked')).toBe('true')
    })
  })

  describe('compound sub-components', () => {
    it('renders Switch.Row', () => {
      render(
        <Switch.Row testID="row">
          <Switch.LabelGroup>
            <Switch.Label>Dark mode</Switch.Label>
            <Switch.Description>Use dark color scheme</Switch.Description>
          </Switch.LabelGroup>
          <Switch testID="switch" />
        </Switch.Row>,
      )
      expect(screen.getByTestId('row')).toBeTruthy()
      expect(screen.getByText('Dark mode')).toBeTruthy()
      expect(screen.getByText('Use dark color scheme')).toBeTruthy()
    })

    it('renders Switch.Label', () => {
      render(<Switch.Label testID="label">Notifications</Switch.Label>)
      expect(screen.getByTestId('label')).toBeTruthy()
    })

    it('renders Switch.Description', () => {
      render(<Switch.Description testID="desc">Receive push notifications</Switch.Description>)
      expect(screen.getByTestId('desc')).toBeTruthy()
    })

    it('renders Switch.Thumb inside Switch', () => {
      render(
        <Switch testID="switch">
          <Switch.Thumb />
        </Switch>,
      )
      expect(screen.getByTestId('switch')).toBeTruthy()
    })
  })

  describe('interaction', () => {
    it('calls onCheckedChange when pressed', () => {
      const onCheckedChange = jest.fn()
      render(<Switch testID="switch" onCheckedChange={onCheckedChange} />)
      fireEvent.press(screen.getByTestId('switch'))
      expect(onCheckedChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('disabled state', () => {
    it('renders as disabled', () => {
      render(<Switch testID="switch" disabled />)
      expect(screen.getByTestId('switch')).toBeTruthy()
    })

    it('does not call onCheckedChange when disabled', () => {
      const onCheckedChange = jest.fn()
      render(<Switch testID="switch" disabled onCheckedChange={onCheckedChange} />)
      fireEvent.press(screen.getByTestId('switch'))
      expect(onCheckedChange).not.toHaveBeenCalled()
    })
  })

  describe('size variants', () => {
    it('renders sm size', () => {
      render(<Switch testID="switch" switchSize="sm" />)
      expect(screen.getByTestId('switch')).toBeTruthy()
    })

    it('renders md size (default)', () => {
      render(<Switch testID="switch" />)
      expect(screen.getByTestId('switch')).toBeTruthy()
    })

    it('renders lg size', () => {
      render(<Switch testID="switch" switchSize="lg" />)
      expect(screen.getByTestId('switch')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has switch role', () => {
      render(<Switch testID="switch" />)
      const el = screen.getByTestId('switch')
      expect(el.getAttribute?.('role')).toBe('switch')
    })

    it('reflects checked state via aria-checked', () => {
      render(<Switch testID="switch" checked />)
      const el = screen.getByTestId('switch')
      expect(el.getAttribute?.('aria-checked')).toBe('true')
    })

    it('reflects unchecked state via aria-checked', () => {
      render(<Switch testID="switch" checked={false} />)
      const el = screen.getByTestId('switch')
      expect(el.getAttribute?.('aria-checked')).toBe('false')
    })
  })
})
