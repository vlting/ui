import { act, renderHook } from '@testing-library/react'
import { useAccordion } from './useAccordion'

describe('useAccordion', () => {
  describe('single mode', () => {
    it('opens one item at a time', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', defaultValue: [] }),
      )

      act(() => result.current.toggleItem('a'))
      expect(result.current.value).toEqual(['a'])

      act(() => result.current.toggleItem('b'))
      expect(result.current.value).toEqual(['b'])
    })

    it('collapses last item when collapsible=true (default)', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', defaultValue: ['a'] }),
      )

      expect(result.current.isExpanded('a')).toBe(true)
      act(() => result.current.toggleItem('a'))
      expect(result.current.value).toEqual([])
    })

    it('keeps last item open when collapsible=false', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', collapsible: false, defaultValue: ['a'] }),
      )

      act(() => result.current.toggleItem('a'))
      expect(result.current.value).toEqual(['a'])
    })
  })

  describe('multiple mode', () => {
    it('toggles items independently', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'multiple', defaultValue: [] }),
      )

      act(() => result.current.toggleItem('a'))
      act(() => result.current.toggleItem('b'))
      expect(result.current.value).toEqual(['a', 'b'])

      act(() => result.current.toggleItem('a'))
      expect(result.current.value).toEqual(['b'])
    })
  })

  describe('controlled mode', () => {
    it('calls onValueChange without mutating value', () => {
      const onValueChange = jest.fn()
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', value: [], onValueChange }),
      )

      act(() => result.current.toggleItem('a'))
      expect(onValueChange).toHaveBeenCalledWith(['a'])
      // Value stays controlled
      expect(result.current.value).toEqual([])
    })
  })

  describe('uncontrolled mode', () => {
    it('uses defaultValue', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'multiple', defaultValue: ['a', 'b'] }),
      )

      expect(result.current.isExpanded('a')).toBe(true)
      expect(result.current.isExpanded('b')).toBe(true)
      expect(result.current.isExpanded('c')).toBe(false)
    })
  })

  describe('disabled', () => {
    it('prevents toggles', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', disabled: true, defaultValue: [] }),
      )

      act(() => result.current.toggleItem('a'))
      expect(result.current.value).toEqual([])
    })
  })

  describe('prop-getters', () => {
    it('getTriggerProps returns correct aria attributes', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', defaultValue: ['a'] }),
      )

      act(() => { result.current.registerItem('a') })

      const triggerProps = result.current.getTriggerProps('a', 0)
      expect(triggerProps['aria-expanded']).toBe(true)
      expect(triggerProps['aria-controls']).toContain('content-a')
      expect(triggerProps.id).toContain('trigger-a')
    })

    it('getContentProps returns correct region attributes', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', defaultValue: ['a'] }),
      )

      const contentProps = result.current.getContentProps('a')
      expect(contentProps.role).toBe('region')
      expect(contentProps['aria-labelledby']).toContain('trigger-a')
      expect(contentProps.hidden).toBe(false)

      const hiddenProps = result.current.getContentProps('b')
      expect(hiddenProps.hidden).toBe(true)
    })

    it('getTriggerProps includes disabled when accordion disabled', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', disabled: true, defaultValue: [] }),
      )

      act(() => { result.current.registerItem('a') })

      const triggerProps = result.current.getTriggerProps('a', 0)
      expect(triggerProps.disabled).toBe(true)
    })
  })

  describe('registration', () => {
    it('registerItem returns stable indices', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', defaultValue: [] }),
      )

      let idxA: number, idxB: number
      act(() => { idxA = result.current.registerItem('a') })
      act(() => { idxB = result.current.registerItem('b') })
      expect(idxA!).toBe(0)
      expect(idxB!).toBe(1)

      // Re-registering returns same index
      let idxA2: number
      act(() => { idxA2 = result.current.registerItem('a') })
      expect(idxA2!).toBe(0)
    })

    it('unregisterItem removes item', () => {
      const { result } = renderHook(() =>
        useAccordion({ type: 'single', defaultValue: [] }),
      )

      act(() => { result.current.registerItem('a') })
      act(() => { result.current.registerItem('b') })
      act(() => { result.current.unregisterItem('a') })

      // After unregister, 'b' is at index 0
      let idxB: number
      act(() => { idxB = result.current.registerItem('b') })
      expect(idxB!).toBe(0)
    })
  })
})
