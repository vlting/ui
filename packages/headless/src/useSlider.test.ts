import { act, renderHook } from '@testing-library/react'
import { useSlider } from './useSlider'

describe('useSlider', () => {
  describe('uncontrolled mode', () => {
    it('defaults to 0 with min=0 max=100', () => {
      const { result } = renderHook(() => useSlider())
      expect(result.current.values).toEqual([0, 0])
      expect(result.current.percentages).toEqual([0, 0])
    })

    it('uses defaultValue', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: 50 }))
      expect(result.current.values).toEqual([50, 0])
      expect(result.current.percentages[0]).toBe(50)
    })

    it('updates via keyboard (ArrowRight)', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: 50, step: 5 }))
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'ArrowRight', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(result.current.values[0]).toBe(55)
    })

    it('updates via keyboard (ArrowLeft)', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: 50, step: 5 }))
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'ArrowLeft', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(result.current.values[0]).toBe(45)
    })

    it('Home sets to min', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: 50, min: 10 }))
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'Home', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(result.current.values[0]).toBe(10)
    })

    it('End sets to max', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: 50, max: 80 }))
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'End', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(result.current.values[0]).toBe(80)
    })
  })

  describe('controlled mode', () => {
    it('reflects controlled value', () => {
      const { result } = renderHook(() => useSlider({ value: 75 }))
      expect(result.current.values[0]).toBe(75)
      expect(result.current.percentages[0]).toBe(75)
    })

    it('calls onValueChange on keyboard interaction', () => {
      const onValueChange = jest.fn()
      const { result } = renderHook(() =>
        useSlider({ value: 50, onValueChange }),
      )
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'ArrowRight', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(onValueChange).toHaveBeenCalledWith(51)
    })
  })

  describe('clamping', () => {
    it('clamps at max', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: 99, max: 100, step: 5 }))
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'ArrowRight', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(result.current.values[0]).toBe(100)
    })

    it('clamps at min', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: 2, min: 0, step: 5 }))
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'ArrowLeft', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(result.current.values[0]).toBe(0)
    })
  })

  describe('disabled', () => {
    it('sets tabIndex to -1 when disabled', () => {
      const { result } = renderHook(() => useSlider({ disabled: true }))
      expect(result.current.getThumbProps(0).tabIndex).toBe(-1)
    })

    it('ignores keyboard when disabled', () => {
      const onValueChange = jest.fn()
      const { result } = renderHook(() =>
        useSlider({ defaultValue: 50, disabled: true, onValueChange }),
      )
      const thumbProps = result.current.getThumbProps(0)

      act(() => {
        thumbProps.onKeyDown({ key: 'ArrowRight', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(onValueChange).not.toHaveBeenCalled()
      expect(result.current.values[0]).toBe(50)
    })
  })

  describe('range mode', () => {
    it('detects range from defaultValue array', () => {
      const { result } = renderHook(() => useSlider({ defaultValue: [20, 80] }))
      expect(result.current.isRange).toBe(true)
      expect(result.current.values).toEqual([20, 80])
    })

    it('calls onValueChange with tuple for range', () => {
      const onValueChange = jest.fn()
      const { result } = renderHook(() =>
        useSlider({ defaultValue: [20, 80], onValueChange }),
      )
      const thumbProps = result.current.getThumbProps(1)

      act(() => {
        thumbProps.onKeyDown({ key: 'ArrowRight', preventDefault: jest.fn() } as unknown as React.KeyboardEvent)
      })

      expect(onValueChange).toHaveBeenCalledWith([20, 81])
    })
  })

  describe('prop getters', () => {
    it('getTrackProps returns ref and pointer handlers', () => {
      const { result } = renderHook(() => useSlider())
      const trackProps = result.current.getTrackProps()
      expect(typeof trackProps.ref).toBe('function')
      expect(typeof trackProps.onPointerDown).toBe('function')
      expect(typeof trackProps.onPointerMove).toBe('function')
      expect(typeof trackProps.onPointerUp).toBe('function')
    })

    it('getThumbProps returns ARIA attributes', () => {
      const { result } = renderHook(() => useSlider({ value: 42, min: 10, max: 90 }))
      const thumbProps = result.current.getThumbProps(0)
      expect(thumbProps.role).toBe('slider')
      expect(thumbProps['aria-valuenow']).toBe(42)
      expect(thumbProps['aria-valuemin']).toBe(10)
      expect(thumbProps['aria-valuemax']).toBe(90)
    })
  })
})
