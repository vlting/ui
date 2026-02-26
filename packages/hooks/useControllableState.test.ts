import { act, renderHook } from '@testing-library/react'
import { useControllableState } from './useControllableState'

describe('useControllableState', () => {
  describe('uncontrolled mode', () => {
    it('returns defaultProp as initial value', () => {
      const { result } = renderHook(() => useControllableState({ defaultProp: 'hello' }))
      expect(result.current[0]).toBe('hello')
    })

    it('updates value via setValue', () => {
      const { result } = renderHook(() => useControllableState({ defaultProp: 'hello' }))

      act(() => {
        result.current[1]('world')
      })

      expect(result.current[0]).toBe('world')
    })

    it('calls onChange when value changes', () => {
      const onChange = jest.fn()
      const { result } = renderHook(() =>
        useControllableState({ defaultProp: 'hello', onChange }),
      )

      act(() => {
        result.current[1]('world')
      })

      expect(onChange).toHaveBeenCalledWith('world')
    })

    it('returns undefined when no defaultProp is provided', () => {
      const { result } = renderHook(() => useControllableState({}))
      expect(result.current[0]).toBeUndefined()
    })
  })

  describe('controlled mode', () => {
    it('returns the controlled prop value', () => {
      const { result } = renderHook(() => useControllableState({ prop: 'controlled' }))
      expect(result.current[0]).toBe('controlled')
    })

    it('ignores defaultProp when prop is provided', () => {
      const { result } = renderHook(() =>
        useControllableState({ prop: 'controlled', defaultProp: 'default' }),
      )
      expect(result.current[0]).toBe('controlled')
    })

    it('calls onChange when setValue is called', () => {
      const onChange = jest.fn()
      const { result } = renderHook(() =>
        useControllableState({ prop: 'controlled', onChange }),
      )

      act(() => {
        result.current[1]('new-value')
      })

      expect(onChange).toHaveBeenCalledWith('new-value')
    })

    it('value follows prop changes', () => {
      const { result, rerender } = renderHook(
        ({ prop }) => useControllableState({ prop }),
        { initialProps: { prop: 'a' as string | undefined } },
      )

      expect(result.current[0]).toBe('a')

      rerender({ prop: 'b' })
      expect(result.current[0]).toBe('b')
    })
  })

  describe('edge cases', () => {
    it('handles numeric values', () => {
      const { result } = renderHook(() => useControllableState({ defaultProp: 0 }))
      expect(result.current[0]).toBe(0)

      act(() => {
        result.current[1](42)
      })
      expect(result.current[0]).toBe(42)
    })

    it('handles boolean values', () => {
      const { result } = renderHook(() => useControllableState({ defaultProp: false }))
      expect(result.current[0]).toBe(false)

      act(() => {
        result.current[1](true)
      })
      expect(result.current[0]).toBe(true)
    })
  })
})
