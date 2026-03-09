import { useContext } from "react"
import { StlContext } from "../providers/StlProvider"

export function useTokens() {
  const { tokenValue } = useContext(StlContext)
  return { tokenValue }
}
