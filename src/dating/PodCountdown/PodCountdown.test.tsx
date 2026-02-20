import { render, screen } from '../../__test-utils__/render'
import { PodCountdown } from './PodCountdown'

describe('PodCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      const future = new Date(Date.now() + 3600000) // 1 hour from now
      render(<PodCountdown endDate={future} testID="countdown" />)
      expect(screen.getByTestId('countdown')).toBeTruthy()
    })

    it('renders with a label', () => {
      const future = new Date(Date.now() + 3600000)
      render(<PodCountdown endDate={future} label="Pod expires in" testID="countdown" />)
      expect(screen.getByText('Pod expires in')).toBeTruthy()
    })
  })

  describe('time formatting', () => {
    it('shows remaining time in "Xd Xh Xm" format', () => {
      // 1 day, 2 hours, 30 minutes from now
      const future = new Date(Date.now() + (26 * 60 + 30) * 60000)
      render(<PodCountdown endDate={future} testID="countdown" />)
      expect(screen.getByText('1d 2h 30m')).toBeTruthy()
    })

    it('shows only hours and minutes when less than a day', () => {
      // 5 hours, 15 minutes from now
      const future = new Date(Date.now() + (5 * 60 + 15) * 60000)
      render(<PodCountdown endDate={future} testID="countdown" />)
      expect(screen.getByText('5h 15m')).toBeTruthy()
    })

    it('shows only minutes when less than an hour', () => {
      // 45 minutes from now
      const future = new Date(Date.now() + 45 * 60000)
      render(<PodCountdown endDate={future} testID="countdown" />)
      expect(screen.getByText('45m')).toBeTruthy()
    })

    it('shows "Pod ended" when expired', () => {
      const past = new Date(Date.now() - 60000) // 1 minute ago
      render(<PodCountdown endDate={past} testID="countdown" />)
      expect(screen.getByText('Pod ended')).toBeTruthy()
    })
  })

  describe('endDate parsing', () => {
    it('accepts a Date object', () => {
      const future = new Date(Date.now() + 3600000)
      render(<PodCountdown endDate={future} testID="countdown" />)
      expect(screen.getByTestId('countdown')).toBeTruthy()
    })

    it('accepts an ISO date string', () => {
      const future = new Date(Date.now() + 3600000).toISOString()
      render(<PodCountdown endDate={future} testID="countdown" />)
      expect(screen.getByTestId('countdown')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="timer"', () => {
      const future = new Date(Date.now() + 3600000)
      render(<PodCountdown endDate={future} testID="countdown" />)
      const el = screen.getByTestId('countdown')
      expect(el.getAttribute?.('role')).toBe('timer')
    })

    it('has aria-live="polite"', () => {
      const future = new Date(Date.now() + 3600000)
      render(<PodCountdown endDate={future} testID="countdown" />)
      const el = screen.getByTestId('countdown')
      expect(el.getAttribute?.('aria-live')).toBe('polite')
    })

    it('has aria-label with time text', () => {
      const future = new Date(Date.now() + 45 * 60000) // 45 minutes
      render(<PodCountdown endDate={future} testID="countdown" />)
      const el = screen.getByTestId('countdown')
      expect(el.getAttribute?.('aria-label')).toBe('45m')
    })

    it('has aria-label with label prefix when label is provided', () => {
      const future = new Date(Date.now() + 45 * 60000)
      render(<PodCountdown endDate={future} label="Expires" testID="countdown" />)
      const el = screen.getByTestId('countdown')
      expect(el.getAttribute?.('aria-label')).toBe('Expires: 45m')
    })

    it('has aria-label "Pod ended" when expired', () => {
      const past = new Date(Date.now() - 60000)
      render(<PodCountdown endDate={past} testID="countdown" />)
      const el = screen.getByTestId('countdown')
      expect(el.getAttribute?.('aria-label')).toBe('Pod ended')
    })
  })
})
