import { act, renderHook } from '@testing-library/react'
import { useAutoplay } from './useAutoplay'

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('useAutoplay', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockMatchMedia(false)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('basic behavior', () => {
    it('starts playing when enabled (default)', () => {
      const onTick = jest.fn()
      const { result } = renderHook(() => useAutoplay({ onTick }))
      expect(result.current.isPlaying).toBe(true)
    })

    it('calls onTick at interval', () => {
      const onTick = jest.fn()
      renderHook(() => useAutoplay({ onTick, interval: 1000 }))

      act(() => { jest.advanceTimersByTime(1000) })
      expect(onTick).toHaveBeenCalledTimes(1)

      act(() => { jest.advanceTimersByTime(1000) })
      expect(onTick).toHaveBeenCalledTimes(2)
    })

    it('uses default interval of 5000ms', () => {
      const onTick = jest.fn()
      renderHook(() => useAutoplay({ onTick }))

      act(() => { jest.advanceTimersByTime(4999) })
      expect(onTick).not.toHaveBeenCalled()

      act(() => { jest.advanceTimersByTime(1) })
      expect(onTick).toHaveBeenCalledTimes(1)
    })

    it('stops when enabled=false', () => {
      const onTick = jest.fn()
      const { result } = renderHook(() =>
        useAutoplay({ onTick, enabled: false }),
      )
      expect(result.current.isPlaying).toBe(false)

      act(() => { jest.advanceTimersByTime(10000) })
      expect(onTick).not.toHaveBeenCalled()
    })
  })

  describe('manual control', () => {
    it('pause() stops ticking', () => {
      const onTick = jest.fn()
      const { result } = renderHook(() =>
        useAutoplay({ onTick, interval: 1000 }),
      )

      act(() => { result.current.pause() })
      expect(result.current.isPlaying).toBe(false)

      act(() => { jest.advanceTimersByTime(5000) })
      expect(onTick).not.toHaveBeenCalled()
    })

    it('play() resumes after pause', () => {
      const onTick = jest.fn()
      const { result } = renderHook(() =>
        useAutoplay({ onTick, interval: 1000 }),
      )

      act(() => { result.current.pause() })
      act(() => { result.current.play() })
      expect(result.current.isPlaying).toBe(true)

      act(() => { jest.advanceTimersByTime(1000) })
      expect(onTick).toHaveBeenCalledTimes(1)
    })

    it('toggle() flips pause state', () => {
      const onTick = jest.fn()
      const { result } = renderHook(() =>
        useAutoplay({ onTick, interval: 1000 }),
      )

      act(() => { result.current.toggle() })
      expect(result.current.isPlaying).toBe(false)

      act(() => { result.current.toggle() })
      expect(result.current.isPlaying).toBe(true)
    })
  })

  describe('reduced motion', () => {
    it('isPlaying is false when prefers-reduced-motion matches', () => {
      mockMatchMedia(true)
      const onTick = jest.fn()
      const { result } = renderHook(() => useAutoplay({ onTick }))
      expect(result.current.isPlaying).toBe(false)

      act(() => { jest.advanceTimersByTime(10000) })
      expect(onTick).not.toHaveBeenCalled()
    })
  })

  describe('interval management', () => {
    it('changing interval restarts timer', () => {
      const onTick = jest.fn()
      const { rerender } = renderHook(
        ({ interval }) => useAutoplay({ onTick, interval }),
        { initialProps: { interval: 1000 } },
      )

      act(() => { jest.advanceTimersByTime(500) })
      rerender({ interval: 2000 })

      act(() => { jest.advanceTimersByTime(1500) })
      expect(onTick).not.toHaveBeenCalled()

      act(() => { jest.advanceTimersByTime(500) })
      expect(onTick).toHaveBeenCalledTimes(1)
    })

    it('unmount clears timer', () => {
      const onTick = jest.fn()
      const { unmount } = renderHook(() =>
        useAutoplay({ onTick, interval: 1000 }),
      )

      unmount()
      act(() => { jest.advanceTimersByTime(5000) })
      expect(onTick).not.toHaveBeenCalled()
    })
  })

  describe('onTick ref', () => {
    it('uses latest onTick callback (no stale closure)', () => {
      const onTick1 = jest.fn()
      const onTick2 = jest.fn()
      const { rerender } = renderHook(
        ({ onTick }) => useAutoplay({ onTick, interval: 1000 }),
        { initialProps: { onTick: onTick1 } },
      )

      rerender({ onTick: onTick2 })

      act(() => { jest.advanceTimersByTime(1000) })
      expect(onTick1).not.toHaveBeenCalled()
      expect(onTick2).toHaveBeenCalledTimes(1)
    })
  })

  describe('isPlaying derivation', () => {
    it('false when enabled=false regardless of pause state', () => {
      const onTick = jest.fn()
      const { result } = renderHook(() =>
        useAutoplay({ onTick, enabled: false }),
      )

      act(() => { result.current.play() })
      expect(result.current.isPlaying).toBe(false)
    })

    it('false when reducedMotion regardless of enabled/pause', () => {
      mockMatchMedia(true)
      const onTick = jest.fn()
      const { result } = renderHook(() => useAutoplay({ onTick }))

      act(() => { result.current.play() })
      expect(result.current.isPlaying).toBe(false)
    })
  })
})
