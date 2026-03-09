import { useContext } from "react"
import { ConditionMaskContext } from "../providers/StlProvider"

/**
 * Returns the current condition bitmask from context.
 * This is the only context read per styled component render.
 */
export function useConditionMask() {
  return useContext(ConditionMaskContext)
}
