import { type ComponentPropsWithRef, type ReactNode, forwardRef, useCallback, useRef, useState } from 'react'
import { styled, type STL } from '../../stl-react/src/config'

// ─── Theme map ──────────────────────────────────────────────────────────────

const themeFill: Record<string, STL> = {
  primary: { bg: '$primary9' },
  secondary: { bg: '$secondary9' },
  neutral: { bg: '$neutral9' },
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const SliderTrack = styled('div', {
  position: 'relative',
  bg: '$maxAlpha4',
  radius: '$pill',
  cursor: 'pointer',
}, {
  name: 'Slider',
  variants: {
    orientation: {
      horizontal: { width: '100%' },
      vertical: { height: '100%' },
    },
    size: { sm: {}, md: {}, lg: {} },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  compoundVariants: [
    { when: { orientation: 'horizontal', size: 'sm' }, stl: { height: '$4' } },
    { when: { orientation: 'horizontal', size: 'md' }, stl: { height: '$6' } },
    { when: { orientation: 'horizontal', size: 'lg' }, stl: { height: '$8' } },
    { when: { orientation: 'vertical', size: 'sm' }, stl: { width: '$4' } },
    { when: { orientation: 'vertical', size: 'md' }, stl: { width: '$6' } },
    { when: { orientation: 'vertical', size: 'lg' }, stl: { width: '$8' } },
  ],
  defaultVariants: { orientation: 'horizontal', size: 'md' },
})

const SliderFill = styled('div', {
  position: 'absolute',
  radius: '$pill',
}, {
  name: 'SliderFill',
  variants: {
    orientation: {
      horizontal: { top: '$0', bottom: '$0' },
      vertical: { left: '$0', right: '$0' },
    },
  },
  defaultVariants: { orientation: 'horizontal' },
})

const SliderCustomTrack = styled('div', {
  position: 'absolute',
  top: '$0', left: '$0', right: '$0', bottom: '$0',
  radius: 'inherit',
  overflow: 'hidden',
  pointerEvents: 'none',
}, { name: 'SliderCustomTrack' })

const SliderThumb = styled('div', {
  position: 'absolute',
  radius: '$round',
  bg: 'white',
  border: '$neutral7',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  cursor: 'grab',
  outline: 'none',
  transitionProperty: 'box-shadow, border-color',
  transitionDuration: '$fastDuration',
  ':hover': { bg: '#f0f0f0' },
  ':focus-visible': { bg: '#f0f0f0', outline: '$neutral', outlineOffset: '$offsetDefault' },
  ':active': { cursor: 'grabbing' },
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'SliderThumb',
  variants: {
    size: {
      sm: { width: '$16', height: '$16' },
      md: { width: '$20', height: '$20' },
      lg: { width: '$24', height: '$24' },
    },
    orientation: {
      horizontal: { top: '50%', transform: 'translate(-50%, -50%)' },
      vertical: { left: '50%', transform: 'translate(-50%, 50%)' },
    },
  },
  defaultVariants: { size: 'md', orientation: 'horizontal' },
})

// ─── Helpers ────────────────────────────────────────────────────────────────

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

const snap = (v: number, step: number, min: number) =>
  Math.round((v - min) / step) * step + min

const pct = (v: number, min: number, max: number) =>
  max > min ? ((v - min) / (max - min)) * 100 : 0

// Touch target padding — ensures ≥44px interactive area
const thumbPad: Record<string, number> = { sm: 14, md: 12, lg: 10 }

// ─── Types ──────────────────────────────────────────────────────────────────

type TrackProps = ComponentPropsWithRef<typeof SliderTrack>

export type SliderProps = Omit<TrackProps, 'onChange' | 'value' | 'defaultValue'> & {
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  onValueChange?: (value: number | [number, number]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  theme?: 'primary' | 'secondary' | 'neutral'
  orientation?: 'horizontal' | 'vertical'
  children?: ReactNode
  'aria-label'?: string
}

// ─── Slider ─────────────────────────────────────────────────────────────────

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: valueProp,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      size = 'md',
      theme = 'primary',
      orientation = 'horizontal',
      children,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const isRange = Array.isArray(valueProp) || Array.isArray(defaultValue)
    const isHoriz = orientation === 'horizontal'

    const [internal, setInternal] = useState<[number, number]>(() => {
      const dv = defaultValue
      if (isRange) {
        return Array.isArray(dv) ? [dv[0], dv[1]] : [dv, dv]
      }
      return [Array.isArray(dv) ? dv[0] : dv, 0]
    })

    const controlled = valueProp !== undefined
    const values: [number, number] = controlled
      ? (Array.isArray(valueProp) ? [valueProp[0], valueProp[1]] : [valueProp, 0])
      : internal

    const setValues = useCallback(
      (next: [number, number]) => {
        if (!controlled) setInternal(next)
        if (onValueChange) {
          onValueChange(isRange ? next : next[0])
        }
      },
      [controlled, isRange, onValueChange],
    )

    const trackRef = useRef<HTMLDivElement>(null)
    const dragging = useRef<number | null>(null)

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

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return
        const val = valFromPointer(e.clientX, e.clientY)
        if (isRange) {
          const d0 = Math.abs(val - values[0])
          const d1 = Math.abs(val - values[1])
          const idx = d0 <= d1 ? 0 : 1
          dragging.current = idx
          const next: [number, number] = [...values]
          next[idx] = val
          if (next[0] > next[1]) next.reverse()
          setValues(next)
        } else {
          dragging.current = 0
          setValues([val, 0])
        }
        e.currentTarget.setPointerCapture(e.pointerId)
      },
      [disabled, valFromPointer, isRange, values, setValues],
    )

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (dragging.current === null) return
        const val = valFromPointer(e.clientX, e.clientY)
        if (isRange) {
          const idx = dragging.current
          const next: [number, number] = [...values]
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
      [valFromPointer, isRange, values, setValues],
    )

    const onPointerUp = useCallback(() => { dragging.current = null }, [])

    const makeKeyDown = (idx: number) => (e: React.KeyboardEvent) => {
      if (disabled) return
      let delta = 0
      switch (e.key) {
        case 'ArrowRight': case 'ArrowUp': delta = step; break
        case 'ArrowLeft': case 'ArrowDown': delta = -step; break
        case 'Home': delta = min - values[idx]; break
        case 'End': delta = max - values[idx]; break
        case 'PageUp': delta = step * 10; break
        case 'PageDown': delta = -step * 10; break
        default: return
      }
      e.preventDefault()
      const newVal = clamp(values[idx] + delta, min, max)
      if (isRange) {
        const next: [number, number] = [...values]
        next[idx] = newVal
        if (next[0] > next[1]) next.reverse()
        setValues(next)
      } else {
        setValues([newVal, 0])
      }
    }

    // Percentages
    const p0 = pct(values[0], min, max)
    const p1 = isRange ? pct(values[1], min, max) : p0

    const fillStl: STL = isHoriz
      ? isRange
        ? { left: `${p0}%`, width: `${p1 - p0}%` }
        : { left: '0%', width: `${p0}%` }
      : isRange
        ? { bottom: `${p0}%`, height: `${p1 - p0}%` }
        : { bottom: '0%', height: `${p0}%` }

    return (
      <SliderTrack
        ref={(node) => {
          (trackRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        orientation={orientation}
        size={size}
        disabled={disabled}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        {...rest}
      >
        {children
          ? <SliderCustomTrack>{children}</SliderCustomTrack>
          : <SliderFill orientation={orientation} stl={{ ...fillStl, ...themeFill[theme] }} />
        }
        <SliderThumb
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuenow={values[0]}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={isRange ? (ariaLabel ? `${ariaLabel} minimum` : 'Minimum') : ariaLabel}
          aria-disabled={disabled || undefined}
          orientation={orientation}
          size={size}
          onKeyDown={makeKeyDown(0)}
          stl={{
            ...(isHoriz ? { left: `${p0}%` } : { bottom: `${p0}%` }),
            p: `${thumbPad[size]}rem`,
          }}
        />
        {isRange && (
          <SliderThumb
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={values[1]}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label={ariaLabel ? `${ariaLabel} maximum` : 'Maximum'}
            aria-disabled={disabled || undefined}
            orientation={orientation}
            size={size}
            onKeyDown={makeKeyDown(1)}
            stl={{
              ...(isHoriz ? { left: `${p1}%` } : { bottom: `${p1}%` }),
              p: `${thumbPad[size]}rem`,
            }}
          />
        )}
      </SliderTrack>
    )
  },
)
Slider.displayName = 'Slider'
