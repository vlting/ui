import { useState, useEffect } from "react"
import { isSSR } from "../shared/utils"

export function useMediaQuery(
  query: string,
  defaultValue: boolean,
  trueValue?: never,
  falseValue?: never
): boolean
export function useMediaQuery<T>(
  query: string,
  defaultValue: T,
  trueValue: T,
  falseValue: T
): T
export function useMediaQuery<T = boolean>(
  query: string,
  defaultValue: T,
  trueValue?: T,
  falseValue?: T
): T | boolean {
  const trueOutput = trueValue ?? true
  const falseOutput = falseValue ?? false
  const defaultState = !!defaultValue ?? false
  const [matches, setMatches] = useState(defaultState)

  useEffect(() => {
    if (!isSSR) {
      const media = window.matchMedia(query)

      // Set it right away, because we don't want this effect
      // to run when `matches` changes.
      setMatches(media.matches)

      // Add the event listener
      const listener = () => {
        setMatches(media.matches)
      }
      media.addEventListener("change", listener)

      // Remove the listener, on destroy
      return () => media.removeEventListener("change", listener)
    }
    return
  }, [query])

  return matches ? trueOutput : falseOutput
}
