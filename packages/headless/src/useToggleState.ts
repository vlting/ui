import { useCallback } from 'react'
import { useControllableState } from './useControllableState'

export interface UseToggleStateProps {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export interface UseToggleStateReturn {
  pressed: boolean
  toggle: () => void
  getToggleProps: () => {
    'aria-pressed': boolean
    onClick: () => void
  }
}

export function useToggleState(props: UseToggleStateProps = {}): UseToggleStateReturn {
  const { pressed: pressedProp, defaultPressed = false, onPressedChange } = props

  const [pressed, setPressed] = useControllableState({
    prop: pressedProp,
    defaultProp: defaultPressed,
    onChange: onPressedChange,
  })

  const toggle = useCallback(() => {
    setPressed((prev) => !prev)
  }, [setPressed])

  const getToggleProps = useCallback(
    () => ({
      'aria-pressed': pressed ?? false,
      onClick: toggle,
    }),
    [pressed, toggle],
  )

  return { pressed: pressed ?? false, toggle, getToggleProps }
}
