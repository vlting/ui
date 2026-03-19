import { type ComponentPropsWithRef, forwardRef, useEffect, useRef, useState } from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-react/src/config'

// ─── Hidden Input ────────────────────────────────────────────────────────────

const HiddenInput = styled('input', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  opacity: '0',
  margin: '0',
  padding: '0',
  border: 'none',
  pointerEvents: 'none',
}, { name: 'CheckboxInput' })

// ─── Indicator Box ───────────────────────────────────────────────────────────

const IndicatorBox = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '$neutralMin',
  radius: '$2',
  bg: 'transparent',
  color: '$primaryText9',
  flexShrink: '0',
  transition: 'background-color 0.15s, border-color 0.15s',
}, {
  name: 'CheckboxIndicator',
  variants: {
    size: {
      sm: { width: '$16', height: '$16' },
      md: { width: '$20', height: '$20' },
      lg: { width: '$24', height: '$24' },
    },
    active: {
      true: {
        bg: '$primary9',
        border: '$primary',
      },
    },
    focused: {
      true: { outline: '$neutral', outlineOffset: '$offsetDefault' },
    },
    error: {
      true: { border: '$error' },
    },
  },
  compoundVariants: [
    { when: { active: 'true', focused: 'true' }, stl: { outline: '$primary' } },
    { when: { error: 'true', focused: 'true' }, stl: { outline: '$error' } },
    { when: { error: 'true', active: 'true' }, stl: { bg: '$error9', border: '$error' } },
  ],
  defaultVariants: { size: 'md' },
})

// ─── Root (label) ────────────────────────────────────────────────────────────

const LabelRoot = styled('label', {
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'start',
  gap: '$8',
  cursor: 'pointer',
  position: 'relative',
  userSelect: 'none',
  radius: '$2',
  py: '$2',
  px: '$4',
  ':hover': { bg: '$neutral2' },
}, {
  name: 'CheckboxRoot',
  variants: {
    size: {
      sm: { fontSize: '$buttonSmall' },
      md: { fontSize: '$button' },
      lg: { fontSize: '$button' },
    },
    error: {
      true: {},
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed' },
    },
  },
  defaultVariants: { size: 'md' },
})

// ─── Types ───────────────────────────────────────────────────────────────────

type CheckedState = boolean | 'indeterminate'

export interface CheckboxRootProps {
  children?: React.ReactNode
  checked?: CheckedState
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  required?: boolean
  name?: string
  value?: string
}

// ─── Root ────────────────────────────────────────────────────────────────────

const Root = forwardRef<HTMLInputElement, CheckboxRootProps>(
  (
    {
      children,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      indeterminate,
      disabled,
      size = 'md',
      error,
      required,
      name,
      value,
    },
    ref,
  ) => {
    const isIndeterminate = checkedProp === 'indeterminate' || indeterminate
    const controlledBool = checkedProp === 'indeterminate' ? undefined : checkedProp

    const [isChecked, setChecked] = useControllableState<boolean>({
      prop: controlledBool,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
    })

    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Sync indeterminate property (no HTML attribute exists)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!isIndeterminate
      }
    }, [isIndeterminate])

    const isActive = !!isChecked || !!isIndeterminate

    return (
      <LabelRoot
        size={size}
        error={error}
        disabled={disabled}
      >
        <HiddenInput
          ref={(node: HTMLInputElement | null) => {
            inputRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
          }}
          type="checkbox"
          checked={!!isChecked}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          aria-invalid={error ? 'true' : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={() => {
            if (disabled) return
            if (isIndeterminate) {
              setChecked(true)
            } else {
              setChecked((prev) => !prev)
            }
          }}
        />
        <IndicatorBox size={size} active={isActive} focused={focused || undefined} error={error}>
          {isActive && (
            <CheckIndicator indeterminate={isIndeterminate} size={size} />
          )}
        </IndicatorBox>
        {children}
      </LabelRoot>
    )
  },
)
Root.displayName = 'Checkbox.Root'

// ─── Check / Minus Icons ─────────────────────────────────────────────────────

const ICON_SIZES = { sm: 10, md: 12, lg: 16 } as const

function CheckIndicator({
  indeterminate,
  size = 'md',
}: {
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const iconSize = ICON_SIZES[size]

  if (indeterminate) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="10" height="2" rx="1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Indicator sub-component (passthrough for compound API) ──────────────────

function Indicator({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const Checkbox = { Root, Indicator }
