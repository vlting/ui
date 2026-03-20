import { type ComponentPropsWithRef, forwardRef, useCallback, useRef } from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled, type STL } from '../../stl-react/src/config'

// ─── Theme map ──────────────────────────────────────────────────────────────

const themeIndicatorBg: Record<string, STL> = {
  primary: { bg: '$primary9' },
  secondary: { bg: '$secondary9' },
  neutral: { bg: '$neutral9' },
}

// ─── Fill ───────────────────────────────────────────────────────────────────

const SliderFill = styled('div', {
  height: '100%',
  radius: '$pill',
}, { name: 'SliderFill' })

// ─── Thumb ──────────────────────────────────────────────────────────────────

const SliderThumb = styled('div', {
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  radius: '$round',
  bg: 'white',
  border: '$neutral6',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  transitionProperty: 'box-shadow',
  transitionDuration: '$fastDuration',
  outline: 'none',
  ':focus-visible': { outline: '$neutral', outlineOffset: '$offsetDefault' },
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'SliderThumb',
  variants: {
    size: {
      sm: { width: '$16', height: '$16' },
      md: { width: '$20', height: '$20' },
      lg: { width: '$24', height: '$24' },
    },
  },
  defaultVariants: { size: 'md' },
})

// ─── Track ──────────────────────────────────────────────────────────────────

const SliderTrack = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  bg: '$maxAlpha4',
  radius: '$pill',
  cursor: 'pointer',
  outline: 'none',
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'Slider',
  variants: {
    size: {
      sm: { height: '$4' },
      md: { height: '$6' },
      lg: { height: '$8' },
    },
    theme: {
      primary: {},
      secondary: {},
      neutral: {},
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  defaultVariants: { size: 'md', theme: 'primary' },
})

// ─── Slider ─────────────────────────────────────────────────────────────────

type TrackProps = ComponentPropsWithRef<typeof SliderTrack>

export type SliderProps = Omit<TrackProps, 'onChange'> & {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  theme?: 'primary' | 'secondary' | 'neutral'
}

const clamp = (v: number, min: number, max: number, step: number) =>
  Math.min(max, Math.max(min, Math.round(v / step) * step))

// Touch target padding (px) — ensures ≥44px interactive area
const thumbPad: Record<string, number> = { sm: 14, md: 12, lg: 10 }

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: valueProp,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled,
      size = 'md',
      theme = 'primary',
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState<number>({
      prop: valueProp,
      defaultProp: defaultValue ?? min,
      onChange: onValueChange,
    })

    const trackRef = useRef<HTMLDivElement>(null)

    const resolveValue = useCallback(
      (clientX: number) => {
        const el = trackRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        setValue(clamp(min + pct * (max - min), min, max, step))
      },
      [min, max, step, setValue],
    )

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return
        e.preventDefault()
        const target = e.currentTarget as HTMLElement
        target.setPointerCapture(e.pointerId)
        resolveValue(e.clientX)

        const onMove = (ev: PointerEvent) => resolveValue(ev.clientX)
        const onUp = () => {
          target.removeEventListener('pointermove', onMove)
          target.removeEventListener('pointerup', onUp)
        }
        target.addEventListener('pointermove', onMove)
        target.addEventListener('pointerup', onUp)
      },
      [disabled, resolveValue],
    )

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return
        let next = value ?? min
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            next = clamp((value ?? min) + step, min, max, step)
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            next = clamp((value ?? min) - step, min, max, step)
            break
          case 'Home':
            next = min
            break
          case 'End':
            next = max
            break
          default:
            return
        }
        e.preventDefault()
        setValue(next)
      },
      [disabled, value, min, max, step, setValue],
    )

    const pct = max > min ? ((value ?? min) - min) / (max - min) * 100 : 0

    return (
      <SliderTrack
        ref={(node) => {
          (trackRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        role="slider"
        aria-valuenow={value ?? min}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled || undefined}
        aria-label={rest['aria-label']}
        tabIndex={disabled ? -1 : 0}
        size={size}
        theme={theme}
        disabled={disabled}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        {...rest}
      >
        <SliderFill stl={{ width: `${pct}%`, height: '100%', ...themeIndicatorBg[theme] }} />
        <SliderThumb
          size={size}
          stl={{ left: `${pct}%`, p: `${thumbPad[size]}rem` }}
        />
      </SliderTrack>
    )
  },
)
Slider.displayName = 'Slider'
