import { useCallback, useRef, useState } from 'react'

interface UseControllableStateParams<T> {
  prop?: T
  defaultProp?: T
  onChange?: (value: T) => void
}

/**
 * Manage state that can be either controlled (via prop) or uncontrolled (internal).
 * If `prop` is provided, the component is controlled. Otherwise it uses internal state.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>) {
  const [internalValue, setInternalValue] = useState(defaultProp)
  const isControlled = prop !== undefined
  const value = isControlled ? prop : internalValue
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const setValue = useCallback(
    (nextValue: T | ((prev: T | undefined) => T)) => {
      if (isControlled) {
        const resolved =
          typeof nextValue === 'function'
            ? (nextValue as (prev: T | undefined) => T)(prop)
            : nextValue
        onChangeRef.current?.(resolved)
      } else {
        setInternalValue((prev) => {
          const resolved =
            typeof nextValue === 'function'
              ? (nextValue as (prev: T | undefined) => T)(prev)
              : nextValue
          onChangeRef.current?.(resolved)
          return resolved
        })
      }
    },
    [isControlled, prop],
  )

  return [value, setValue] as const
}
