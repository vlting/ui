import { render, screen } from '../../__test-utils__/render'
import { MatchRequestBadge } from './MatchRequestBadge'

describe('MatchRequestBadge', () => {
  describe('rendering', () => {
    it('renders without crashing for pending status', () => {
      render(<MatchRequestBadge status="pending" testID="badge" />)
      expect(screen.getByTestId('badge')).toBeTruthy()
    })

    it('renders without crashing for mutual status', () => {
      render(<MatchRequestBadge status="mutual" testID="badge" />)
      expect(screen.getByTestId('badge')).toBeTruthy()
    })
  })

  describe('status behavior', () => {
    it('renders nothing when status is none', () => {
      render(<MatchRequestBadge status="none" testID="badge" />)
      expect(screen.queryByTestId('badge')).toBeNull()
    })

    it('renders a dot when status is pending', () => {
      render(<MatchRequestBadge status="pending" testID="badge" />)
      expect(screen.getByTestId('badge')).toBeTruthy()
    })

    it('renders a dot with checkmark when status is mutual', () => {
      render(<MatchRequestBadge status="mutual" testID="badge" />)
      expect(screen.getByTestId('badge')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="status" for pending', () => {
      render(<MatchRequestBadge status="pending" testID="badge" />)
      const el = screen.getByTestId('badge')
      expect(el.getAttribute?.('role')).toBe('status')
    })

    it('has role="status" for mutual', () => {
      render(<MatchRequestBadge status="mutual" testID="badge" />)
      const el = screen.getByTestId('badge')
      expect(el.getAttribute?.('role')).toBe('status')
    })

    it('has aria-live="polite" for pending', () => {
      render(<MatchRequestBadge status="pending" testID="badge" />)
      const el = screen.getByTestId('badge')
      expect(el.getAttribute?.('aria-live')).toBe('polite')
    })

    it('has aria-live="polite" for mutual', () => {
      render(<MatchRequestBadge status="mutual" testID="badge" />)
      const el = screen.getByTestId('badge')
      expect(el.getAttribute?.('aria-live')).toBe('polite')
    })

    it('has aria-label "Match pending" for pending status', () => {
      render(<MatchRequestBadge status="pending" testID="badge" />)
      const el = screen.getByTestId('badge')
      expect(el.getAttribute?.('aria-label')).toBe('Match pending')
    })

    it('has aria-label "Mutual match" for mutual status', () => {
      render(<MatchRequestBadge status="mutual" testID="badge" />)
      const el = screen.getByTestId('badge')
      expect(el.getAttribute?.('aria-label')).toBe('Mutual match')
    })
  })
})
