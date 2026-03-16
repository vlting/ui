import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { useLiveRegion, type UseLiveRegionProps } from './useLiveRegion'

const mockAnnounce = jest.fn()
const mockClearAnnouncer = jest.fn()

jest.mock('./_adapters/react-aria', () => ({
  announce: (...args: unknown[]) => mockAnnounce(...args),
  clearAnnouncer: (...args: unknown[]) => mockClearAnnouncer(...args),
}))

function LiveRegionFixture(props: UseLiveRegionProps = {}) {
  const { announce, getLiveRegionProps } = useLiveRegion(props)
  return (
    <div>
      <div {...getLiveRegionProps()} data-testid="region" />
      <button data-testid="announce" onClick={() => announce('Hello')}>
        Announce
      </button>
      <button
        data-testid="announce-assertive"
        onClick={() => announce('Urgent', 'assertive')}
      >
        Announce Assertive
      </button>
    </div>
  )
}

describe('useLiveRegion', () => {
  beforeEach(() => {
    mockAnnounce.mockClear()
    mockClearAnnouncer.mockClear()
  })

  describe('announce', () => {
    it('calls react-aria announce with message and default politeness', () => {
      render(<LiveRegionFixture />)
      fireEvent.click(screen.getByTestId('announce'))
      expect(mockAnnounce).toHaveBeenCalledWith('Hello', 'polite')
    })

    it('respects per-call politeness override', () => {
      render(<LiveRegionFixture />)
      fireEvent.click(screen.getByTestId('announce-assertive'))
      expect(mockAnnounce).toHaveBeenCalledWith('Urgent', 'assertive')
    })

    it('uses hook-level politeness as default', () => {
      render(<LiveRegionFixture politeness="assertive" />)
      fireEvent.click(screen.getByTestId('announce'))
      expect(mockAnnounce).toHaveBeenCalledWith('Hello', 'assertive')
    })
  })

  describe('getLiveRegionProps', () => {
    it('returns role=status for polite', () => {
      render(<LiveRegionFixture />)
      expect(screen.getByTestId('region')).toHaveAttribute('role', 'status')
    })

    it('returns role=alert for assertive', () => {
      render(<LiveRegionFixture politeness="assertive" />)
      expect(screen.getByTestId('region')).toHaveAttribute('role', 'alert')
    })

    it('returns aria-live matching politeness', () => {
      render(<LiveRegionFixture />)
      expect(screen.getByTestId('region')).toHaveAttribute('aria-live', 'polite')
    })

    it('returns aria-live=assertive when assertive', () => {
      render(<LiveRegionFixture politeness="assertive" />)
      expect(screen.getByTestId('region')).toHaveAttribute('aria-live', 'assertive')
    })

    it('returns aria-atomic=true', () => {
      render(<LiveRegionFixture />)
      expect(screen.getByTestId('region')).toHaveAttribute('aria-atomic', 'true')
    })
  })

  describe('cleanup', () => {
    it('clearAnnouncer called on unmount', () => {
      const { unmount } = render(<LiveRegionFixture />)
      unmount()
      expect(mockClearAnnouncer).toHaveBeenCalledWith('polite')
    })
  })

  describe('prop-getter shape', () => {
    it('getLiveRegionProps returns correct object shape', () => {
      const { result } = renderHook(() => useLiveRegion())
      const props = result.current.getLiveRegionProps()
      expect(props).toEqual({
        role: 'status',
        'aria-live': 'polite',
        'aria-atomic': true,
      })
    })
  })
})
