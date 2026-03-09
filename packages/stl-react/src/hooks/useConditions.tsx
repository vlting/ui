import { useContext } from "react"
import { CssConditionsContext } from "../providers/StlProvider"

export function useConditions() {
  const conditions = useContext(CssConditionsContext)
  return conditions
}
