import { useContext } from 'react'
import { CssConditionsContext } from '../providers/StlProvider'

/** Hook to return directional values, or whether the current direction is RTL */
export function useRTL<R, L>(rtlValue: R | true = true, ltrValue: L | false = false) {
  const { rtl } = useContext(CssConditionsContext)
  return rtl ? rtlValue : ltrValue
}
