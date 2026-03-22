import { type ReactNode, forwardRef } from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { Button, type ButtonProps } from '../Button/Button.native'
import { ButtonGroup, type ButtonGroupProps } from '../ButtonGroup/ButtonGroup.native'
import { useToggleState } from '../../headless/src/useToggleState'

// ─── Toggle ─────────────────────────────────────────────────────────────────

export type ToggleProps = Omit<ButtonProps, 'pressed'> & {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  value?: string
}

export const Toggle = forwardRef<View, ToggleProps>(
  ({ pressed: pressedProp, defaultPressed, onPressedChange, onPress, ...rest }, ref) => {
    const { pressed, toggle } = useToggleState({
      pressed: pressedProp,
      defaultPressed,
      onPressedChange,
    })

    return (
      <Button
        ref={ref}
        {...(rest as any)}
        pressed={pressed}
        onPress={() => {
          toggle()
          onPress?.()
        }}
      />
    )
  },
)
Toggle.displayName = 'Toggle'

// ─── ToggleGroup ────────────────────────────────────────────────────────────

export type ToggleGroupProps = Omit<ButtonGroupProps, 'mode'> & {
  type?: 'toggle' | 'exclusive'
  children?: ReactNode
}

export const ToggleGroup = forwardRef<View, ToggleGroupProps>(
  ({ type = 'exclusive', ...rest }, ref) => (
    <ButtonGroup
      ref={ref}
      attached
      {...rest}
    />
  ),
)
ToggleGroup.displayName = 'ToggleGroup'
