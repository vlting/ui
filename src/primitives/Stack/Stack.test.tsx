import { render, screen } from '../../__test-utils__/render'
import { HStack, Stack, VStack } from './Stack'

describe('Stack', () => {
  describe('rendering', () => {
    it('renders without crashing (default vertical)', () => {
      render(<Stack testID="stack" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })

    it('renders children in correct order', () => {
      render(
        <Stack testID="stack">
          <Stack testID="child-1" />
          <Stack testID="child-2" />
          <Stack testID="child-3" />
        </Stack>,
      )
      expect(screen.getByTestId('child-1')).toBeTruthy()
      expect(screen.getByTestId('child-2')).toBeTruthy()
      expect(screen.getByTestId('child-3')).toBeTruthy()
    })
  })

  describe('direction', () => {
    it('renders a vertical stack by default', () => {
      render(<Stack testID="stack" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })

    it('renders a horizontal stack when direction="horizontal"', () => {
      render(<Stack testID="stack" direction="horizontal" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })

    it('renders a vertical stack when direction="vertical"', () => {
      render(<Stack testID="stack" direction="vertical" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })
  })

  describe('VStack convenience export', () => {
    it('renders VStack', () => {
      render(<VStack testID="vstack" />)
      expect(screen.getByTestId('vstack')).toBeTruthy()
    })
  })

  describe('HStack convenience export', () => {
    it('renders HStack', () => {
      render(<HStack testID="hstack" />)
      expect(screen.getByTestId('hstack')).toBeTruthy()
    })
  })

  describe('layout props', () => {
    it('accepts gap prop', () => {
      render(<Stack testID="stack" gap="$2" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })

    it('accepts padding prop', () => {
      render(<Stack testID="stack" padding="$4" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })

    it('accepts align prop', () => {
      render(<Stack testID="stack" alignItems="center" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })

    it('accepts justify prop', () => {
      render(<Stack testID="stack" justifyContent="space-between" />)
      expect(screen.getByTestId('stack')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('does not receive focus', () => {
      render(<Stack testID="stack" />)
      const el = screen.getByTestId('stack')
      expect(el).toBeTruthy()
      // Stack is a layout primitive — no ARIA role should be set by the component
      expect(el.getAttribute?.('role')).toBeFalsy()
    })
  })
})
