import { type ReactNode, forwardRef } from 'react'
import { Pressable, Text as RNText, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'
import { useControllableState } from '../../headless/src/useControllableState'

// ─── Styled ─────────────────────────────────────────────────────────────────

const CheckboxLabel = styled(Pressable, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingVertical: 2,
  paddingHorizontal: 4,
}, {
  size: {
    sm: {},
    md: {},
    lg: {},
  },
  disabled: {
    true: { opacity: 0.5 },
  },
}, 'CheckboxRoot')

const IndicatorBox = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '$neutral6',
  borderRadius: 4,
  backgroundColor: 'transparent',
}, {
  size: {
    sm: { width: 16, height: 16 },
    md: { width: 20, height: 20 },
    lg: { width: 24, height: 24 },
  },
  active: {
    true: { backgroundColor: '$primary9', borderColor: '$primary9' },
  },
  error: {
    true: { borderColor: '$error9' },
  },
}, 'CheckboxIndicator')

const CheckMark = styled(RNText, {
  color: '$primaryText9',
  fontWeight: '700',
}, {
  size: {
    sm: { fontSize: 10 },
    md: { fontSize: 12 },
    lg: { fontSize: 16 },
  },
}, 'CheckboxMark')

const LabelText = styled(RNText, {
  color: '$defaultBody',
}, {
  size: {
    sm: { fontSize: 13 },
    md: { fontSize: 14 },
    lg: { fontSize: 15 },
  },
}, 'CheckboxLabel')

// ─── Types ──────────────────────────────────────────────────────────────────

type CheckedState = boolean | 'indeterminate'

export interface CheckboxRootProps {
  children?: ReactNode
  checked?: CheckedState
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  style?: ViewStyle
}

// ─── Root ───────────────────────────────────────────────────────────────────

const Root = forwardRef<View, CheckboxRootProps>(
  ({
    children,
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    indeterminate,
    disabled,
    size = 'md',
    error,
    ...rest
  }, ref) => {
    const isIndeterminate = checkedProp === 'indeterminate' || indeterminate
    const controlledBool = checkedProp === 'indeterminate' ? undefined : checkedProp

    const [isChecked, setChecked] = useControllableState<boolean>({
      prop: controlledBool,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
    })

    const isActive = !!isChecked || !!isIndeterminate

    const handlePress = () => {
      if (disabled) return
      if (isIndeterminate) {
        setChecked(true)
      } else {
        setChecked((prev) => !prev)
      }
    }

    return (
      <CheckboxLabel
        ref={ref}
        size={size}
        disabled={disabled}
        onPress={handlePress}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: isIndeterminate ? 'mixed' : !!isChecked,
          disabled,
        }}
        {...rest}
      >
        <IndicatorBox size={size} active={isActive} error={error}>
          {isActive && (
            <CheckMark size={size}>
              {isIndeterminate ? '\u2500' : '\u2713'}
            </CheckMark>
          )}
        </IndicatorBox>
        {typeof children === 'string' ? (
          <LabelText size={size}>{children}</LabelText>
        ) : (
          children
        )}
      </CheckboxLabel>
    )
  },
)
Root.displayName = 'Checkbox.Root'

// ─── Indicator ──────────────────────────────────────────────────────────────

function Indicator({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

// ─── Export ─────────────────────────────────────────────────────────────────

export const Checkbox = { Root, Indicator }
