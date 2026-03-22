import { type ReactNode, forwardRef, useCallback, useRef, useState } from 'react'
import { Animated, PanResponder, View } from 'react-native'
import type { ViewStyle, LayoutChangeEvent } from 'react-native'
import { styled } from '../../stl-native/src/config'
import { useControllableState } from '../../headless/src/useControllableState'

// ─── Helpers ────────────────────────────────────────────────────────────────

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const snap = (v: number, step: number, min: number) =>
  Math.round((v - min) / step) * step + min
const pct = (v: number, min: number, max: number) =>
  max > min ? ((v - min) / (max - min)) * 100 : 0

// ─── Styled ─────────────────────────────────────────────────────────────────

const TrackBase = styled(View, {
  borderRadius: 999,
  backgroundColor: '$neutral4',
  justifyContent: 'center',
}, {
  size: {
    sm: { height: 4 },
    md: { height: 6 },
    lg: { height: 8 },
  },
  disabled: {
    true: { opacity: 0.5 },
  },
}, 'SliderTrack')

const FillBase = styled(View, {
  position: 'absolute',
  borderRadius: 999,
  top: 0,
  bottom: 0,
}, {
  theme: {
    primary: { backgroundColor: '$primary9' },
    secondary: { backgroundColor: '$secondary9' },
    neutral: { backgroundColor: '$neutral9' },
  },
}, 'SliderFill')

const ThumbBase = styled(View, {
  position: 'absolute',
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: '$min',
  borderWidth: 2,
  top: -7,
}, {
  size: {
    sm: { width: 16, height: 16, borderRadius: 8, top: -6 },
    md: { width: 20, height: 20, borderRadius: 10, top: -7 },
    lg: { width: 24, height: 24, borderRadius: 12, top: -8 },
  },
  theme: {
    primary: { borderColor: '$primary9' },
    secondary: { borderColor: '$secondary9' },
    neutral: { borderColor: '$neutral9' },
  },
}, 'SliderThumb')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SliderProps {
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  onValueChange?: (value: number | [number, number]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  theme?: 'primary' | 'secondary' | 'neutral'
  children?: ReactNode
  style?: ViewStyle
}

// ─── Thumb sizes ────────────────────────────────────────────────────────────

const THUMB_SIZES: Record<string, number> = { sm: 16, md: 20, lg: 24 }

// ─── Slider ─────────────────────────────────────────────────────────────────

export const Slider = forwardRef<View, SliderProps>(
  ({
    value: valueProp,
    defaultValue = 0,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    size = 'md',
    theme = 'primary',
    children,
    ...rest
  }, ref) => {
    const isRange = Array.isArray(valueProp) || Array.isArray(defaultValue)
    const thumbSize = THUMB_SIZES[size] ?? 20

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

    const [values, setValues] = useControllableState<[number, number]>({
      prop: toTuple(valueProp),
      defaultProp: initTuple(),
      onChange: (next) => onValueChange?.(isRange ? next : next[0]),
    })

    const currentValues: [number, number] = values ?? [0, 0]
    const [trackWidth, setTrackWidth] = useState(0)

    const onLayout = useCallback((e: LayoutChangeEvent) => {
      setTrackWidth(e.nativeEvent.layout.width)
    }, [])

    const valFromOffset = useCallback((offsetX: number): number => {
      if (trackWidth <= 0) return min
      const ratio = clamp(offsetX / trackWidth, 0, 1)
      const raw = min + ratio * (max - min)
      return clamp(snap(raw, step, min), min, max)
    }, [trackWidth, min, max, step])

    // Single-thumb pan responder
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (e) => {
          const val = valFromOffset(e.nativeEvent.locationX)
          if (isRange) {
            const d0 = Math.abs(val - currentValues[0])
            const d1 = Math.abs(val - currentValues[1])
            const next: [number, number] = [...currentValues]
            next[d0 <= d1 ? 0 : 1] = val
            if (next[0] > next[1]) next.reverse()
            setValues(next)
          } else {
            setValues([val, 0])
          }
        },
        onPanResponderMove: (e) => {
          const val = valFromOffset(e.nativeEvent.locationX)
          if (isRange) {
            const d0 = Math.abs(val - currentValues[0])
            const d1 = Math.abs(val - currentValues[1])
            const next: [number, number] = [...currentValues]
            next[d0 <= d1 ? 0 : 1] = val
            if (next[0] > next[1]) next.reverse()
            setValues(next)
          } else {
            setValues([val, 0])
          }
        },
      }),
    ).current

    const p0 = pct(currentValues[0], min, max)
    const p1 = isRange ? pct(currentValues[1], min, max) : p0

    const fillLeft = isRange ? `${p0}%` : '0%'
    const fillWidth = isRange ? `${p1 - p0}%` : `${p0}%`
    const halfThumb = thumbSize / 2

    return (
      <View
        ref={ref}
        style={{ paddingHorizontal: halfThumb }}
        accessibilityRole="adjustable"
        accessibilityValue={{
          min,
          max,
          now: currentValues[0],
        }}
        {...rest}
      >
        <TrackBase
          size={size}
          disabled={disabled}
          onLayout={onLayout}
          {...panResponder.panHandlers}
        >
          <FillBase
            theme={theme}
            style={{ left: fillLeft as any, width: fillWidth as any }}
          />
          <ThumbBase
            size={size}
            theme={theme}
            style={{ left: `${p0}%` as any, marginLeft: -halfThumb }}
          />
          {isRange && (
            <ThumbBase
              size={size}
              theme={theme}
              style={{ left: `${p1}%` as any, marginLeft: -halfThumb }}
            />
          )}
        </TrackBase>
      </View>
    )
  },
)
Slider.displayName = 'Slider'
