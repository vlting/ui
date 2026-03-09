import { useContext } from "react"
import { StlContext } from "../providers/StlProvider"

export function useColorMode() {
  const ctx = useContext(StlContext)
  return {
    colorMode: ctx.colorMode,
    isDark: ctx.isDark,
    setColorMode: ctx.setColorMode,
    toggleColorMode: ctx.toggleColorMode,
  }
}
