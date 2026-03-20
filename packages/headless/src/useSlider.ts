import { useCallback, useRef, useState } from 'react'
import { useControllableState } from './useControllableState'

// ─── Helpers ────────────────────────────────────────────────────────────────

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

const snap = (v: number, step: number, min: number) =>
  Math.round((v - min) / step) * step + min

const pct = (v: number, min: number, max: number) =>
  max > min ? ((v - min) / (max - min)) * 100 : 0

// ─── Types ──────────────────────────────────────────────────────────────────

export interface UseSliderProps {
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  onValueChange?: (value: number | [number, number]) => void
}

export interface UseSliderReturn {
  /** Current value(s) as a tuple — [value, 0] for single, [lo, hi] for range */
  values: [number, number]
  /** Whether this is a range slider */
  isRange: boolean
  /** Percentage positions [p0, p1] (0–100) */
  percentages: [number, number]
  /** Index of the currently keyboard-focused thumb, or null */
  focusedThumb: number | null
  /** Whether the user is currently dragging */
  isDragging: boolean
  /** Props for the track element */
  getTrackProps: () => {
    ref: React.RefCallback<HTMLElement>
    onPointerDown: (e: React.PointerEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerUp: () => void
  }
  /** Props for a thumb element at the given index */
  getThumbProps: (index: number) => {
    role: 'slider'
    tabIndex: 0 | -1
    'aria-valuenow': number
    'aria-valuemin': number
    'aria-valuemax': number
    'aria-disabled': boolean | undefined
    onKeyDown: (e: React.KeyboardEvent) => void
    onFocus: (e: React.FocusEvent) => void
    onPointerDown: () => void
    onBlur: () => void
  }
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useSlider(props: UseSliderProps = {}): UseSliderReturn {
  const {
    value: valueProp,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    orientation = 'horizontal',
    onValueChange,
  } = props

  const isRange = Array.isArray(valueProp) || Array.isArray(defaultValue)
  const isHoriz = orientation === 'horizontal'

  // ── Controlled/uncontrolled state ──
  const initTuple = (): [number, number] => {
    if (isRange) {
      return Array.isArray(defaultValue) ? [defaultValue[0], defaultValue[1]] : [defaultValue, defaultValue]
    }
    return [Array.isArray(defaultValue) ? defaultValue[0] : defaultValue, 0]
  }

  const toTuple = (v: number | [number, number] | undefined): [number, number] | undefined => {
    if (v === undefined) return undefined
    if (Array.isArray(v)) return [v[0], v[1]]
    return [v, 0]
  }

  const [values, setValuesRaw] = useControllableState<[number, number]>({
    prop: toTuple(valueProp),
    defaultProp: initTuple(),
    onChange: (next) => {
      onValueChange?.(isRange ? next : next[0])
    },
  })

  const currentValues: [number, number] = values ?? [0, 0]

  // ── Focus / drag state ──
  const [focusedThumb, setFocusedThumb] = useState<number | null>(null)
  const dragging = useRef<number | null>(null)
  const trackRef = useRef<HTMLElement | null>(null)

  // ── Pointer → value ──
  const valFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = trackRef.current
      if (!el) return min
      const rect = el.getBoundingClientRect()
      const ratio = isHoriz
        ? (clientX - rect.left) / rect.width
        : 1 - (clientY - rect.top) / rect.height
      const raw = min + clamp(ratio, 0, 1) * (max - min)
      return clamp(snap(raw, step, min), min, max)
    },
    [isHoriz, min, max, step],
  )

  const setValues = useCallback(
    (next: [number, number]) => { setValuesRaw(next) },
    [setValuesRaw],
  )

  // ── Pointer handlers ──
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return
      const val = valFromPointer(e.clientX, e.clientY)
      if (isRange) {
        const d0 = Math.abs(val - currentValues[0])
        const d1 = Math.abs(val - currentValues[1])
        const idx = d0 <= d1 ? 0 : 1
        dragging.current = idx
        const next: [number, number] = [...currentValues]
        next[idx] = val
        if (next[0] > next[1]) next.reverse()
        setValues(next)
      } else {
        dragging.current = 0
        setValues([val, 0])
      }
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    [disabled, valFromPointer, isRange, currentValues, setValues],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current === null) return
      const val = valFromPointer(e.clientX, e.clientY)
      if (isRange) {
        const idx = dragging.current
        const next: [number, number] = [...currentValues]
        next[idx] = val
        if (next[0] > next[1]) {
          next.reverse()
          dragging.current = idx === 0 ? 1 : 0
        }
        setValues(next)
      } else {
        setValues([val, 0])
      }
    },
    [valFromPointer, isRange, currentValues, setValues],
  )

  const onPointerUp = useCallback(() => { dragging.current = null }, [])

  // ── Keyboard handler factory ──
  const makeKeyDown = useCallback(
    (idx: number) => (e: React.KeyboardEvent) => {
      if (disabled) return
      let delta = 0
      switch (e.key) {
        case 'ArrowRight': case 'ArrowUp': delta = step; break
        case 'ArrowLeft': case 'ArrowDown': delta = -step; break
        case 'Home': delta = min - currentValues[idx]; break
        case 'End': delta = max - currentValues[idx]; break
        case 'PageUp': delta = step * 10; break
        case 'PageDown': delta = -step * 10; break
        default: return
      }
      e.preventDefault()
      const newVal = clamp(currentValues[idx] + delta, min, max)
      if (isRange) {
        const next: [number, number] = [...currentValues]
        next[idx] = newVal
        if (next[0] > next[1]) next.reverse()
        setValues(next)
      } else {
        setValues([newVal, 0])
      }
    },
    [disabled, step, min, max, currentValues, isRange, setValues],
  )

  // ── Percentages ──
  const p0 = pct(currentValues[0], min, max)
  const p1 = isRange ? pct(currentValues[1], min, max) : p0

  // ── Prop getters ──
  const getTrackProps = useCallback(
    () => ({
      ref: (node: HTMLElement | null) => { trackRef.current = node },
      onPointerDown,
      onPointerMove,
      onPointerUp,
    }),
    [onPointerDown, onPointerMove, onPointerUp],
  )

  const getThumbProps = useCallback(
    (index: number) => ({
      role: 'slider' as const,
      tabIndex: (disabled ? -1 : 0) as 0 | -1,
      'aria-valuenow': currentValues[index],
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-disabled': disabled || undefined,
      onKeyDown: makeKeyDown(index),
      onFocus: (e: React.FocusEvent) => {
        if (e.currentTarget.matches(':focus-visible')) setFocusedThumb(index)
      },
      onPointerDown: () => setFocusedThumb(null),
      onBlur: () => setFocusedThumb(null),
    }),
    [disabled, currentValues, min, max, makeKeyDown],
  )

  return {
    values: currentValues,
    isRange,
    percentages: [p0, p1],
    focusedThumb,
    isDragging: dragging.current !== null,
    getTrackProps,
    getThumbProps,
  }
}
