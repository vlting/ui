import { type ComponentPropsWithRef, type ReactNode, forwardRef } from 'react'
import { useSlider } from '../../headless/src/useSlider'
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
  radius: '$pill',
  overflow: 'hidden',
  pointerEvents: 'none',
}, { name: 'SliderCustomTrack' })

// Hit area — 36px invisible circle, shows alpha on hover/active
const SliderThumb = styled('div', {
  position: 'absolute',
  width: '$36',
  height: '$36',
  radius: '$pill',
  bg: 'transparent',
  cursor: 'grab',
  outline: 'none',
  transitionProperty: 'background-color',
  transitionDuration: '$fastDuration',
  ':active': { cursor: 'grabbing' },
  lowMotion: { transitionDuration: '0.01s' },
}, {
  name: 'SliderThumb',
  variants: {
    orientation: {
      horizontal: { top: '50%', transform: 'translate(-50%, -50%)' },
      vertical: { left: '50%', transform: 'translate(-50%, 50%)' },
    },
    theme: {
      primary: { ':hover': { bg: '$primaryAlpha4' }, ':active': { bg: '$primaryAlpha4' } },
      secondary: { ':hover': { bg: '$secondaryAlpha4' }, ':active': { bg: '$secondaryAlpha4' } },
      neutral: { ':hover': { bg: '$neutralAlpha4' }, ':active': { bg: '$neutralAlpha4' } },
    },
  },
  defaultVariants: { orientation: 'horizontal', theme: 'neutral' },
})

// Visible dot inside the hit area
const SliderDot = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  radius: '$pill',
  bg: 'white',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  pointerEvents: 'none',
}, {
  name: 'SliderDot',
  variants: {
    size: {
      sm: { width: '$12', height: '$12' },
      md: { width: '$16', height: '$16' },
      lg: { width: '$20', height: '$20' },
    },
    theme: {
      primary: { border: '$primary' },
      secondary: { border: '$secondary' },
      neutral: { border: '$neutral' },
    },
    focused: {
      true: {},
    },
  },
  compoundVariants: [
    { when: { focused: 'true', theme: 'primary' }, stl: { outline: '$primary', outlineOffset: '$offsetDefault' } },
    { when: { focused: 'true', theme: 'secondary' }, stl: { outline: '$secondary', outlineOffset: '$offsetDefault' } },
    { when: { focused: 'true', theme: 'neutral' }, stl: { outline: '$neutral', outlineOffset: '$offsetDefault' } },
  ],
  defaultVariants: { size: 'md', theme: 'neutral' },
})

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
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      step,
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
    const isHoriz = orientation === 'horizontal'

    const {
      values,
      isRange,
      percentages: [p0, p1],
      focusedThumb,
      getTrackProps,
      getThumbProps,
    } = useSlider({ value, defaultValue, min, max, step, disabled, orientation, onValueChange })

    const trackProps = getTrackProps()
    const thumb0Props = getThumbProps(0)

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
          trackProps.ref(node)
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        orientation={orientation}
        size={size}
        disabled={disabled}
        onPointerDown={trackProps.onPointerDown}
        onPointerMove={trackProps.onPointerMove}
        onPointerUp={trackProps.onPointerUp}
        {...rest}
      >
        {children
          ? <SliderCustomTrack>{children}</SliderCustomTrack>
          : <SliderFill orientation={orientation} stl={{ ...fillStl, ...themeFill[theme] }} />
        }
        <SliderThumb
          {...thumb0Props}
          aria-label={isRange ? (ariaLabel ? `${ariaLabel} minimum` : 'Minimum') : ariaLabel}
          orientation={orientation}
          size={size}
          theme={theme}
          stl={isHoriz ? { left: `${p0}%` } : { bottom: `${p0}%` }}
        >
          <SliderDot size={size} theme={theme} focused={focusedThumb === 0 ? 'true' : undefined} />
        </SliderThumb>
        {isRange && (
          <>
            <SliderThumb
              {...getThumbProps(1)}
              aria-label={ariaLabel ? `${ariaLabel} maximum` : 'Maximum'}
              orientation={orientation}
              theme={theme}
              stl={isHoriz ? { left: `${p1}%` } : { bottom: `${p1}%` }}
            >
              <SliderDot size={size} theme={theme} focused={focusedThumb === 1 ? 'true' : undefined} />
            </SliderThumb>
          </>
        )}
      </SliderTrack>
    )
  },
)
Slider.displayName = 'Slider'
