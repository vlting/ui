import { type ComponentPropsWithRef, forwardRef } from 'react'
import { Button, type ButtonProps } from '../Button'
import { ButtonGroup, type ButtonGroupProps } from '../ButtonGroup'
import { useToggleState } from '../../headless/src'

// ─── Toggle ─────────────────────────────────────────────────────────────────

export type ToggleProps = Omit<ButtonProps, 'pressed'> & {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  value?: string
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed: pressedProp, defaultPressed, onPressedChange, onClick, ...rest }, ref) => {
    const { pressed, getToggleProps } = useToggleState({
      pressed: pressedProp,
      defaultPressed,
      onPressedChange,
    })
    const toggleProps = getToggleProps()

    return (
      <Button
        ref={ref}
        {...(rest as any)}
        pressed={pressed}
        aria-pressed={toggleProps['aria-pressed']}
        onClick={(e: any) => {
          toggleProps.onClick()
          onClick?.(e)
        }}
      />
    )
  },
)
Toggle.displayName = 'Toggle'

// ─── ToggleGroup ────────────────────────────────────────────────────────────

export type ToggleGroupProps = Omit<ButtonGroupProps, 'mode'> & {
  type?: 'toggle' | 'exclusive'
}

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ type = 'exclusive', ...rest }, ref) => (
    <ButtonGroup
      ref={ref}
      attached
      mode={type === 'exclusive' ? 'exclusive' : 'toggle'}
      {...rest}
    />
  ),
)
ToggleGroup.displayName = 'ToggleGroup'
