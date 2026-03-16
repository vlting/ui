import { act, renderHook } from '@testing-library/react'
import { useToastQueue } from './useToastQueue'

describe('useToastQueue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('adding toasts', () => {
    it('add() returns an ID matching /^toast-/', () => {
      const { result } = renderHook(() => useToastQueue())
      let id: string
      act(() => {
        id = result.current.add({ message: 'Hello' })
      })
      expect(id!).toMatch(/^toast-/)
    })

    it('toast appears in toasts array', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'Hello' })
      })
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].message).toBe('Hello')
    })

    it('multiple toasts queue in order', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'First' })
        result.current.add({ message: 'Second' })
        result.current.add({ message: 'Third' })
      })
      expect(result.current.toasts).toHaveLength(3)
      expect(result.current.toasts[0].message).toBe('First')
      expect(result.current.toasts[1].message).toBe('Second')
      expect(result.current.toasts[2].message).toBe('Third')
    })

    it('custom properties preserved on toast', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'Custom', variant: 'error', icon: 'alert' })
      })
      expect(result.current.toasts[0].variant).toBe('error')
      expect(result.current.toasts[0].icon).toBe('alert')
    })
  })

  describe('removing toasts', () => {
    it('remove(id) removes specific toast', () => {
      const { result } = renderHook(() => useToastQueue())
      let id: string
      act(() => {
        id = result.current.add({ message: 'Remove me' })
        result.current.add({ message: 'Keep me' })
      })
      expect(result.current.toasts).toHaveLength(2)
      act(() => {
        result.current.remove(id!)
      })
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].message).toBe('Keep me')
    })

    it('removeAll clears all toasts', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'A' })
        result.current.add({ message: 'B' })
      })
      expect(result.current.toasts).toHaveLength(2)
      act(() => {
        result.current.removeAll()
      })
      expect(result.current.toasts).toHaveLength(0)
    })

    it('removing non-existent ID is a no-op', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'Stay' })
      })
      act(() => {
        result.current.remove('nonexistent-id')
      })
      expect(result.current.toasts).toHaveLength(1)
    })
  })

  describe('auto-dismiss', () => {
    it('toast auto-removed after default 5000ms', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'Hello' })
      })
      expect(result.current.toasts).toHaveLength(1)
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      expect(result.current.toasts).toHaveLength(0)
    })

    it('custom duration respected', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'Quick', duration: 1000 })
      })
      expect(result.current.toasts).toHaveLength(1)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(result.current.toasts).toHaveLength(0)
    })

    it('timer cleared if manually removed before expiry', () => {
      const { result } = renderHook(() => useToastQueue())
      let id: string
      act(() => {
        id = result.current.add({ message: 'Manual remove' })
      })
      act(() => {
        result.current.remove(id!)
      })
      expect(result.current.toasts).toHaveLength(0)
      // Advance past the default duration — should not throw or cause issues
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      expect(result.current.toasts).toHaveLength(0)
    })
  })

  describe('timer management', () => {
    it('timers cleaned up on unmount', () => {
      const { result, unmount } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'Will unmount' })
      })
      unmount()
      // Should not throw when timers fire after unmount
      expect(() => {
        jest.advanceTimersByTime(5000)
      }).not.toThrow()
    })

    it('multiple toasts each have independent timers', () => {
      const { result } = renderHook(() => useToastQueue())
      act(() => {
        result.current.add({ message: 'Short', duration: 1000 })
        result.current.add({ message: 'Long', duration: 3000 })
      })
      expect(result.current.toasts).toHaveLength(2)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].message).toBe('Long')
      act(() => {
        jest.advanceTimersByTime(2000)
      })
      expect(result.current.toasts).toHaveLength(0)
    })
  })

  describe('store isolation', () => {
    it('two hook instances have separate queues', () => {
      const { result: result1 } = renderHook(() => useToastQueue())
      const { result: result2 } = renderHook(() => useToastQueue())
      act(() => {
        result1.current.add({ message: 'Queue 1' })
      })
      expect(result1.current.toasts).toHaveLength(1)
      expect(result2.current.toasts).toHaveLength(0)
    })
  })

  describe('aria-live', () => {
    it.todo('wraps queue in aria-live region — see useLiveRegion Stage 5.3')
  })
})
