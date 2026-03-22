import { forwardRef } from 'react'
import { Switch as RNSwitch, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useControllableState } from '../../headless/src/useControllableState'
import { useTokens } from '../../stl-native/src/hooks/useTokens'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}

// Size mapping for transform scale
const SIZE_SCALE: Record<string, number> = {
  sm: 0.8,
  md: 1,
  lg: 1.2,
}

// ─── Switch ─────────────────────────────────────────────────────────────────

export const Switch = forwardRef<View, SwitchProps>(
  ({
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    disabled,
    error,
    size = 'md',
    style,
    ...rest
  }, ref) => {
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
    })

    const { tokenValue } = useTokens()
    const tomato9 = tokenValue.color.$tomato9
    const neutral7 = tokenValue.color.$neutral7
    const primary9 = tokenValue.color.$primary9

    const isChecked = !!checked
    const scale = SIZE_SCALE[size] ?? 1

    return (
      <View
        ref={ref}
        style={[
          { transform: [{ scale }] },
          disabled && { opacity: 0.5 },
          style,
        ]}
        accessibilityRole="switch"
        accessibilityState={{ checked: isChecked, disabled }}
        {...rest}
      >
        <RNSwitch
          value={isChecked}
          onValueChange={disabled ? undefined : (v) => setChecked(v)}
          disabled={disabled}
          trackColor={{
            false: error ? tomato9 : neutral7,
            true: error ? tomato9 : primary9,
          }}
        />
      </View>
    )
  },
)
Switch.displayName = 'Switch'
