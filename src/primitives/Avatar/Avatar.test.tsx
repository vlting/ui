import { render, screen } from '../../__test-utils__/render'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Avatar testID="avatar" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })

    it('renders with a name (initials fallback)', () => {
      render(<Avatar testID="avatar" name="John Doe" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
      expect(screen.getByText('JD')).toBeTruthy()
    })

    it('renders with a src and name', () => {
      render(<Avatar testID="avatar" src="https://example.com/photo.jpg" name="Jane Smith" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })

    it('renders initials for single-word name', () => {
      render(<Avatar name="Alice" />)
      expect(screen.getByText('A')).toBeTruthy()
    })

    it('renders max 2 initials for multi-word name', () => {
      render(<Avatar name="Alice Bob Carol" />)
      expect(screen.getByText('AB')).toBeTruthy()
    })
  })

  describe('size variants', () => {
    it('renders xs size', () => {
      render(<Avatar testID="avatar" size="xs" name="AB" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })

    it('renders sm size', () => {
      render(<Avatar testID="avatar" size="sm" name="AB" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })

    it('renders md size (default)', () => {
      render(<Avatar testID="avatar" name="AB" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })

    it('renders lg size', () => {
      render(<Avatar testID="avatar" size="lg" name="AB" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })

    it('renders xl size', () => {
      render(<Avatar testID="avatar" size="xl" name="AB" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })
  })

  describe('shape variants', () => {
    it('renders circle shape (default)', () => {
      render(<Avatar testID="avatar" name="JD" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })

    it('renders square shape', () => {
      render(<Avatar testID="avatar" shape="square" name="JD" />)
      expect(screen.getByTestId('avatar')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Avatar.Frame', () => {
      render(<Avatar.Frame testID="frame" />)
      expect(screen.getByTestId('frame')).toBeTruthy()
    })

    it('exposes Avatar.Fallback', () => {
      render(
        <Avatar.Frame>
          <Avatar.Fallback testID="fallback">
            <Avatar.FallbackText>JD</Avatar.FallbackText>
          </Avatar.Fallback>
        </Avatar.Frame>,
      )
      expect(screen.getByTestId('fallback')).toBeTruthy()
      expect(screen.getByText('JD')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has aria-label matching name', () => {
      render(<Avatar testID="avatar" name="John Doe" />)
      const el = screen.getByTestId('avatar')
      expect(el.getAttribute?.('aria-label')).toBe('John Doe')
    })

    it('does not receive focus (non-interactive)', () => {
      render(<Avatar testID="avatar" name="JD" />)
      const el = screen.getByTestId('avatar')
      expect(el).toBeTruthy()
      // Avatar should not have a focusable role
      expect(el.getAttribute?.('role')).toBeFalsy()
    })
  })
})
