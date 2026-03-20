import { type ComponentPropsWithRef, forwardRef } from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-react/src/config'

// ─── Thumb ──────────────────────────────────────────────────────────────────

const SwitchThumb = styled('span', {
  display: 'block',
  bg: '$neutral1',
  radius: '$pill',
  transitionProperty: 'transform',
  transitionDuration: '$fastDuration',
  transitionTimingFunction: 'ease',
}, {
  name: 'SwitchThumb',
  variants: {
    size: {
      sm: { width: '$16', height: '$16' },
      md: { width: '$20', height: '$20' },
      lg: { width: '$24', height: '$24' },
    },
    checked: {
      true: { transform: 'translateX(100%)' },
      false: {},
    },
  },
  defaultVariants: { size: 'md' },
})

// ─── Track ──────────────────────────────────────────────────────────────────

const SwitchTrack = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  radius: '$pill',
  borderWidth: '0',
  borderStyle: 'solid',
  borderColor: 'transparent',
  cursor: 'pointer',
  p: '$2',
  outline: 'none',
  bg: '$neutral5',
  transitionProperty: 'background-color',
  transitionDuration: '$fastDuration',
  transitionTimingFunction: 'ease',
  ':hover': { bg: '$neutral6' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
  lowMotion: {
    transitionDuration: '0.01s',
  },
}, {
  name: 'Switch',
  variants: {
    size: {
      sm: { width: '$36', height: '$20' },
      md: { width: '$44', height: '$24' },
      lg: { width: '$52', height: '$28' },
    },
    checked: {
      true: {
        bg: '$primary9',
        ':hover': { bg: '$primary10' },
        ':focus': { outline: '$primary' },
      },
      false: {},
    },
    error: {
      true: {
        border: '$error',
        ':focus': { outline: '$error' },
      },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  compoundVariants: [
    { when: { error: 'true', checked: 'false' }, stl: { bg: '$error5', ':hover': { bg: '$error6' } } },
    { when: { error: 'true', checked: 'true' }, stl: { bg: '$error9', ':hover': { bg: '$error10' } } },
  ],
  defaultVariants: { size: 'md' },
})

// ─── Switch ─────────────────────────────────────────────────────────────────

type TrackProps = ComponentPropsWithRef<typeof SwitchTrack>

export type SwitchProps = Omit<TrackProps, 'checked' | 'onChange'> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked: checkedProp, defaultChecked, onCheckedChange, disabled, error, size = 'md', name, ...rest }, ref) => {
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
    })

    const isChecked = !!checked

    return (
      <SwitchTrack
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled || undefined}
        aria-invalid={error ? 'true' : undefined}
        disabled={disabled}
        checked={isChecked}
        error={error}
        size={size}
        onClick={disabled ? undefined : () => setChecked(!isChecked)}
        {...rest}
      >
        {name && <input type="hidden" name={name} value={isChecked ? 'on' : 'off'} />}
        <SwitchThumb size={size} checked={isChecked} />
      </SwitchTrack>
    )
  },
)
Switch.displayName = 'Switch'
